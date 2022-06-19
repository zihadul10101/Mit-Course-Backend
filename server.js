var express = require('express');
const dotEnv = require('dotenv');
const bodyParser = require('body-parser');
var app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const dbConnect = require('./config/dbConnect');
const dashboradRouter = require('./routes/Dashborad/dashboradRoutes');


app.get('/', (req, res) => {
    res.send('Hello Bangladesh!')
  })

  dotEnv.config({
    path: './config/config.env'
  })

  // use meddlewer
app.use(cookieParser())
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))


// router use

app.use('/rest-api', dashboradRouter)
dbConnect();



const PORT = 4000;

app.listen(PORT, (error) => {
  if (!error) {
    console.log(`Server is running at ${PORT}`)
  }
})