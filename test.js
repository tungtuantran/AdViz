function doThing(callback){
    let x = 8;

    console.log('hi');
    callback();
}

function hello(){
    console.log('hello steve');
}

lol();

function lol(){
    doThing(hello);
}

