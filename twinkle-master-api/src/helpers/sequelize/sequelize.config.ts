import { AppSetting, IConfig } from '../../config';
import {Sequelize as SqlConnection} from 'sequelize';
import { ConfigManager } from '../../config/config.manager';
export class SequelizeConfig {
    private sequelize: SqlConnection;
    // private lineageSequelize: SqlConnection.Sequelize;
    public setConnection() {
        const config: IConfig = AppSetting.getConfig();
        const dbInfo = config.DBConnections['default'];
        this.sequelize = new SqlConnection(dbInfo.database, dbInfo.user, dbInfo.password, {
            host: dbInfo.host,
            dialect: dbInfo.dbType,
            logging: true,
            storage: dbInfo.storage
        });
        this.ping(dbInfo);
        return this.sequelize;
    }
    private ping(dbInfo) {
        this.sequelize
            .authenticate()
            .then(function (err) {
                console.log(`Connection has been established to the database: ${dbInfo.server} - ${dbInfo.database} successfully.`);
            })
            .catch(function (err) {
                console.log(`Unable to connect to the database: : ${dbInfo.server} - ${dbInfo.database}`, err);
            });
    }
    public getSequelize() {
        return this.sequelize;
    }

}

export const sequelize = new SequelizeConfig();
