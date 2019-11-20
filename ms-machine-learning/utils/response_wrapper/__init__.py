# Response wrapper to send uniform responses from the microservices
from flask import jsonify

class Response_wrapper():
    def create_response(status, data, message=""):
        return jsonify({
            "status" : status,
            "data" : data,
            "message" : message
        })
