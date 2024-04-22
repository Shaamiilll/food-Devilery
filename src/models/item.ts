import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database'; 

class Item extends Model {
  public id!: number;
  public type!: string;
  public description!: string;
}

Item.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Item',
    tableName: 'Item', 
    timestamps: false, 
  }
);

export default Item;
