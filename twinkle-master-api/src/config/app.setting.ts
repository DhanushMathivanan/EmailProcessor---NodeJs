import { IConfig } from './IConfig';
import { Environment } from './environment';
import { ConfigManager } from './config.manager';

export class AppSetting {

    public static Env = Environment.Dev;

    public static checkValidToken = true;

    public static getConfig(): IConfig {
        const configManager = new ConfigManager();
        return configManager.Config;
    }
}
