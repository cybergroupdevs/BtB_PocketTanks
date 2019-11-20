import functools
import utils as utils

from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for
)

bp = Blueprint('api', __name__, url_prefix='/api')

@bp.route('/ignition', methods=('GET', 'POST'))
def register():
    return '[controller.py] Machine Learning microservice is up and running'

@bp.route('/testresponsewrapper', methods=('GET', 'POST'))
def testresponsewrapper():
    return utils.response_wrapper.create_response(200, 'Working')
