const Sequelize = require('sequelize')
const sequelize = require('../middleware/db')


    const Portfolio = sequelize.define('tb_portfolio', {
        category_id:{
            type:Sequelize.INTEGER
        },
        pname:{
            type: Sequelize.STRING,
        },
        uploadImage:{
            type: Sequelize.STRING,
        },
        ptitle:{
           type: Sequelize.STRING
        },
        url:{
            type: Sequelize.STRING
         },
        pdate:{
            type: Sequelize.DATE
         }
     })


module.exports=Portfolio;