import { IUser } from './../entities/IUser';
import { IRequest } from '../interfaces/irequest';
import { Router, Response, NextFunction } from 'express';
import { UserManager } from '../data.manager/user.manager';
import { Api, ValidatorHelper } from '../helpers/index';
import { UserSchema } from '../validatorschema/index';
import { IConfig } from '../config/index';
import * as requests from 'request';
import { AppSetting } from '../config/app.setting';
// import { Logger } from '../helpers/logger'

export class UserController {

    public static route = '/users';
    public router: Router;

    constructor() {
        this.router = Router();
        this.init();
    };

    private init() {
        // The methods will be executed in the same order and if there is any error in any of the method then execution
        // will be stopped and remaining methods will not be executed.
        // Hence using this pattern is better than calling each methods explicitly
        // this.router.get('/', this.Authorize, this.GetUsers);
        this.router.get('/getUserData/:globalUserID', this.GetUserData);
        this.router.put('/sendEmail/:globalUserID', this.SendEmail);
    }

    public Authorize(request: IRequest, response: Response, next: NextFunction) {
        // Authorize if needed
        next();
    }

    private GetUserData = async(request: IRequest, response: Response, next: NextFunction) => {
        const schema = new UserSchema();
        const validator = new ValidatorHelper();
        const manager = new UserManager();
        const globalUserID = request.params.globalUserID;
        try {
            await validator.jsonValidator(schema.GetUserRequest(), request.query);
            const result = await manager.GetEmailIdByUserID(globalUserID);
            // let resultObj: Object = result[0];
            // const validRes = await validator.jsonValidator(schema.GetUserDataResponse(), resultObj);
            return Api.ok(request, response, result);
        } catch (error) {
            return Api.serverError(request, response, error);
        };
    }

    private SendEmail = async(request: IRequest, response: Response, next: NextFunction) => {
        const schema = new UserSchema();
        const validator = new ValidatorHelper();
        const manager = new UserManager();
        const globalUserID = request.params.globalUserID;
        try {
            await validator.jsonValidator(schema.SendUserEmail(), request.query);
            const result = await manager.readEmail(globalUserID);
            return Api.ok(request, response, result);
        } catch (error) {
            return Api.serverError(request, response, error);
        };
    }
}

export default UserController;
