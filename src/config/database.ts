import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('foodapp', 'postgres', '303358020', {
  host: 'localhost',
  dialect: 'postgres', 
});

export default sequelize;
