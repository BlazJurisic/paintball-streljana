const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')

const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.get('*', (req, res) => {
    console.log(req)
    res.sendFile(__dirname + '/public/index.html')
})

app.post('*', (req, res) => {
    console.log(req.body)
    req.body
        && sendEmail(req.body.name, req.body.email, req.body.message)
})

server.listen(port, () => {
    console.log('Server is listening on port', port)
})

function sendEmail(name, email, message) {
    const recieverEmail = 'paintball.streljana.zagreb@gmail.com'
    const recieverPass = 'Jasamsnajper5'
    console.log("YAYYY")
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: recieverEmail,
            pass: recieverPass
        }
    });
    const mailOptions = {
        from: recieverEmail,
        to: recieverEmail,
        subject: name,
        text: `
        Ime pošaljitelja: 
        \n
        ${name} 
        \n
        Poruka: 
        \n
        \n
        ${message}
        `
    }

    transporter.sendMail(mailOptions, (error, info) => {
        error && res.send(error)
        console.log(error)
        console.log(info)
        res.send('Email sent: ' + info.response)

    });
}

