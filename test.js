
   var body={
        "id": "1",
    "msg": "hi"
   
    };
    console.log(body.id);
    for(var i = 0; i < body.length; i++) {
        var obj = body[i];
    
        console.log(obj.id);
        console.log(obj.msg);
    }