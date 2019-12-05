import nodemailer from 'nodemailer';

class Mailer {
    constructor(){
        this.transporter = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            secureConnection: true,
            auth: {
                user: "pockettanks60@gmail.com",
                pass: "Pockettanks@60"
            }
        });
    }
    async sendEmail(to, subject, html){
        try{
            let message = {
                from: "no-reply@pocettanks.com",
                to: to,
                subject: subject,
                html: html
            }
            await this.transporter.sendMail(message)
        }
        catch(error){
            throw new Error(error.message);
        }
    }
}
export default Mailer;