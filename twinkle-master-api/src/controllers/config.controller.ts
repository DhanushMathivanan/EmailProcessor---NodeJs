import { IRequest } from '../interfaces/irequest';
import { Router, Response, NextFunction } from 'express';
import { AppSetting } from '../config/app.setting';
import * as os from 'os';

export class ConfigController {

    public static route = '/server';
    public router: Router;

    constructor() {
        this.router = Router();
        this.init();
    };

    private init() {
        this.router.get('/', this.returnBasicDetails);
        this.router.get('/server', this.returnServerDetails);
    }

    private readonly returnBasicDetails = (request: IRequest, response: Response, next: NextFunction) => {
        const appConfig = AppSetting.getConfig().AppConfig;
        return response.json({
            name: appConfig.name,
            version: appConfig.version
        });
    }

    private readonly returnServerDetails = (request: IRequest, response: Response, next: NextFunction) => {
        const appConfig = AppSetting.getConfig();
        return response.json({
            server: {
                config: appConfig,
                database: {
                    server: appConfig.DBConnections.default.server,
                    database: appConfig.DBConnections.default.database
                },
                network: os.networkInterfaces()
            }
        });
    }
}

export default ConfigController;
