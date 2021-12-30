const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { register,login,resetpassword,verifyEmail,updatePassword,editProfile} = require('../validations/userValidation');
const { sendOTP } = require('../services/mail');
const { logger } = require('../logger/logger');


var otp = Math.floor(100000 + Math.random() * 900000);
console.info(otp);

exports.register = async(req,res)=>{
try{

    const {error} = register(req.body);
    if(error){
         return res.status(400).send(error.details[0].message);
    }else{
        let user = await userModel.findOne({where:{email:req.body.email}})
        if(user){
            res.send('User Already Register');
        }else{
            const salt = await bcrypt.genSalt(10);
            const bcryptPassword = await bcrypt.hash(req.body.password, salt);

            const data = {
                name: req.body.name,
                email: req.body.email,
                gender: req.body.gender,
                phoneno: req.body.phoneno,
                password: bcryptPassword,
                uploadImage: req.file.filename,
                city: req.body.city
            }

            const userData = new userModel(data)
            userData.save()
                .then(data=>{
                    res.send('Register Successfully')
                })
        }

    }
}catch(err){
    logger.error(err);
}
}

exports.login = async(req,res)=>{
    try{
        const {error} = login(req.body);
    
        if(error){
            return res.status(400).send(error.details[0].message);
        }else{
           
            let user = await userModel.findOne({where: {email: req.body.email} });
           
            if(user){
                const password = req.body.password;
              
                const validPassword = await bcrypt.compare(password, user.password);

                if(validPassword){
                    res.send('Login Successfully')
                }
                else{
                    res.send('Invalid Password')
                }

            }else{
                res.send('user not found')
            }
        }
    }catch(err){
        logger.error(err);
    }
}

exports.forgetPassword = async(req,res)=>{
    try{
        const {error} = verifyEmail(req.body);
    
        if(error){
            return res.status(400).send(error.details[0].message);
        }else{
            let user = await userModel.findOne({where:{ email: req.body.email }});
            if(user){
                sendOTP(req.body.email, otp);
                res.send('OTP send',{
                    email:req.body.email
                });
            }else{
                res.send('user not found')
            }
        }
    }catch(err){
        logger.error(err);
    }

}

exports.verifyOtp = async(req,res)=>{
    try{
        if(otp == req.body.otp){
            res.send('otp verify',{
                email:req.body.email
            });
        }
        else{
            res.send('Invalid Otp')
        }
    }catch(err){
        logger.error(err);
    }
}

exports.updatePassword = async(req,res)=>{
    try{
        const {error} = updatePassword(req.body);
        if(error){
             return res.status(400).send(error.details[0].message);
        }else{

            const salt = 10;
            const bcryptPassword = await bcrypt.hash(req.body.password, salt);
            const passwordUpdate = { password: bcryptPassword };
           
             await userModel.update(passwordUpdate,{ where:{email:req.body.email} },(err,response)=>{
                if(response){
                    console.log(response);
                    res.send('Password Updated')
                }
                else{
                    logger.error(err);
                }
            });
            
        }
    }catch(err){
        logger.error(err);
    }
}

exports.resetPassword = async(req,res)=>{
    try{
        const {error} = resetpassword(req.body);
        if(error){
             return res.status(400).send(error.details[0].message);
        }else{
            const password = req.body.password;
            
            const email = req.user.email;
            
            const user = await userModel.findOne({email:email});

            if(user){
                

                const passwordValid = await bcrypt.compare(password, user.password);

                if(passwordValid){
                    const salt = await bcrypt.genSalt(10);
                    const bcryptPassword = await bcrypt.hash(req.body.newpassword, salt);
                    
                   await userModel.update({password:bcryptPassword},{ where:{email:email} },(err,response)=>{
                        if(response){
    
                            res.send('Password Updated')
                        }else{
                            console.log(err);
                        }
                    })

                }else{
                    res.send('password is incorrect')
                }
            }
        }
    }catch(err){
        logger.error(err);
    }
}

exports.viewProfile = async(req,res)=>{
    const email = req.user.email;
    try{
        const user = await userModel.findOne({email});
        if(user){
            res.send(user)
        }else{
console.log("err");
        }
    }catch(err){
        logger.error(err);
    }
}

exports.editProfile = async(req,res)=>{
    try{
        const {error} = editProfile(req.body);
        if(error){ return res.status(400).send(error.details[0].message);
        }else{
            const data ={
             name: req.body.name,
             email:req.body.email,
             gender: req.body.gender,
             phoneno:req.body.phoneno,
             uploadImage:req.file.filename,
             city:req.body.city    
            }
        console.log(data);
            await userModel.update({data:data},{where:{email:req.user.email}},(err,response)=>{
                if(response){
                    console.log(response);
                    res.send('Data Updated')
                }else{
                    logger.error(err);
                }
            })
        }
    }catch(err){
        logger.error(err);
    }
}

exports.logout = (req, res) => {
    try {
        res.clearCookie("jwt");
        res.send('log out');
    } catch (err) {
        logger.error(err);
    }
}