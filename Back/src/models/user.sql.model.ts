import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db/db';

export class SqlUser extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
}

SqlUser.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // כמו במונגו אם תרצה יוניק
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'users_new_app',
    timestamps: false,
  },
);
