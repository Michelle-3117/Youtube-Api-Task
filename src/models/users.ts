import { DataTypes, Model } from 'sequelize';
import db from '../config/database.config';


interface UserAttributes {
  id: string;
  fullname: string;
  email: string;
  password: string;
  phonenumber: string;
}

export class UserInstance extends Model<UserAttributes> { }

UserInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'First name is required',
        },
        notEmpty: {
          msg: 'First name cannot be empty',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Email is required',
        },
        notEmpty: {
          msg: 'Email cannot be empty',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password is required',
        },
        notEmpty: {
          msg: 'Password cannot be empty',
        },
      },
    },
    phonenumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Phone number is required',
        },
        notEmpty: {
          msg: 'Phone number cannot be empty',
        },
      },
    },
  },
  {
    sequelize: db,
    modelName: 'User',
  },
);