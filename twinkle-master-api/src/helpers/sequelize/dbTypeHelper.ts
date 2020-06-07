import { AppSetting, IConfig } from '../../config';

export class DBTypeHelper {
    private static dbType: String;

    public static getDBType() : String {
        if (!this.dbType) {
            const config: IConfig = AppSetting.getConfig();
            const dbInfo = config.DBConnections['default'];
            this.dbType = dbInfo.dbType;
        }
        return this.dbType;
    }
}