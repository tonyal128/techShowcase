const https = require("https");

getAlbum();

function getAlbum(){
    console.log("Enter Album ID: ");
    var stdin = process.openStdin();
    stdin.addListener("data", function(input){
        if(isNumber(input)){;
            getData(input.toString().trim());
        }
        else{
            console.log("Not a number, no album found.");
            return;
        }
    });
}

function displayAlbum(body, albumId){
    console.log("Photo Album: " + albumId);

    if(body != null && body != ""){
        for(var result in body){
            console.log("[" + body[result].id + "] " + body[result].title);
        }
    }
    else{
        console.log("No photos found in album " + albumId);
    }
}

function getData(albumId){
    url = "https://jsonplaceholder.typicode.com/photos?albumId=" + albumId;
    https.get(url, res => {
        res.setEncoding("utf8");
        let body = "";
        res.on("data", data => {
        body += data;
        });
        res.on("end", () => {
        body = isJson(body);
        displayAlbum(body,albumId);
        });
    });
}

function isJson(body){
    try{
        return JSON.parse(body);
    }
    catch(e){
        console.log("Failed: JSON not passed in");
    }
}

function isNumber(input){
    if(!isNaN(input)){
        return true;
    }
    else{
        return false;
    }
}