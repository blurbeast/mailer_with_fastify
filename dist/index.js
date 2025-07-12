"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const dotenv_1 = __importDefault(require("dotenv"));
const brevo_1 = require("@getbrevo/brevo");
dotenv_1.default.config();
// import {
//     MailerSend,
//     EmailParams,
//     Sender,
//     Recipient,
// } from "mailersend";
async function main() {
    const app = (0, fastify_1.default)({
        logger: true
    });
    let emailer = new brevo_1.TransactionalEmailsApi();
    let api_key = process.env.brevo_api_key.trim();
    console.log("api key is :: {}", api_key);
    emailer.setApiKey(brevo_1.TransactionalEmailsApiApiKeys.apiKey, api_key);
    console.log("received emailer", emailer);
    let message = new brevo_1.SendSmtpEmail();
    message.subject = "an approach to get started";
    message.textContent = " this is the text content of the message";
    message.sender = { name: "Oladele", email: "gimabeh995@lhory.com" };
    message.to = [
        // {name: "blurbeast", email: "gimabeh995@lhory.com"},
        { name: "Samuel", email: "banjo.oladele.samuel@gmail.com" }
    ];
    // const mailersend = new MailerSend({ apiKey: api_key });
    // console.log("instance of Mailersend done :::", mailersend);
    // const sender = new Sender(
    //     "Oladele",
    //     "leumasre@gmail.com"
    // );
    // console.log("instance of Sender done :::", sender);
    // const recipients = [
    //     new Recipient("blurbeast", "banjo.oladele.samuel@gmail.com"),
    // ];
    // console.log("instances of Recipient done :::", recipients);
    // // create the email parameters
    // const email_params = new EmailParams()
    //     .setFrom(sender)
    //     .setTo(recipients)
    //     .setReplyTo(sender)
    //     .setSubject("Hello from Oladele, the blurbeast")
    //     .setHtml("<strong>here is after the subject called set html</strong>")
    //     .setText("this is the body which is the text of the email");
    app.listen({ port: 3000 }, (err, address) => {
        if (err) {
            app.log.error(err);
            err;
        }
        emailer.sendTransacEmail(message).then((mail) => {
            console.log("sent mail ::: ", mail);
        }).catch((err) => {
            console.error("error received :: ", err);
        });
        // mailersend.email.send(email_params).then((response) => {
        //     console.log("Email sent successfully:", response);
        //     app.log.info("Email sent successfully:", response);
        // }).catch((error) => {
        //     console.error("Error sending email:", error);
        //     // app.log.error("Error sending email:", error.body.error);
        // });
        app.log.info(`Server listening at ${address}`);
    });
}
main().catch(err => {
    console.error(err);
    process.exit(1);
});
