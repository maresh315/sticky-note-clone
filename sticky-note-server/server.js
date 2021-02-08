const express = require('express');
const http = require('http');
const routes = require('./routes');
const morgan = require('morgan');
const cors = require('cors')
const app = express();
const httpServer = http.createServer(app);

const allowlist = ['http://localhost:4200']
const corsOptionsDelegate = (req, callback) =>{
  let corsOptions = {};
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = {
			origin: true,
			optionsSuccessStatus: 200
		} // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = {
			origin: false,
			optionsSuccessStatus: 200
		} // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use(express.json());
app.use(morgan('dev')); // logger
app.use(cors(corsOptionsDelegate))
app.use('/', routes);



httpServer.listen(2000, ()=>console.log('Server is Running'))