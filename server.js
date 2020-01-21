const
  express = require('express'),
  serveStatic = require('serve-static'),
  history = require('connect-history-api-fallback'),
  port = process.env.PORT || 5000
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()

app.use(bodyParser.json());
app.use(cors());


const partnerorder = require('./server/partnerorder');

app.use('/api/partnerorder', partnerorder);

if (process.env.NODE_ENV === 'production'){
  // Static folder
  app.use(express.static(__dirname + '/public/'));

  //Handle SPA
  app.get(/.*/, (req,res) => res.sendFile(__dirname));
}

app.use(history())
app.use(serveStatic(__dirname + '/dist/spa'))
app.listen(port,() => console.log(`Server started on port ${port}`))