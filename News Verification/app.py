import re
import string
import pickle
import streamlit as st
import nltk
import numpy as np
import time
# nltk.data.path.append("C:\\Users\\arnab\\AppData\\Roaming\\nltk_data\\tokenizers\\punkt\\PY3")
from nltk.stem.porter import PorterStemmer
from nltk import word_tokenize
from nltk.corpus import stopwords

model = pickle.load(open('model.pkl', 'rb'))


# def preprocess_text(text):
#     text = text.lower()
#     text = text.translate(str.maketrans('', '', string.punctuation))

#     tokens = word_tokenize(text)

#     stop_words = set(stopwords.words('english'))
#     filtered_tokens = [word for word in tokens if word not in stop_words]

#     porter = PorterStemmer()
#     stemmed_tokens = [porter.stem(word) for word in filtered_tokens]

#     preprocessed_text = ' '.join(stemmed_tokens)

#     return preprocessed_text


def predict_news_authenticity(news_text):
    # preprocessed_news_text = news_text
    # prediction = model.predict([preprocessed_news_text])
    prediction = model.decision_function([news_text])

    # if prediction == 0:
    #     return "Fake"
    # else:
    #     return "Real"
    return prediction


st.title("Fake News Detection")

input_news = st.text_area("Enter the News")

# Create two columns for buttons
col1, col2 = st.columns(2)


def prediction(real, fake):
    progress_placeholder = st.empty()
    temp = st.text("Calculating....")
    temp.markdown('<div style="font-weight: bold; font-size: 35px;">Calculating....</div>', unsafe_allow_html=True)

    for i in range(1, real):
        html_code = f"""
        <style>
            .custom-bar-container {{
                width: 100%;
                height: 30px;
                border: 1px solid #ccc;
                border-radius: 5px;
                overflow: hidden;
            }}
            .custom-bar-green {{
                background-color: green;
                height: 100%;
                float: left;
                transition: width 0.5s; /* Add transition for smooth animation */
            }}
            .custom-bar-red {{
                background-color: red;
                height: 100%;
                float: left;
                transition: width 0.5s; 
            }}
        </style>
        <div class="custom-bar-container">
            <div class="custom-bar-green" style="width: {i}%"></div>
            <div class="custom-bar-red" style="width: {100 - i}%"></div>
        </div>
        """
        progress_placeholder.write(html_code, unsafe_allow_html=True)
        time.sleep(0.1)

    temp.empty()
    html = f'<div style="display: flex; justify-content: space-between;">'
    html += f'<div style="font-weight: bold; font-size: 25px;">Real - {real}%</div>'
    html += f'<div style="font-weight: bold; font-size: 25px;">Fake - {fake}%</div>'
    html += f'</div>'
    st.markdown(html, unsafe_allow_html=True)


# Place buttons in the first column
if col1.button('Predict'):
    if not input_news:
        st.warning("Please enter a News first!!!")
    else:
        res = predict_news_authenticity(input_news)
        result = 1 / (1 + np.exp(-res))
        # st.header("Real"+"-"+str(round(result[0]*100))+"%")
        # st.header("Fake"+"-"+str(round(100-result[0]*100))+"%")

        real = round(result[0] * 100)
        fake = round(100 - real)
        prediction(real, fake)

    # Place button in the second column
if col2.button('Clear Result'):
    st.header(" ")
