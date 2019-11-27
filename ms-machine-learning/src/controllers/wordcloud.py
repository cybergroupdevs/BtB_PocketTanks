import functools
from utils.Response_wrapper import Response_wrapper
from utils.Text_kit import Text_kit

# initializing objects
Response_wrapper = Response_wrapper()
Text_kit = Text_kit()

from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for
)

bp = Blueprint('utils', __name__, url_prefix='/api')

@bp.route('/wordcloud', methods=('GET', 'POST'))
def get_sentiments():
    if request.method == 'GET':
        temp_array = [{ "text": "javascript", "size": 40 },
    	{ "text": "D3.js", "size": 15 },
    	{ "text": "coffeescript", "size": 25 },
    	{ "text": "shaving sheep", "size": 25 },
    	{ "text": "AngularJS", "size": 30 },
    	{ "text": "Ruby", "size": 30 },
    	{ "text": "ECMAScript", "size": 15 },
    	{ "text": "Actionscript", "size": 10 },
    	{ "text": "Linux", "size": 20 },
    	{ "text": "C++", "size": 20 },
    	{ "text": "C#", "size": 25 },
    	{ "text": "JAVA", "size": 38 }]

        return Response_wrapper.create_response(200, temp_array, "These are samples to test the api")

    elif request.method == 'POST':
        try:
            text_array = request.json['data']
        except KeyError as e:
            print(e)
            return Response_wrapper.create_response(400, "data object not found in request")

        try:
            text_array = text_array['sentences']
        except KeyError as e:
            print(e)
            return Response_wrapper.create_response(400, 'sentences array not found in request')

        if(len(text_array) < 1):
            return Response_wrapper.create_response(400, 'empty sentences array in request')

        try:
            results = Text_kit.get_wordcloud(text_array)
        except Exception as e:
            print(e)
            return Response_wrapper.create_response(500, str(e))
        return Response_wrapper.create_response(200, results, "")
