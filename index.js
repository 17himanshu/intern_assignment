const express = require("express");
const app = express();
const SibApiV3Sdk = require('@getbrevo/brevo');
const bodyParser = require("body-parser");
const cors=require("cors")

app.use(cors());
app.use(bodyParser.json());

app.get("/",(req,res)=>{
    var absPath = __dirname;
    var path = absPath + "/public/index.html";
    res.sendFile(path);
})

app.post("/api/v1", (req, res) => {

    console.log(req.body)

    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    let apiKey = apiInstance.authentications['apiKey'];
    apiKey.apiKey = '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';

    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.subject = "My {{params.subject}}";
    sendSmtpEmail.htmlContent = "<html><body><h1>This is my second transactional email {{params.parameter}}</h1></body></html>";
    sendSmtpEmail.sender = { "name": "Himanshu", "email": "himanshusharmabthinda@gmail.com" };
    sendSmtpEmail.to = [{ "email": req.body.email, "name": req.body.name }];
    // sendSmtpEmail.cc = [{ "email": "example2@example2.com", "name": "Janice Doe" }];
    // sendSmtpEmail.bcc = [{ "name": "John Doe", "email": "example@example.com" }];
    sendSmtpEmail.replyTo = { "email": "replyto@domain.com", "name": "John Doe" };
    sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
    sendSmtpEmail.params = { "parameter": "My param value", "subject": "New Subject" };

    apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
        console.log('API called successfully. Returned data: ' + JSON.stringify(data));
        res.send("sent successfully");

    }, function (error) {
        console.error(error);
    });
})

app.listen(3001)