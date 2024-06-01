import torch
from transformers import T5ForConditionalGeneration,T5Tokenizer
from keyphrasetransformer import KeyPhraseTransformer

kp = KeyPhraseTransformer()
model_question_generation = T5ForConditionalGeneration.from_pretrained('E:/Final year project/project/django server/django_server/APIs/assets/t5_question_generation/',local_files_only=True)
model_question_answering = T5ForConditionalGeneration.from_pretrained('E:/Final year project/project/django server/django_server/APIs/assets/t5_question_answering/',local_files_only=True)
tokenizer = T5Tokenizer.from_pretrained('E:/Final year project/project/django server/django_server/APIs/assets/t5_tokenizer/',local_files_only=True)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print ("device ",device)
model_question_generation = model_question_generation.to(device)
model_question_answering = model_question_answering.to(device)


class QNA:         
    def generate_question(self,context,answer):
        text = "answer: " + answer +" context: "+context
        #   text = "context: "+context + " " + "answer: " + answer
        # text = f"<answer> {answer} <context> {context}"
        encoding = tokenizer.encode_plus(text,max_length =512, pad_to_max_length=True, return_tensors="pt")
        # print (encoding.keys())
        input_ids,attention_mask  = encoding["input_ids"].to(device), encoding["attention_mask"].to(device)
        model_question_generation.eval()
        beam_outputs = model_question_generation.generate(
            input_ids=input_ids,attention_mask=attention_mask,
            max_length=72,
            early_stopping=True,
            num_beams=3,
            num_return_sequences=3,
            output_scores=True,
            return_dict_in_generate=True
        )
        return {"question":tokenizer.decode(beam_outputs["sequences"][0], skip_special_tokens=True,clean_up_tokenization_spaces=True),"score": beam_outputs["sequences_scores"][0]}

    def generate_answer(self,context,question):
        text = "question: "+question + " " + "context: " + context 
        encoding = tokenizer.encode_plus(text,max_length =512, pad_to_max_length=True, return_tensors="pt")
        input_ids,attention_mask  = encoding["input_ids"].to(device), encoding["attention_mask"].to(device)
        model_question_answering.eval()
        beam_outputs = model_question_answering.generate(
            input_ids=input_ids,attention_mask=attention_mask,
            max_length=72,
            early_stopping=True,
            num_beams=3,
            num_return_sequences=3,
            output_scores=True,
            return_dict_in_generate=True
        )

        return {"answer":tokenizer.decode(beam_outputs["sequences"][0], skip_special_tokens=True,clean_up_tokenization_spaces=True),"score": beam_outputs["sequences_scores"][0] }

    class FinalOutput:
        def __init__(self, my_string, my_score):
            self.output = my_string
            self.score = my_score

    def sort_objects_by_score(self,objects):
        return sorted(objects, key=lambda x: x.score)

    def str_converter(self,str,maxLen):
        array=[]
        str_arr=str.split('\n')
        # print(str_arr,len(str))
        for i in range(len(str_arr)):
            if len(str_arr[i])>maxLen:
                temp=str_arr[i].split('.')
                for j in temp:
                    array.append(j)
            else:
                array.append(str_arr[i])        
        return array
    
    def finalQuestionGenerator(self,context):
        contextArray=self.str_converter(context,420)
        qnas=[]
        output=[]
        allKeywords={'is'}
        for context in contextArray:
            keywords=[element for element in kp.get_key_phrases(context) if len(element.split()) < 4]
            for keyword in keywords:
                if keyword in allKeywords:
                    continue
                allKeywords.add(keyword)    
                question1=self.generate_question(context,keyword)["question"]
                output1=self.generate_answer(context,question1)
                answer1=output1["answer"]
                score1=output1["score"]

                output2=self.generate_question(context,answer1)
                question2=output2["question"]
                score2=output2["score"]


                # checking for similar answers  
                isSimilar=False  
                for qna in qnas:
                    s1=qna.lower()
                    s2=(question2+answer1).lower()
                    if(s1==s2):
                        isSimilar=True
                        break
                    # Tokenize the sentences into sets of words
                    words_s1 = set(s1.split())
                    words_s2 = set(s2.split())
                    # Calculate the Jaccard similarity
                    intersection = len(words_s1.intersection(words_s2))
                    union = len(words_s1.union(words_s2))
                    jaccard_similarity = intersection / union
                    if jaccard_similarity>.7:
                        isSimilar=True
                        break
                if isSimilar == True :
                    continue
                qnas.append(question2+answer1)        
                fo=self.FinalOutput(question2+" "+ "keyword:"+" "+keyword+" "+"answer:"+" "+answer1+" "+"score:"+" "+str((score1*score2).item()),(score1*score2).item())
                output.append(fo)
        sortedOutput=self.sort_objects_by_score(output)
        for i,value in enumerate(sortedOutput):
            print(i,value.output)
        return sortedOutput    
        print(len(qnas))        


    