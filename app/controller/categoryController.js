const categoryModel = require('../models/categoryModel');
const { addForm,editForm }=require('../validations/categoryValidation');
const { logger } = require('../logger/logger');

exports.addData = async(req,res)=>{
    try{
        const {error} = addForm(req.body);
        if(error){ return res.status(400).send(error.details[0].message);
        }else{
            const data = {
                categoryname: req.body.categoryname,
            }

            const categoryData = new categoryModel(data)
            categoryData.save()
                .then(() => {
                    res.send('Data Added')
                })
        }
    }catch(err){
        logger.error(err);
    }
}

exports.findData = async(req,res)=>{
    const users = await categoryModel.findAll();
    res.send(users);
}

exports.findDataByid = async(req,res)=>{
    const id = req.params.id;
    console.log(id);
    const users = await categoryModel.findByPk(id);
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
                categoryname: req.body.categoryname,
            }
        
            const result = await categoryModel.update(data,{
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
    const users = await categoryModel.findByPk(id);
    if(users){
        users.destroy(id);
        res.send('data deleted')

    }else{
        res.send('id not define')
    }

}