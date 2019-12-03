import functools
from utils.Response_wrapper import Response_wrapper
from utils.Classifier import Classifier, ModelError


# initializing objects
Classifier = Classifier()
Response_wrapper = Response_wrapper()

from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for
)

bp = Blueprint('sentiment', __name__, url_prefix='/')

@bp.route('/ignition', methods=('GET', 'POST'))
def register():
    return '[controller.py] Machine Learning microservice is up and running'

@bp.route('/testresponsewrapper', methods=('GET', 'POST'))
def testresponsewrapper():
    return Response_wrapper.create_response(200, 'Working')

@bp.route('/sentiment', methods=('GET', 'POST'))
def get_sentiments():
    if request.method == 'GET':
        ''' Samples to test the response format of this API and its working'''
        temp_array = ['Good Movie']
        try:
            results = Classifier.sentiments_from_array(temp_array)
        except Exception as e:
            print(e)
            return Response_wrapper.create_response(500, str(e))
        return Response_wrapper.create_response(200, results, "These are samples to test the api")

    elif request.method == 'POST':
        ''' Works by accepting an array of strings as input and returns their respective predicted sentiments'''
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
            results = Classifier.sentiments_from_array(text_array)
        except ModelError as e:
            print(e)
            return Response_wrapper.create_response(500, "Error in loading model")
        return Response_wrapper.create_response(200, results, "")
