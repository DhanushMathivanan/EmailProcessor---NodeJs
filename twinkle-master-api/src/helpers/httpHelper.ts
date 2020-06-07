import * as xml2js from 'xml2js';
import * as requests from 'request';
import { AppSetting } from '../config/app.setting';
import { IConfig } from '../config/index';

export class HttpHelper {
    public MakeHttpRequest(inputParams) {
        return new Promise((resolve, reject) => {
            const callback = (error, response, body) => {
                if (!error && response) {
                    resolve(response);
                } else {
                    reject(error);
                }
            };
            requests(inputParams, callback);
        });
    }

}
