const Sequelize = require('sequelize')
const sequelize = require('../middleware/db')

const Category = sequelize.define('tb_category',{
    categoryname:{
        type:Sequelize.STRING,
    }
});

module.exports = Category;