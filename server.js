// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});




app.get("/api/:date_string?", (req, res) => {
  date = req.params.date_string;
  if (!isNaN(Date.parse(date))) {

    res.json({ unix: Date.parse(date), utc: new Date(date).toUTCString() });
  }

  else if (isNaN(Date.parse(date)) && new Date(parseInt(date)) != "Invalid Date") {
    var date = new Date(parseInt(date));

    res.json({ unix: Date.parse(date), utc: new Date(date).toUTCString() });
  }

  else if (date == null) {
    date = new Date();
    res.json({ unix: Date.parse(date), utc: new Date(date).toUTCString() });
  }


  else {
    res.json({ error: "Invalid Date" })

  }

})



// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
