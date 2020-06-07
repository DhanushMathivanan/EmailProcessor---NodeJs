import { sequelize } from '../helpers/sequelize';
import * as Sequelize from 'sequelize';
import * as moment from 'moment';

export class UsersModel {
    private sql;
    constructor() {
        this.sql = sequelize.getSequelize();
    }
    public UsersSchema() {
        return this.sql.define('Users', {
            GlobalUserID: {
                type: Sequelize.STRING,
                primaryKey: true,
                allowNull: false,
                set(val) {
                    this.setDataValue('GlobalUserID', val);
                  }
            },
            FirstName: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            LastName: Sequelize.STRING,
            IFMStaffCode: Sequelize.STRING,
            PrimaryFacilityCode: Sequelize.STRING,
            ApplicationName: Sequelize.STRING,

            PHXInitials: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false,
            },
            IsPHXActiveUser: {
                type: Sequelize.INTEGER,
                allowNull: false
            },

            OnLineStatus: {
                type: Sequelize.INTEGER,
                allowNull: false
            },

            IsOfflineUser: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            Email: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            PartnerID: {
                type: Sequelize.STRING
            },
            IsUserMigrated: {
                type: Sequelize.STRING,
                allowNull: true
            },
            CreatedBy: {
                type: Sequelize.STRING,
                allowNull: true,
                set(val) {
                    if (val) {
                        this.setDataValue('CreatedBy', val.toLowerCase());
                    }
                }
            },
            UpdatedBy: {
                type: Sequelize.STRING,
                allowNull: true,
                set(val) {
                    if (val) {
                        this.setDataValue('UpdatedBy', val.toLowerCase());
                    }
                }
            },
            UpdatedOn: {
                type: Sequelize.STRING,
                allowNull: false,
                set(val) {
                    this.setDataValue('UpdatedOn', moment.utc(new Date(val)).format('YYYY-MM-DD hh:mm:ss'));
                }
            },
            CreatedOn: {
                type: Sequelize.STRING,
                allowNull: false,
                set(val) {
                    this.setDataValue('CreatedOn', moment.utc(new Date(val)).format('YYYY-MM-DD hh:mm:ss'));
                }
            }
        },
        {
            tablename: 'Users',
            freezeTableName: true,
            timestamps: false
        });
    }
}
