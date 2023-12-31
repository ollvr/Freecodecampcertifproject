// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html

/*
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
*/

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



app.get("/api/:date_string?", function (req, res) {
  let date =   req.params.date_string
  const getUtcFormat = (date) => {
    return date.toUTCString();
  };

  if (!date) {
    let now = new Date();
    res.json({ unix: now.getTime(), utc: getUtcFormat(now) });
  } else {
    
    let parsedDate = !isNaN(date) 
      ? new Date(parseInt(date)) 
      : new Date(date);
  
    if (!isNaN(parsedDate)) {
      res.json({ unix: parsedDate.getTime(), utc: getUtcFormat(parsedDate) });
    } else {
      res.json({ error: "Invalid Date" });
    }
  }


})
 


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
