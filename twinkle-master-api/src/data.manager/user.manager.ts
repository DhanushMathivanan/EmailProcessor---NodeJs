import { SqlManager } from "../helpers/sequelize/sql.manager";
import { UserQuery } from "../queries/index";
//import { commonHelper, HttpHelper } from "../helpers";
import { pick, uniqBy } from 'lodash';
import { IConfig } from '../config/index';
import { AppSetting } from "../config/app.setting";

const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');

const imaps = require('imap-simple');
const inspect = require('util').inspect;
const fs = require('fs');
var path = require('path');

// import { RedisConfig } from "../config/redis.config";

export class UserManager {
    public GetEmailIdByUserID(globalUserID: string) {
        let query = UserQuery.GetUserByEmpID;
        let values = {};
        values['userId'] = globalUserID;
        return new SqlManager().Get(query, values);
    }

    public async sendEmail(options) {

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            secure: 'true',
            port: '465',
            auth: {
                type: 'OAuth2', //Authentication type
                user: 'mdiamdhanush18@gmail.com', //For example, xyz@gmail.com
                clientId: '505394479868-7pvh7rlif4g43vthm2b63k509gicc0pg.apps.googleusercontent.com',
                clientSecret: 'V1afAe4YkNrS8VUvbAHmP5bQ',
                refreshToken: '1//0fE22e_XzdVnRCgYIARAAGA8SNwF-L9IrRTCE4xp3oK5xjBXcJMmS26zTffpPeoYoJRzXCZDUY9gB9Tg8RaVeMZ_KhAyflyhjx7o'
            }
        });

        let mailOptions = {
            from: 'mdiamdhanush18@gmail.com',
            to: 'arvind2analytics@gmail.com',
            subject: 'Gmail Api Config',
            // text: `Hello Arvind - Welcome to Gmail Api 
            // This is a custom automated Message through node js`,
            html: options
        };


        await transporter.sendMail(mailOptions, async (error: any, info: any) => {
            await transporter.close();
            if (error) {
                return error;
            } else {
                return info;
            }
        });
    }

    public async readEmail(options) {

        let content = '';
        var config = {
            imap: {
                user: 'mdiamdhanush18@gmail.com',
                password: 'prpvslxavatwacit',
                host: 'imap.gmail.com',
                port: 993,
                tls: true,
                secure: 'true',
                auth: {
                    type: 'OAuth2', //Authentication type
                    user: 'mdiamdhanush18@gmail.com', //For example, xyz@gmail.com
                    clientId: '505394479868-7pvh7rlif4g43vthm2b63k509gicc0pg.apps.googleusercontent.com',
                    clientSecret: 'V1afAe4YkNrS8VUvbAHmP5bQ',
                    refreshToken: '1//0fE22e_XzdVnRCgYIARAAGA8SNwF-L9IrRTCE4xp3oK5xjBXcJMmS26zTffpPeoYoJRzXCZDUY9gB9Tg8RaVeMZ_KhAyflyhjx7o'
                },
                tlsOptions: { servername: 'imap.gmail.com', rejectUnauthorized: false }
                // authTimeout: 3000
            }
        };

        await imaps.connect(config).then(async function (connection) {
            console.log('handler1');

            return await connection.openBox('INBOX').then(async function () {

                console.log('handler2');
                // let delay = 24 * 3600 * 1000;
                // let yesterday = new Date();
                // yesterday.setTime(Date.now() - delay);
                // yesterday = yesterday.toISOString();
                var searchCriteria = [
                    'UNSEEN', ['SINCE', 'JUNE 05, 2020']
                ];

                var fetchOptions = {
                    bodies: ['HEADER', 'TEXT'],
                    markSeen: false
                };

                return await connection.search(searchCriteria, fetchOptions).then(async function (results) {
                    // var subjects = results.map(function (res) {
                    //     return res.parts.filter(function (part) {
                    //         return part.which === 'HEADER';
                    //     })[0].body.subject[0];
                    // });
                    let frameResult = results.map(function (value, index) {
                        return value.parts;
                    });

                    let subjects = [];
                    let str = '';
                    let index = 1;
                    let filecount = 0;


                    for (let i = 0; i < frameResult.length; i++) {
                        let subject = frameResult[i].filter(function (data, _ind) {
                            return data.which === 'HEADER';
                        });
                        subjects.push(subject[0].body.subject[0]);
                        console.log(subject[0].body.subject[0]);

                        let qry = subject[0].body.subject[0];
                        let data = JSON.stringify(qry);
                        let fileScript = data.slice(1, data.length - 1);
                        str = str + ` \r\n ` + fileScript;

                        content = content + "<br><br>" + fileScript + "<br><br>";

                        filecount++;

                        console.log('Process Count - ', filecount);

                        if ((filecount === (500 * index)) || (filecount === frameResult.length)) {
                            console.log('Number of SQL File created - ', index, 'Total Processed Records - ', frameResult.length);

                            const fileName = path.join(process.cwd(), `${index}_Mail_Parser.txt`);
                            let resultScript = JSON.parse(JSON.stringify(str));
                            fs.writeFile(fileName, resultScript, function (err) {
                                if (err) {
                                    return console.log(err);
                                }
                            });
                            str = '';
                            ++index;

                        }
                    }

                    // console.log(subjects);
                    return true;
                });
            });
        });

        await this.sendEmail(content);
        return { msg: 'email successfull true' };
    }

}
