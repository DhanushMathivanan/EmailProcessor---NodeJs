
import { WebApi } from './webApi';
import { IConfig, AppSetting } from './config';
import { SequelizeConfig, sequelize } from './helpers/sequelize';

const api = new WebApi();
const config: IConfig = AppSetting.getConfig();

// sql.setDefaultConfig(config.GetSQLConnectionString());
api.run();
console.log(`listening on ${config.Port}`);
sequelize.setConnection();
const app = new WebApi().app;
export { app };
