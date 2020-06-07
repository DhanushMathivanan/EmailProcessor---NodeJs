import { sequelize, SequelizeConfig } from './sequelize.config';
import {Sequelize as SqlConnection} from 'sequelize';
import * as moment from 'moment';

export class SqlManager {

    private _sequelize: SqlConnection;
    private params;

    constructor() {
        this._sequelize = new SequelizeConfig().setConnection();
    }

    public InitiateTransaction() {
        return this._sequelize.transaction();
    }

    // public ExecuteQuery(qry: string) {
    //     return this._sequelize.query(qry, { type: this._sequelize.QueryTypes.SELECT });
    // }

    // public async UpdateTransaction(qry: string, vals: any, _transaction) {
    //     if ((qry.indexOf('TempTable') < 0 && qry.indexOf('OfflineLog') < 0)) {
    //         await this._sequelize.query({
    //             query: this.LogInsert(),
    //             values: {query: qry, vals: JSON.stringify(vals), querytype: 'UPDATE'}
    //         }, { type: this._sequelize.QueryTypes.INSERT, transaction: _transaction });
    //     }
    //     return this._sequelize.query({
    //         query: qry,
    //         values: vals
    //     }, { type: this._sequelize.QueryTypes.UPDATE, transaction: _transaction });
    // }

    // public ExecuteQueryWithTransaction(qry: string, vals: any, _transaction) {
    //     return this._sequelize.query({
    //         query: qry,
    //         values: vals
    //     }, { type: this._sequelize.QueryTypes.SELECT, transaction: _transaction });
    // }

    // public async InsertTransaction(qry: string, vals: any, _transaction) {
    //     if (qry.indexOf('TempTable') < 0 && qry.indexOf('OfflineLog') < 0) {
    //         console.log('*****************************************');
    //         await this._sequelize.query({
    //             query: this.LogInsert(),
    //             values: {query: qry, vals: JSON.stringify(vals), querytype: 'INSERT'}
    //         }, { type: this._sequelize.QueryTypes.INSERT, transaction: _transaction });
    //     }
    //     return this._sequelize.query({
    //         query: qry,
    //         values: vals
    //     }, { type: this._sequelize.QueryTypes.INSERT, transaction: _transaction });
    // }

    // public async DeleteTransaction(qry: string, vals: any, _transaction) {
    //     if (qry.indexOf('TempTable') < 0 && qry.indexOf('OfflineLog') < 0) {
    //         await this._sequelize.query({
    //             query: this.LogInsert(),
    //             values: {query: qry, vals: JSON.stringify(vals), querytype: 'DELETE'}
    //         }, { type: this._sequelize.QueryTypes.INSERT, transaction: _transaction });
    //     }
    //     return this._sequelize.query({
    //         query: qry,
    //         values: vals
    //     }, { type: this._sequelize.QueryTypes.DELETE, transaction: _transaction });
    // }

    // public async BulkInsertTransaction(tableName: string, vals: any, _transaction) {
    //     await this._sequelize.query({
    //         query: this.LogInsert(),
    //         values: {query: tableName, vals: JSON.stringify(vals), querytype: 'BULKINSERT'}
    //     }, { type: this._sequelize.QueryTypes.INSERT, transaction: _transaction });
    //     return this._sequelize.getQueryInterface().bulkInsert(tableName, vals,
    //         { type: this._sequelize.QueryTypes.INSERT, transaction: _transaction });
    // }

    public Get(qry: string, vals: any) {
        return this._sequelize.query({
            query: qry,
            values: vals
        }, { type: 'SELECT' });
    }

    // public Insert(qry: string, vals: any) {
    //     const global = this;
    //     return this._sequelize.query({
    //         query: qry,
    //         values: vals
    //     }, { type: this._sequelize.QueryTypes.INSERT }).then(async function(data){
    //         await global._sequelize.query({
    //             query: global.LogInsert(),
    //             values: {query: qry, vals: JSON.stringify(vals), querytype: 'INSERT'}
    //         }, { type: global._sequelize.QueryTypes.INSERT });
    //         return data;
    //     });
    // }

    // public Update(qry: string, vals: any) {
    //     const global = this;
    //     return this._sequelize.query({
    //         query: qry,
    //         values: vals
    //     }, { type: this._sequelize.QueryTypes.UPDATE }).then(async function(data){
    //         if (qry.indexOf('TempTable') < 0 && qry.indexOf('OfflineLog') < 0) {
    //             await global._sequelize.query({
    //                 query: global.LogInsert(),
    //                 values: {query: qry, vals: JSON.stringify(vals), querytype: 'UPDATE'}
    //             }, { type: global._sequelize.QueryTypes.INSERT });
    //             return data;
    //         }
    //     });
    // }

    // public FormatDate(dt) {
    //     const date = moment.utc(new Date(dt)).format('YYYY-MM-DD hh:mm:ss');
    //     return date;
    // }
    // public async BulkInsert(tableName: string, vals: any, flag = null) {
    //     const global = this;
    //     if ( tableName === 'Materials') {
    //         for (let i = 0; i < vals.length; i++) {
    //             vals[i].CreatedOn = await this.FormatDate(vals[i].CreatedOn);
    //             vals[i].UpdatedOn = await this.FormatDate(vals[i].UpdatedOn);
    //             vals[i].LastAccessedOn = await this.FormatDate(vals[i].LastAccessedOn);
    //         }
    //     }
    //     if ( tableName === 'RecentItem') {
    //         for (let i = 0; i < vals.length; i++) {
    //             vals[i].AccessedOn = await this.FormatDate(vals[i].AccessedOn);
    //         }
    //     }
    //     return this._sequelize.getQueryInterface().bulkInsert(tableName, vals).then(async function(data){
    //         if (flag === null && ((tableName !== 'TempTable') && (tableName !== 'OfflineLog'))) {
    //             await global._sequelize.query({
    //                 query: global.LogInsert(),
    //                 values: {query: tableName, vals: JSON.stringify(vals), querytype: 'BULKINSERT'}
    //             }, { type: global._sequelize.QueryTypes.INSERT });
    //             return data;
    //         }
    //     });
    // }

    // public BulkInsertIfNotExist(tableName: string, vals: any,  flag = null) {
    //     const global = this;
    //     return this._sequelize.getQueryInterface()
    //         .bulkInsert(tableName, vals, { type: this._sequelize.QueryTypes.INSERT, ignoreDuplicates: true })
    //         .then(async function(data){
    //         if (flag === null && ((tableName !== 'TempTable') && (tableName !== 'OfflineLog'))) {
    //             await global._sequelize.query({
    //                 query: global.LogInsert(),
    //                 values: {query: tableName, vals: JSON.stringify(vals), querytype: 'BULKINSERT'}
    //             }, { type: global._sequelize.QueryTypes.INSERT });
    //             return data;
    //         }
    //     });
    // }

    // public BulkInsertIfNotExistTransaction(tableName: string, vals: any , _transaction, flag = null) {
    //     const global = this;
    //     return this._sequelize.getQueryInterface()
    //         .bulkInsert(tableName, vals, { type: this._sequelize.QueryTypes.INSERT, ignoreDuplicates: true, transaction: _transaction})
    //         .then(async function(data){
    //         if (flag === null && ((tableName !== 'TempTable') && (tableName !== 'OfflineLog'))) {
    //             await global._sequelize.query({
    //                 query: global.LogInsert(),
    //                 values: {query: tableName, vals: JSON.stringify(vals), querytype: 'BULKINSERT'}
    //             }, { type: global._sequelize.QueryTypes.INSERT,  transaction: _transaction });
    //             return data;
    //         }
    //     });
    // }

    // public BulkUpdate(qry: string, vals: any) {
    //     const global = this;
    //     return this._sequelize.query({
    //         query: qry,
    //         values: vals
    //     }, { type: this._sequelize.QueryTypes.BULKUPDATE }).then(async function(data){
    //         await global._sequelize.query({
    //             query: global.LogInsert(),
    //             values: {query: qry, vals: JSON.stringify(vals), querytype: 'BULKUPDATE'}
    //         }, { type: global._sequelize.QueryTypes.INSERT });
    //         return data;
    //     });
    // }

    // public Delete(qry: string, vals: any, flag = null) {
    //     const global = this;
    //     return this._sequelize.query({
    //         query: qry,
    //         values: vals
    //     }, { type: this._sequelize.QueryTypes.DELETE }).then(async function(data){
    //         if (flag === null && (qry.indexOf('TempTable') < 0
    //         && qry.indexOf('OfflineLog') < 0)) {
    //             await global._sequelize.query({
    //                 query: global.LogInsert(),
    //                 values: {query: qry, vals: JSON.stringify(vals), querytype: 'DELETE'}
    //             }, { type: global._sequelize.QueryTypes.INSERT });
    //         }
    //         return data;
    //     });
    // }

    // public BulkDelete(qry: string, vals: any) {
    //     const global = this;
    //     return this._sequelize.query({
    //         query: qry,
    //         values: vals
    //     }, { type: this._sequelize.QueryTypes.BULKDELETE }).then(async function(data){
    //         if ((qry.indexOf('TempTable') < 0 && qry.indexOf('OfflineLog') < 0)) {
    //             await global._sequelize.query({
    //                 query: global.LogInsert(),
    //                 values: {query: qry, vals: JSON.stringify(vals), querytype: 'BULKDELETE'}
    //             }, { type: global._sequelize.QueryTypes.INSERT });
    //             return data;
    //         }
    //     });
    // }
    // public LogInsert() {
    //     return 'INSERT INTO OfflineLog (query,vals,querytype) VALUES (:query,:vals,:querytype)';
    // }
}

