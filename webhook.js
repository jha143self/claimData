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


var claimno;
var lossDate;
var lossType;
var lossCause;
var description;
var price;
var height;
var width;
var thickness;
var glassType;
var windowType;
var gSize;

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
 
  else if(intentFrom === 'input.date') {

    lossDate=intentParam.date;
    console.log(lossDate);
    msg = {
      "speech": "",
      "displayText": "",
      "messages": [{
        "type": 0,
        "platform": "facebook",
        "speech": "Please upload the picture of the damaged glass?"
      }]
      
    };
    return res.json(msg);
  }

  else if(intentFrom === 'input.damaged') {
    msg = {"speech": "Hold on for a moment while we get the details of the damaged glass",
    "messages": [
       
        {
          "type": 2,
          "platform": "facebook",
          "title": "Can you validate the type of window? You can select another one if the suggested window type is not correct",
          "replies": [
            "Single Hung"
          ]
        }
      ]
  
      };
    return res.json(msg);
  }
 
  
  else if(intentFrom === 'input.windows') {

    windowType=intentParam.Windows;
    console.log(windowType);
    msg = {"speech": "",
    "messages": [
           {
        "type": 2,
        "platform": "facebook",
        "title": "Can you validate the type of glass? You can select another one if the suggested glass type is not correct",
        "replies": [
          "Float Glass"
        ]
      }
    ]

    }
    return res.json(msg);
  }
  else if(intentFrom === 'input.Glass') {
    glassType=intentParam.GlassType;
    
    console.log(glassType);
    msg = {
      "speech": "",
      "displayText": "",
      "messages": [{
        "type": 0,
        "platform": "facebook",
        "speech": "Input the correct size of the glass; Height (in cm) x Width (in cm) x Thickness (in mm)"
      }]
      
    };
    return res.json(msg);
  }
  

  else if(intentFrom === 'input.GlassSize') {
    gSize=intentParam.GlassSize;
    console.log(gSize);
    console.log(glassType);
    console.log(windowType);
    console.log(lossDate);
    var price={};
    claimno=CreateClaim(req,res);
   price=priceConverter(req,res);
   console.log("claimno Jha"+claimno);
   console.log("Rakkesh Jha"+price);
  //if(price!=null){
   msg={
      "speech": "",
       "displayText": "",
       "messages": [{
        "type": 0,
        "platform": "facebook",
        "speech": "Your Claim number is CL  "+claimno
      },{
        "type": 0,
        "platform": "facebook",
        "speech": "Based on the quotes received from the market, you are entitled to a claims payment of "+price+
        ". We've added an additional 10% to the market rates to cover any additional expenses that you may incur. "
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

function CreateClaim(req,res)
{
  //console.log('inside create claim------------',req);
  var options = { method: 'POST',
     
  url: 'http://35.154.116.87:8080/cc/service/edge/fnol/cfnol',

  headers:

   { 'postman-token': 'ff149a5b-daaf-0000-0b8c-5301c162be75',

     'cache-control': 'no-cache',

     authorization: 'Basic c3U6Z3c=',

     accept: 'application/json',

     'content-type': 'application/json' },

  body:

   { jsonrpc: '2.0',

     method: 'createClaimForHomeOwners',

     params:

      [ { lossDate: '2018-09-27T00:00:00Z',

          lossType: 'PR',

          lossCause: 'glassbreakage',

          description: 'windowcrashed' } ] },

  json: true };

 

request(options, function (error, response, body) {
  console.log('2------------',body);
  if (error) throw new Error(error);
console.log("Rakesh jha");
claimno = body.result;
  console.log(claimno);
  
  console.log('3------------',claimno);
          
      
});
return claimno;
}

function priceConverter(req,res){
  gSize
  glassType
  windowType
  console.log((gSize&&glassType&&windowType!==null));
  if(gSize&&glassType&&windowType!==null){
  var options = { method: 'POST',
  url: 'http://35.154.116.87:7999/aa/getMockGlassCost',
  headers: 
   { 'postman-token': '225193bc-ade0-bb34-6a7e-b6e8851b7c3b',
     'cache-control': 'no-cache',
     'content-type': 'application/json' },
  body: 
   { height: 70,
     width: 30,
     thickness: 33,
     glassType: glassType,
     windowType: windowType },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  var validprice= body;
  price=validprice.glassCost
  console.log(validprice.glassCost);
});
  }

return price;
  
}


app.listen(process.env.PORT || 9000);
