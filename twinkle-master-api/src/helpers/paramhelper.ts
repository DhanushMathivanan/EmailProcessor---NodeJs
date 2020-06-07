import { IPagination } from './../entities/IPagination';
import { Request } from 'express';
import { AppSetting } from '../config/app.setting';
import { IRequest } from '../interfaces/irequest';

export class ParamHelper {

    public static getPagination(request: IRequest): IPagination {
        const skip = request.query['skip'] ? +request.query['skip'] : 0;
        const top = request.query['top'] ? +request.query['top'] : AppSetting.getConfig().AppSettings.defaultTotalRecords;
        return {
            skip,
            top
        }
    };

}
