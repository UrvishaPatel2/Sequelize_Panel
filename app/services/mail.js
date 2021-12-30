const nodemailer = require('nodemailer');
const { logger } = require('../logger/logger');

const transport = nodemailer.createTransport({
    service: 'Gmail',
     secure: false,
    port: 25,
    auth:{
        user:process.env.SECRET_EMAIL,
        pass:process.env.SECRET_PASS
    }
})

const sendOTP = (email,otp)=>{
const mailSend = {
    to:email,
    subject:'OTP for New Password',
    html:"OTP for New Password" + "<b>" + "  " + otp +"</b>"
}

 const mail =transport.sendMail(mailSend,function(error){
    if(error){
        logger.error(err);
    }
    else{
        logger.info('Email is  sent'); 
    }
})
return mail;

}

module.exports={sendOTP};