import  api  from './api';
import  config from '../../../../config.json'

export default {
    "apiBaseUri": `${config[process.env.ENV][process.env.ENGINE_NAME]['PREFIX']}v0.1/`,
    "api": api
}

