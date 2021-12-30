const Sequelize = require('sequelize')
const sequelize = require('../middleware/db')


    const User = sequelize.define('user', {
        name:{
            type:Sequelize.STRING,
        },
        email:{
            type: Sequelize.STRING,
            unique:true
        },
        gender:{
            type:Sequelize.STRING,
            values:['male','female']
        },
        phoneno:{
           type: Sequelize.STRING,
        },
        password:{
            type:Sequelize.STRING,
        },
        uploadImage:{
            type:Sequelize.STRING,
        },
        city:{
           type: Sequelize.STRING
        }
     })


module.exports=User;