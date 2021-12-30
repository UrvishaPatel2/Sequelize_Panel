const Sequelize = require('sequelize');
const { logger } = require('../logger/logger');

const sequelize = new Sequelize('db_sequelize','root','',{
    host:'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
.then(()=>{
    logger.info("connected....");
})
.catch(err=>{
    logger.error(err);
})

module.exports = sequelize;


