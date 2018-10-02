var function1 = (resolve, reject)=>{
    console.log('calling 1');
    resolve();
};
var function2 = (resolve, reject)=>{
    console.log('calling 2');
    resolve();
};
var function3 = (resolve, reject)=>{
    console.log('calling 3');
    resolve();
};

var callback = function(){
    Promise.all([new Promise(function1), new Promise(function2), new Promise(function3)]).then(function(values){
        console.log('all done');
        setTimeout(callback, 1000);
        console.log('next call successfully enqued');
    });
};
setTimeout(callback, 1000);