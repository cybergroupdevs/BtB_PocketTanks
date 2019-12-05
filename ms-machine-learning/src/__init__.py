import os
from flask import Flask
from flask_cors import CORS, cross_origin
from utils.ConfigManager import *

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='devSecretKey'
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # request to check if the Microservice is running
    @app.route('/')
    def hello():
        return 'Please go to API docs.'

    from . import controllers
    app.register_blueprint(controllers.v1.sentiment.bp)
    app.register_blueprint(controllers.v1.wordcloud.bp)
    CORS(app)

    app = setAppConfig(app)

    return app
