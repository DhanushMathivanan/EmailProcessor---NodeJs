const path = require('path');
declare let process: any;
// const electron = require('electron');
// const { app } = electron;

const config_dev =  {
    'Config': {
        'Port': 20500,
        'DBConnections': {
            'default': {
                'user': null,
                'password': null,
                'host': null,
                'database': 'twinkle',
                'requestTimeout': 300000,
                'dbType': 'sqlite',
                // 'storage': path.join(app.getPath("home"), '/AppData/Local/Master/TWINKLE/POC/twinkle.db')
                'storage': './dist/DB/twinkle.db'
            }
        },
        'OktaConfig': {
            'url': 'http://gmail.okta.com/oauth2'
        },
        'AppSettings': {
            'defaultTotalRecords': 100,
            'baseRoute': '/api',
            'exclude': [
                '/image',
                '/info',
                '/users'
            ],
            'masterAPI' : {
              'url': 'http://localhost:20400/api/'
            },
            // 'resourcePath' : path.join(app.getPath("home"), '/AppData/Local/Master/TWINKLE/POC/')
            'resourcePath' : './dist/DB/'
        },
        'AppConfig': {
            'name': 'NGX Seed',
            'version': '1.0.0'
        }
    }
};
export {config_dev};
