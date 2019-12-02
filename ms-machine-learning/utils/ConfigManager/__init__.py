import os
import json
from werkzeug.contrib.fixers import ProxyFix

''' Reading global config to use in config manager. '''
try:
    with open(os.path.join(os.path.dirname(__file__),'../../../config.json')) as config_file:
        config = json.load(config_file)
except FileNotFoundError as e:
        with open(os.path.join(os.path.dirname(__file__),'../../config.json')) as config_file:
            config = json.load(config_file)

class PrefixMiddleware(object):
    ''' Class to add url prefix to this microservice and reject all other request from the entry file. '''
    def __init__(self, app, prefix=''):
        self.app = app
        self.prefix = prefix

    def __call__(self, environ, start_response):
        if environ['PATH_INFO'].startswith(self.prefix):
            environ['PATH_INFO'] = environ['PATH_INFO'][len(self.prefix):]
            environ['SCRIPT_NAME'] = self.prefix
            return self.app(environ, start_response)
        else:
            start_response('404', [('Content-Type', 'text/plain')])
            return ["This url does not belong to the app.".encode()]

def setAppConfig(app):
    ''' Method to set the initial config variables on basis of global config for all microservices '''
    app.config['ENGINE_NAME'] = 'ML'
    app.config['ENV'] = 'DEV'
    app.config['IP'] = config[app.config['ENV']][app.config['ENGINE_NAME']]['IP']
    app.config['PORT'] = config[app.config['ENV']][app.config['ENGINE_NAME']]['PORT']
    app.wsgi_app = PrefixMiddleware(app.wsgi_app, prefix=config[app.config['ENV']][app.config['ENGINE_NAME']]['PREFIX'])
    app.wsgi_app = ProxyFix(app.wsgi_app)
    return app
