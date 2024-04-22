import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database'; 

class Organization extends Model {
  public id!: number;
  public name!: string;
}

Organization.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Organization',
    tableName: 'Organization',
    timestamps: false,
  }
);

export default Organization;
