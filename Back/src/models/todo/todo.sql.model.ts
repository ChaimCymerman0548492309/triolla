import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/db';

export class SqlTodo extends Model {
  public id!: number;
  public title!: string;
  public completed!: boolean;
  public userId!: string;
  public mongoId?: string;
  public description?: string;
  public url?: string;
  public createdAt?: Date;
  public dueDate?: Date;
  public updatedAt?: Date;
  
}

SqlTodo.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    completed: { type: DataTypes.BOOLEAN, defaultValue: false },
    userId: { type: DataTypes.STRING, allowNull: false },
    mongoId: { type: DataTypes.STRING, allowNull: true },
    description: { type: DataTypes.STRING, allowNull: true },
    url: { type: DataTypes.STRING, allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    dueDate: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'todos',
    timestamps: false, // אם רוצים Sequelize יעדכן updatedAt אוטומטית אפשר להפעיל true
  },
);
