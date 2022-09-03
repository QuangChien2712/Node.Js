require('dotenv').config();
const nodemailer = require("nodemailer");
// import nodemailer from "nodemailer";

let sendSimpleEmail = async(dataSend) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Võ Quang Chiến" <cvoquang2@gmail.com>', // sender address
        to: dataSend.reciverEmail, // list of receivers
        subject: "Thông tin từ website Võ Quang Chiến", // Subject line
        html: getBodyHTMLEmail(dataSend), // html body
    });
}

let getBodyHTMLEmail = (dataSend) => {
    let result = "";
    if (dataSend.language === "vi") {
        result =
            `<h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn nhận được email này vì đã test thử thành công</p>
       
        <p>Vui lòng xác nhận dưới đây: </p>
        <div>
        <a href = ${dataSend.redirectLink} target = "_blank">Click here</a>
        </div>
        `
    }

    // <div><b>Thời gian: ${dataSend.time}</b></div>
    // <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>

    if (dataSend.language === "en") {
        result =
            `<h3>Dear ${dataSend.patientName}!</h3>
        <p>You received this email because the test was successful</p>
        
        <p>Please confirm below: </p>
        <div>
        <a href = ${dataSend.redirectLink} target = "_blank">Click here</a>
        </div>
        `
    }

    // <div><b>Time: ${dataSend.time}</b></div>
    // <div><b>Doctor: ${dataSend.doctorName}</b></div>
    return result;
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail
}