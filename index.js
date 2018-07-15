var express = require('express'),
    app = express(),
    port = 3000,
bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const dotenv = require('dotenv').config();

const nodemailer = require('nodemailer');

usr = process.env.EM_USER,
psw = process.env.EM_PASS,
rec = process.env.EM_DEST;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));


app.get('/', function(req, res){
    //res.sendFile("index.html")
    res.render('index');
});


app.post('/send' , function(req , res){
    sendTo = req.body.email;
    var output = `
    <p> You have a new contact request</p>  
    <h3> Contact Details</h3>
    <ul>
        <li>name: ${req.body.name}</li>
        <li>email: ${req.body.email}</li>
        <li>number: ${req.body.number}</li>
    </ul>
        <h3>Message</h3>
        <p>name: ${req.body.message}</p>
    `;

    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: usr, // generated ethereal user
            pass: psw // generated ethereal password
        },
        tls:{
            rejectUnauthorized:false
        }
    });

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Anderson" <axzonexgamer@gmail.com>', // sender address
            to: rec, // list of receivers
            subject: 'node request', // Subject line
            text: 'Hello world?', // plain text body
            html: output // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info)  {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);

            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            //res.sendFile('index.html');
            res.render('index', {msg:'Email has been sent'});
            
            //return res.end();
        });
        //res.sendFile("index.html");
        //return res.end();
})

app.listen(port, function(){
    console.log("APP IS RUNNING " + port)
});


