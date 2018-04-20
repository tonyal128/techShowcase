const https = require("https"); //used to call web service

getAlbum(); //get the album number from user

/*
getAlbum requests album number from user and accepts input in the form of a number
*/
function getAlbum(){
    console.log("Enter Album ID: "); //prompt user efor album number
    var stdin = process.openStdin(); //open input variable

    //listen for user input
    stdin.addListener("data", function(input){
        //if the input is a number, get the data from webservice. If not a number, alert user of incorrect input
        if(isNumber(input)){;
            getData(input.toString().trim());
        }
        else{
            console.log("Not a number, no album found.");
            return;
        }
    });
}

/*
Display results from the requested album
*/
function displayAlbum(body, albumId){
    console.log("Photo Album: " + albumId); //show the requested album id

    //if not null or empty, show the photo id and title of each photo in album. If null alert user of empty album
    if(body != null && body != ""){
        for(var result in body){
            console.log("[" + body[result].id + "] " + body[result].title);
        }
    }
    else{
        console.log("No photos found in album " + albumId);
    }
}

/*
Get data from webservice in json
*/
function getData(albumId){
    url = "https://jsonplaceholder.typicode.com/photos?albumId=" + albumId; //append album id to url query string
    https.get(url, res => {
        res.setEncoding("utf8");
        let body = "";
        res.on("data", data => {
        body += data;
        });
        res.on("end", () => {
        body = isJson(body); //if the data is JSON assign to body
        displayAlbum(body,albumId);
        });
    });
}

/*
Validate that data is JSON
*/
function isJson(body){
    try{
        return JSON.parse(body); //if data is JSON, return the parsed body
    }
    catch(e){
        console.log("Failed: JSON not passed in"); //if not JSON alert user of failure
    }
}

/*
Validate that input is a number
*/
function isNumber(input){
    if(!isNaN(input)){
        return true; //if input is number, return true
    }
    else{
        return false; //if input is not a number, return false
    }
}