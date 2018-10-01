var request=require('request');
var express = require('express'),
  app = express(),
  http = require('http'),
  httpServer = http.Server(app),
  
  session = require('express-session');

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

  else if(intentFrom === 'input.upload_image') {
    var claimdata=CreateClaim()
    if(claimdata)    {
    msg = {
      "speech": "",
      "displayText": "",
      "messages": [{
        "type": 0,
        "platform": "facebook",
        "speech": "Your Cliam no is "+claimdata
      }]
      
    };
    return res.json(msg);
  }
  if(claimdata){
var priceve=priceConverter();
msg = {
  "speech": "",
  "displayText": "",
  "messages": [{
    "type": 0,
    "platform": "facebook",
    "speech": "Your Cliam price "+ priceve
  }]
  
};
  }
  }
 
 
  
  });
})

var jsonIncompleteTran = [];





app.post('/claimCreate',function (req, res){
      
})

var lossDate;
var lossType;
var lossCause;
var description

function CreateClaim()
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

 
  var claimno
request(options, function (error, response, body) {
  console.log('2------------',body);
  if (error) throw new Error(error);
console.log("Rakesh jha");
claimno= body.result;
  console.log(claimno);
  
  console.log('3------------',claimno);
   return claimno;
      
});

}

function priceConverter(){
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
     glassType: 'Safety Laminated Glass',
     windowType: 'Double Hung Windows' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  var price = body.result;
  console.log(body.result);
  
  console.log('price 3------------',price);

  return price;
  
});

}



app.listen(process.env.PORT || 9000);





   
