var request = require("request");
var userDetails;

function add(a,b){
    var rakesh=a/b;
return rakesh
}

function div(a,b){
    var rakesh=a*b;
return rakesh
}

var errHandler = function(err) {
    console.log(err);
}

function main() {
    var dataPromise = add(10,5);
    // Get user details after that get followers from URL
    dataPromise.then(JSON.parse, errHandler)
               .then(function(result) {
                    userDetails = result;
                    // Do one more async operation here
                    var anotherPromise = getData(userDetails,10).then(JSON.parse);
                    return anotherPromise;
                }, errHandler)
                .then(function(data) {
                    console.log(data)
                }, errHandler);
}


main();


var price;
function priceConverter(req,res){
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
  var validprice= body;
  price=validprice.glassCost
  console.log(validprice.glassCost);
});

return price;
  
}


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
  
  if (error) throw new Error(error);
console.log("Rakesh jha");
claimno = body.result;
return new Promise(function(resolve, reject) {
    // Do async job
    request.get(options, function(err, resp, body) {
        if (err) {
            reject(err);
        } else {
            resolve(body);
        }
    })
})        
      
});
return claimno;
}