import string
import nltk
nltk.download('punkt')
from nltk.tokenize import word_tokenize
import numpy as np

class Text_kit:
    '''Toolkit for processing texts'''
    def __init__(self, text_array = ['sampleText1', 'sampleText1']):
        ''' Initialize text_toolkit '''
        self.text_array = text_array

    def clean_text(self, text):
        '''
        1. Lowercase Text
        2. Remove punctuation
        3. remove non-alpha chars
        4. filter stop words
        '''
        tokens = word_tokenize(text)
        # convert to lower case
        tokens = [w.lower() for w in tokens]
        # remove punctuation from each word
        import string
        table = str.maketrans('', '', string.punctuation)
        stripped = [w.translate(table) for w in tokens]
        # remove remaining tokens that are not alphabetic
        words = [word for word in stripped if word.isalpha()]
        # filter out stop words
        from nltk.corpus import stopwords
        stop_words = set(stopwords.words('english'))
        words = [w for w in words if not w in stop_words]
        return words

    def get_wordcloud(self, text_array):
        ''' return text in format required for wordcloud'''
        word_dict = []
        cleaned_sentences = map(self.clean_text, text_array)
        tokens = []
        for sentence in list(cleaned_sentences):
            tokens.extend(sentence)
        words, word_counts = np.unique(tokens, return_counts=True)
        for word, word_count in zip(words, word_counts):
            word_dict.append(
            { "text" : str(word),
            "size" : int(word_count)}
            )
        return word_dict
