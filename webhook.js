var request=require('request');
var express = require('express'),
  app = express(),
  http = require('http'),
  httpServer = http.Server(app),
  
  session = require('express-session');
const crypto = require('crypto');
var router = express.Router();
// Moment JS




var bodyParser = require('body-parser');
var fs = require('fs');
const requestAPI = require('request');
app.use(bodyParser.json());
app.use(session({
  secret: 'login',
  key: 'opty'
}));
app.use(express.static(__dirname));
// app.use(passport.initialize());
// app.use(passport.session());
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));

app.post("/webhook",async (req,res)=>{
  var options = {
    url: "https://api.dialogflow.com/v1/query?v=20150910",
    method: "POST",
    headers: { 'Authorization': 'Bearer ' + '60da65e2782f4c1ab12a48a2f56cdc3d', 'Content-Type': 'application/json'},
    body: req.body,
    json: true
  };
  await requestAPI(options, function (error, response, body) {
  console.log('1------------',body);
    
      
             res.send(body);
    
  
  });
})

var jsonIncompleteTran = [];

app.get('/', function (req, res) {
  res.send("/richowebsites");
});


app.get('/chatwindow', function (req, res) {
  readFile("IncompleteTransaction.json", function (hasFile, data) {
    if (hasFile) {
      jsonIncompleteTran = data;
    }
    res.sendfile(__dirname + '/chatwindow1.html');
  });
});
app.get('/roaming', function (req, res) {
  readFile("IncompleteTransaction.json", function (hasFile, data) {
    if (hasFile) {
      jsonIncompleteTran = data;
    }
    res.sendfile(__dirname + '/roaming.html');
  });
});
app.get('/chat', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});




app.post("/fulfillment", async function (req, res) {


  
  console.log("body", JSON.stringify(req.body));
  console.log(JSON.stringify(req.body.result.action));
  var sessionId = req.body.sessionId;
  console.log("sessionId", sessionId);
  console.log('Inside Policy API');
  let intentFrom = req.body.result.action;
  let intentQuery = req.body.result.resolvedQuery;
  let intentParam = req.body.result.parameters;
  var objData = null;
  var type = null;
  var smsType = null;
  var smsContent = '';
  var resp = commonFiles.WelcomeMsg();
  var msg = '';
  
  
  if (intentFrom === 'input.welcome' ) {
    msg = {
      "speech": "",
      "displayText": "",
      "messages": [{
        "type": 0,
        "platform": "facebook",
        "speech": "Hello. I'm Macy! How can help you today? Enter your question below and I'll help you find the information you need"
      }]
      
    };
    return res.json(msg);
  } else if(intentFrom === 'input.glassClaim') {
    msg = {
      "messages":[{
        "type":0,
        "platform":"facebook",
        "speech":"Sorry about that. We'll help you get this claim sorted out in no time."
      },
      {
        "type":4,
        "platform":"facebook",
        "payload":{
          "facebook":{
            "text":"Is it related to your Auto, Home or Businessowners policy?",
            "quick_replies_img":[{
              "content_type":"text",
              "title":"Auto",
              "payload":"Auto"
            },{
              "content_type":"text",
              "title":"Home",
              "payload":"Home"
            },{
              "content_type":"text",
              "title":"Business",
              "payload":"BusinessOwners"
            }]
          }
        }
      }
    ]};
    return res.json(msg);
    //,
    //"image_url":"avatar/image/Auto.svg"
  } else if(intentFrom === 'input.policy') {
    msg = {
      "speech": "",
      "displayText": "",
      "messages": [{
        "type": 0,
        "platform": "facebook",
        "speech": "Thanks for the details! Please hold on, while we check your coverage details <br><br>Happy to inform that your broken window is covered under your Homeowners policy <br><br> We'll need some more information to help you with the claim processing <br><br>When did the accident occur ? example It happened on 31st Aug / Yesterday / Today / Day"
      }]
      
    };
    return res.json(msg);
  }

  else if(intentFrom === 'input.OtherOptionRes') {
    msg = {
      "speech": "",
      "displayText": "",
      "messages": [{  
      "type":4,
      "platform":"facebook",
      "payload":{
        "facebook":{
          "text":"Please select an option for us to proceed further",
          "quick_replies_img":[{
            "content_type":"text",
            "title":"Cash Payment of USD",
            "payload":"Cash Payment of USD"
          },{
            "content_type":"text",
            "title":"2 weeks repair",
            "payload":"2 weeks repair"
          },{
            "content_type":"text",
            "title":"Self Quotes",
            "payload":"Self Quotes"
          }]
        }
      }
    }
    ]};
    return res.json(msg);
  }
  
});
//POST Call Endpoint




app.listen(process.env.PORT || 9000);





   