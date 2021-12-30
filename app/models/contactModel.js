const Sequelize = require('sequelize')
const sequelize = require('../middleware/db')


    const Contact = sequelize.define('tb_contact', {
        name:{
            type:Sequelize.STRING,
        },
        email:{
            type: Sequelize.STRING,
            unique:true
        },
        contactnumber:{
           type: Sequelize.STRING,
        },
        message:{
            type:Sequelize.STRING,
        },
        date:{
           type: Sequelize.DATE
        }
     })


module.exports=Contact;