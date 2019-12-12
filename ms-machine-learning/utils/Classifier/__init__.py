import nltk
import string
import re
import pickle as pkl
from sklearn import feature_extraction
import pandas as pd
import numpy as np


def remove_punct(text):
    ''' Function to remove punctuation. '''
    text  = "".join([char for char in text if char not in string.punctuation])
    text = re.sub('[0-9]+', '', text)
    return text

def tokenization(text):
    ''' Function to tokenize text. '''
    text = re.split('\W+', text)
    return text


stopword = nltk.corpus.stopwords.words('english')

def remove_stopwords(text):
    ''' Function to remove stopwords loaded from nltk package. '''
    text = [word for word in text if word not in stopword]
    return text

ps = nltk.PorterStemmer()

def stemming(text):
    ''' Function to remove stem words loaded from nltk package. '''
    text = [ps.stem(word) for word in text]
    return text
wn = nltk.WordNetLemmatizer()

def lemmatizer(text):
    ''' Function to remove lemmatize words i.e. process of grouping together the inflected forms of a word so they can be analysed as a single item. '''
    text = [wn.lemmatize(word) for word in text]
    return text

def clean_text(text):
    ''' Function to clean text. '''
    text_lc = "".join([word.lower() for word in text if word not in string.punctuation]) # remove puntuation
    text_rc = re.sub('[0-9]+', '', text_lc)
    tokens = re.split('\W+', text_rc)    # tokenization
    text = [ps.stem(word) for word in tokens if word not in stopword]  # remove stopwords and stemming
    return text

def spit_results(text_array,vec,model):
    ''' Function to apply all the above functions in order and then analyse through the saved model. '''
    df = pd.DataFrame()
    df['text'] = text_array
    df['Tweet_punct'] = df['text'].apply(lambda x: remove_punct(x))
    df['Tweet_tokenized'] = df['Tweet_punct'].apply(lambda x: tokenization(x.lower()))
    df['Tweet_nonstop'] = df['Tweet_tokenized'].apply(lambda x: remove_stopwords(x))
    df['Tweet_stemmed'] = df['Tweet_nonstop'].apply(lambda x: stemming(x))
    df['Tweet_lemmatized'] = df['Tweet_stemmed'].apply(lambda x: lemmatizer(x))
    df['final'] = df['Tweet_lemmatized'].apply(lambda x : " ".join(x))
    df.drop(['Tweet_punct', 'Tweet_tokenized','Tweet_lemmatized',
       'Tweet_nonstop', 'Tweet_stemmed'],axis=1,inplace=True)
    inf_list = vec.transform(df['final'])
    results = model.predict(inf_list)
    df['inf'] = results
    df['sentiment'] = df['inf'].apply(lambda x: "Positive" if x>0 else "Negative")
    df.drop(['final','inf'],axis=1,inplace=True)
    return df

class ModelError(Exception):
    ''' Exception for errors related to loading model / vectorizer ..'''
    pass

class Classifier:
    '''
    Sentiment Classifier class which loads the vectorizer and the NB model
    Processes the text into vectors and then predicts the sentiment
    '''
    def sentiments_from_array(self, text_array):
        ''' Function which does the extracting sentiments functionality of the classifier class'''

        # Loading Vectorizer from saved pkl file
        try:
            loaded_vec = feature_extraction.text.CountVectorizer(decode_error="replace",vocabulary=pkl.load(open("assets/vect.pkl", "rb")))
        except Exception as e:
            print(e)
            raise ModelError("Error in Loading CountVectorizer")

        # Loading Model
        try:
            loaded_model = pkl.load(open("assets/naiveBayes.pkl", 'rb'))
        except Exception as e:
            print(e)
            raise ModelError("Error in Loading CountVectorizer")

        # Predicting sentiments on the dataframe
        try:
            df_with_sentiment = spit_results(text_array,loaded_vec,loaded_model)
        except Exception as e:
            print(e)
            raise ModelError("Error in Loading CountVectorizer")

        if(len(df_with_sentiment) > 0):
            return df_with_sentiment.to_dict(orient='records')
        else:
            raise ModelError("Error in Loading CountVectorizer")
