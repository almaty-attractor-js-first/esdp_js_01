const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main(){
    let transporter = nodemailer.createTransport({
        host: "smtp.yandex.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'natebevlast@yandex.kz', // generated ethereal user
            pass: 'KZApex2017' // generated ethereal password
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Shoes service" natebevlast@yandex.kz', // sender address
        to: 'imtheone3@gmail.com', // list of receivers
        subject: "Hello, fellow your order is received", // Subject line
        text: "It's okay, we are testing here", // plain text body
        html: "<b>Hello Worldo</b>" // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
