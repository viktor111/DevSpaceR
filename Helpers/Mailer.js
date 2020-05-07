const nodemailer = require('nodemailer');

class Mailer{
   
    SendEmail(emailToSend, textToSend, subjectToSend){
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "devspacerbot@gmail.com",
                pass: "viktor124"
            }
        })

        let mailOptions = {
            from: "devspacerbot@gmail.com",
            to: emailToSend,
            subject: subjectToSend,
            text: textToSend
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if(err){
                console.log(err);                
            }
            else{
                console.log("Mail sent!");
            }
        })
    }
}

module.exports = Mailer;