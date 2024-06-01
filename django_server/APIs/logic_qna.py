import torch
from transformers import T5ForConditionalGeneration,T5Tokenizer
import re


tokenizer = T5Tokenizer.from_pretrained('E:/FInal Year Project News analyxzer/Final year project/t5_tokenizer/',local_files_only=True)
model = T5ForConditionalGeneration.from_pretrained('E:/FInal Year Project News analyxzer/Final year project/T5_question_answer_generation_75k/',local_files_only=True)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print ("device ",device)
model= model.to(device)


class QNA:         
    def str_converter(self,str,i=0):
        str_arr=str.split('.')
        filtered_arr = [x for x in str_arr if len(x) > 5]
        # print(str)
        paras=re.split(r'\n+', str)
        # paras=str.split('''\n''')
        paras=[x for x in paras if len(x) > 1]
        output=[]
        
        for x in filtered_arr:
            flag=False
            for y in range(len(paras)):
                if  x.replace("\n","").strip() in paras[y]:
                    temp={"line":x.replace("\n",""),"paraNumber":y+1}
                    output.append(temp)
                    flag=True
                    break
            if not flag:
                output.append({"line":x.replace("\n",""),"paraNumber":-1})
        return output
        
    
    def split_string(self,string, num_parts=10):
        # Split the string into parts based on '.'
        parts = string.split('.')
        
        # Calculate the number of lines
        num_lines = len(parts)
        
        # Calculate the approximate number of lines per part
        lines_per_part = num_lines // num_parts
        
        # Calculate the number of lines for the last part
        remaining_lines = num_lines % num_parts
        
        # Initialize variables
        split_parts = []
        start_index = 0
        
        # Iterate over each part
        for i in range(num_parts):
            # Calculate the end index for the current part
            end_index = start_index + lines_per_part + (1 if i < remaining_lines else 0)
            
            # Join the lines to form the part
            part = '.'.join(parts[start_index:end_index])
            
            # Append the part to the list of split parts
            split_parts.append(part)
            
            # Update the start index for the next part
            start_index = end_index
        
        return split_parts
    class FinalOutput:
        def __init__(self, q,a,pn, my_score):
            self.question = q
            self.answer= a
            self.score = my_score
            self.paraNumber=pn

    def sort_objects_by_score(self,objects):
        return sorted(objects, key=lambda x: -x.score)
    def finalQuestionGenerator(self,context):
        output=[]
        for lineInfo in self.str_converter(context):
            # print(line)
            text="line: %s context: %s "%(lineInfo['line'],context)
            # text = context
            # print (text)
            encoding = tokenizer.encode_plus(text,max_length =768, padding=True, return_tensors="pt")
            # print (encoding.keys())
            input_ids,attention_mask  = encoding["input_ids"].to(device), encoding["attention_mask"].to(device)
            model.eval()
            beam_outputs = model.generate(
                input_ids=input_ids,attention_mask=attention_mask,
                max_length=128,
                # min_length=20,
                early_stopping=False,
                num_beams=2,
                num_return_sequences=1,
                output_scores=True,
                return_dict_in_generate=True

            )
            question,answer=tokenizer.decode(beam_outputs["sequences"][0],skip_special_tokens=True,clean_up_tokenization_spaces=True).split("answer:")
            question = question.replace("question:","")
            fo=self.FinalOutput(question,answer,lineInfo['paraNumber'],beam_outputs["sequences_scores"][0])
            output.append(fo)
            # for beam_output in beam_outputs:
            #     print(sequences)
                # sent = tokenizer.decode(beam_output["sequences"], skip_special_tokens=True,clean_up_tokenization_spaces=True)
                # print (sent,beam_output["sequences_scores"])   
        # sortedOutput=self.sort_objects_by_score(output)
        # questions=[]
        # for i,item in enumerate(output):         
            
        #     questions.append({"question":item.question,
        #           "answer":item.answer,
        #           "paraNumber":item.paraNumber
        #           })
        # return {
        #     "isError":False,
        #     "questions":questions
        # }      
        questions_dict = {}
        for item in output:
            question = item.question
            answer = item.answer
            para_number = item.paraNumber
            
            if question in questions_dict:
                existing_answer = questions_dict[question]["answer"]
                existing_pn = questions_dict[question]["paraNumber"]
                if existing_answer != answer:
                    questions_dict[question]["answer"] = existing_answer + " / " + answer
                if existing_pn != para_number:
                    if existing_pn ==-1:
                        questions_dict[question]["paraNumber"] = para_number
                    elif para_number ==-1:    
                        questions_dict[question]["paraNumber"] = existing_pn
                    else:    
                        questions_dict[question]["paraNumber"] = str(existing_pn) + " / " + str(para_number)
            else:
                questions_dict[question] = {
                    "question": question,
                    "answer": answer,
                    "paraNumber": para_number
                }

        questions = list(questions_dict.values())

        return {
            "isError": False,
            "questions": questions
        }


    