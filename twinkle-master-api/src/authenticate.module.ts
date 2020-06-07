import * as express from 'express';
const OktaJwtVerifier = require('@okta/jwt-verifier');
import { AppSetting, IConfig, Environment } from './config';
import { find } from 'lodash';
import { Api } from './helpers/api';
import { IRequest } from '../src/interfaces/irequest';

export class AuthenticationModule {

    public static isExcluded(req, res) {

        let config: IConfig = AppSetting.getConfig();

        let exclude = config.AppSettings['exclude'];
        let result = find(exclude, (s) => {
            return req.url.startsWith(s);
        });
        let ref = req.headers['referer'] ? req.headers['referer'] : '';
        let testing = AppSetting.Env === Environment.Testing || ref.indexOf('swagger') !== -1;
        return testing || result;

    }

    public static authenticate(app: express.Express) {
        app.use(function (req: IRequest, res, next) {
            let config = AppSetting.getConfig();
            if (req.url === '/') {
                return res.json({
                    name: config.AppConfig.name,
                    version: config.AppConfig.version,
                });
            } else if (req.url.indexOf('/users/image') !== -1) {
                next();
            } else {
                const token = req.headers['x-access-token'] || req.query['token'];
                // Use this for without OKTA Implemenation
                // TODO changed her for electron
                // req.InputParams = {
                //     perfumerInitials: 'SP',
                //     globalUserID: 'pxs6244',
                // };
                // next();
                if (token) {
                    req.InputParams = {
                        id: req.headers['x-global-user-id'],
                        perfumerInitials: req.headers['x-user-initial'],
                        globalUserID: req.headers['x-global-user-id'],
                    };
                    next();
                } else {
                    console.log(req.url);
                    res.sendStatus(401).send('Unauthorized');
                }
            }
        });

    }
    public static validateOkta(config, token, req, res, next) {
        const oktaJwtVerifier = new OktaJwtVerifier({
            issuer: config.OktaConfig.url
        });
        oktaJwtVerifier.verifyAccessToken(token)
            .then(jwt => {
                let userid = jwt.claims ? jwt.claims.preferred_username : null;
                let id = userid.split('@');
                userid = id ? id[0] : null;
                if (userid) {
                    req.headers['user'] = userid;
                    next();
                } else {
                    Api.unauthorized(req, res, 'Invalid userId');
                }

            })
            .catch(err => {
                console.log('error', err);
                Api.unauthorized(req, res, err);
            });
    }
}
