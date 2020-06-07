import * as joi from 'joi';
import { IRequest } from '../interfaces/irequest';
import { Response, NextFunction } from 'express';

export class ValidatorHelper {
    public jsonValidator(joiSchema: object, jsonValue: any) {
        return new Promise((resolve, reject) => {
            joi.validate(jsonValue, joiSchema, {stripUnknown: true})
            .then(res => {
                resolve(res);
            }).catch(error => {
                reject(new Error(error).toString());
            })
        })
    };
};

