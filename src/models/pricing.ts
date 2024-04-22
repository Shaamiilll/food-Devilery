import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database'; 

class Pricing extends Model {
  public id!: number;
  public organizationId!: number;
  public itemId!: number;
  public zone!: string;
  public base_distance_in_km!: number;
  public km_price!: number;
  public fix_price!: number;
}

Pricing.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    organizationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    zone: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    base_distance_in_km: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    km_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    fix_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Pricing',
    tableName: 'Pricing', 
    timestamps: false, 
  }
);

export default Pricing;
