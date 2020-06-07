import { IConfig } from './IConfig';
import { AppSetting } from './app.setting';
import { config_dev } from './config.dev';
import { Environment } from '.';
import { dirname } from 'path';
const nconf = require('nconf');
const path = require('path');

export class ConfigManager {
    public Config: IConfig;
    constructor(pth?: string) {
        let filename;

        switch (AppSetting.Env) {
            case Environment.Dev:
            case Environment.Testing:
                this.Config = <IConfig>config_dev.Config;
                break;
            case Environment.BusDev:
                this.Config = <IConfig>config_dev.Config;
                break;
            default:
                this.Config = <IConfig>config_dev.Config;
        }
        if (!this.Config) {
            process.exit();
        }

    }
    public reset() {
        nconf.reset();
        nconf.clear();
    }
}
