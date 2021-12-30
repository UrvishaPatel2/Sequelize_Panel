const Sequelize = require('sequelize')
const sequelize = require('../middleware/db')


    const Testimonial = sequelize.define('tb_testimonial', {
        name:{
            type:Sequelize.STRING,
        },
        designation:{
            type:Sequelize.STRING,
        },
        description:{
           type: Sequelize.STRING,
        },
        uploadImage:{
            type:Sequelize.STRING,
        },
     })


module.exports=Testimonial;

