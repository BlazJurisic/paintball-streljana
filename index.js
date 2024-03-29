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
    res.sendFile(__dirname + '/public/index.html')
})

app.post('*', (req, res) => {
    console.log(req.body)
    req.body
        && sendEmail(req.body, res)
})

server.listen(port, () => {
    console.log('Server is listening on port', port)
})

function sendEmail(data, res) {
    const senderEmail = 'paintball.streljana.zagreb@gmail.com'
    const recieverPass = 'Jasamsnajper5'
    //const recieverEmail = 'jurisic.blaz@gmail.com'
    const recieverEmail = 'paintball.streljana@gmail.com'
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: senderEmail,
            pass: recieverPass
        }
    });
    const mailOptions = {
        from: senderEmail,
        to: recieverEmail,
        subject: data.name,
        html: `
        <b>Ime pošaljitelja: </b>
        ${data.name} 
        <br>
        <b>Mail pošiljatelja: </b>
        ${data.email} 
        <br>
        <b>Poruka: </b>
        <br/>
        ${data.message}
        `
    }
    transporter.sendMail(mailOptions, (error, info) => {
        console.log("error: " + error)
        res.send(!!error)
    });
}

