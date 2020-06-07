import { Request } from 'express';

// this is just for ts, will disappear in transpilation
export interface IRequest extends Request {
    SQLQuery?: string;
    InputParams?: {};
    query: any;
    header: any;
    params: any;
}
