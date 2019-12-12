
from flask import jsonify

class Response_wrapper:
    '''Response wrapper to send uniform responses from the microservices'''
    def create_response(self, status, data, message=""):
        ''' Method to map status codes with http codes and messages from the response code custom dictionary'''
        return jsonify({
            "status" : status,
            "data" : data,
            "message" : message
        })
