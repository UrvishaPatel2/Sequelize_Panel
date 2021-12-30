const contactModel = require('../models/contactModel');
const { addForm,editForm }=require('../validations/contactValidation');
const { logger } = require('../logger/logger');

exports.addData = async(req,res)=>{
    try{
        const {error} = addForm(req.body);
        if(error){ return res.status(400).send(error.details[0].message);
        }else{
            const data = {
                name:req.body.name,
                email:req.body.email,
                contactnumber:req.body.contactnumber,
                message:req.body.message,
                date:req.body.date,
            }

            const contactData = new contactModel(data)
            contactData.save()
                .then(data => {
                    res.send('Data Added')
                })
        }
    }catch(err){
        logger.error(err);
    }
}

exports.findData = async(req,res)=>{
    const users = await contactModel.findAll();
    res.send(users);
}

exports.findDataByid = async(req,res)=>{
    const id = req.params.id;
    console.log(id);
    const users = await contactModel.findByPk(id);
    if(users){
        res.send(users)
    }else{
        res.send('Invalid Id')
    }

}

exports.editData = async(req,res)=>{
    try{
        const {error} = editForm(req.body);
        if(error){ return res.status(400).send(error.details[0].message);
        }else{
            const id = req.params.id;
            console.log(id);
            const data = {
                name:req.body.name,
                email:req.body.email,
                contactnumber:req.body.contactnumber,
                message:req.body.message,
                date:req.body.date,
            }
        
            const result = await contactModel.update(data,{
                where:{id:id}
            })
            console.log("result",result);
            if(result){
                res.send(result)
            }else{
                res.send('not update')
            }         
        }
    }catch(err){
        logger.error(err);
    }
    
}

exports.deleteData = async(req,res)=>{
    const id = req.params.id;
    console.log(id);
    const users = await contactModel.findByPk(id);
    if(users){
        users.destroy(id);
        res.send('data deleted')

    }else{
        res.send('id not define')
    }

}