//Index - Entry point to the application (see package.json, main attribute)
//This full stack application uses raw Node modules from scaratch without the assistance of any frameworks such as express!
//Website is hosted on render.com
//Database is hosted on freesqldatabase.com

//Node module breakdown:
//1. http - used to create server
//2. mysql - used to initiate the mysql databse
//3. url - provides utilities for parsing, constructing, and manipulating URLs
//4. fs - used to read and write files (can be sent in response from server)
//5. node:querystring - used to parse form data (sent from frontend)

const http = require('http'); 
const mysql = require('mysql2'); 
const urlParsing = require('url'); 
const fs = require('fs'); 
const querystring = require('node:querystring');


//SERVER
//1. Request = what is coming from the frontend, it's url (chunk is the end of the url)
//2. Response = what will be sent back to the frontend
//3. The querystring. parse() method parses a URL query string ( str ) into a collection of key and value pairs * , aka JSON string
//4. Must inlude headers to enable CORS for communication between fronend-backend
const server = http.createServer((request, response)=>{
const url = request.url;
const method = request.method;
const parsedUrl = urlParsing.parse(url, true)

//Creating API Endpoints: 
switch(url){

    //Server response: Add new SKU
    case '/newSKU':
        let newSKUbody = '';
        request.on('data', chunk =>{ 
        newSKUbody += chunk.toString();
        });
        request.on('end', ()=>{
        const parsedData = querystring.parse(newSKUbody);
        response.writeHead(200, {  
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin' : '*'});
        const jsonString = JSON.stringify(parsedData);
        const jsonObject = JSON.parse(jsonString);
        const newSKU = jsonObject.sku
        connection.query(`CREATE TABLE ${newSKU} (entryID int NOT NULL AUTO_INCREMENT, Title varchar(255), Entry varchar(255) NOT NULL, PRIMARY KEY (entryID));`, (err, results) =>{
            if (err) {console.log(err); return;}
            else {console.log(`${newSKU} added to database!`);}})
            response.end();
        });
    break;

    //Server response: Delete SKU
    case '/deleteSKU':
        let deleteSKUbody = '';
        request.on('data', chunk =>{ 
        deleteSKUbody += chunk.toString();
        });
        request.on('end', ()=>{
        const parsedData = querystring.parse(deleteSKUbody);
        response.writeHead(200, {  
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin' : '*'});
        const jsonString = JSON.stringify(parsedData);
        const jsonObject = JSON.parse(jsonString);
        const deleteSKU = jsonObject.sku
        connection.query(`DROP TABLE ${deleteSKU}`, (err, results) =>{
            if (err) {console.log(err); return;}
            else {console.log(`${deleteSKU} deleted from database!`);}})
            response.end();
        });
    break;

    //Server response: Delete SKU
    case '/changeSKU':
        let changeSKUbody = '';
        request.on('data', chunk =>{ 
        changeSKUbody += chunk.toString();
        });
        request.on('end', ()=>{
        const parsedData = querystring.parse(changeSKUbody);
        response.writeHead(200, {  
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin' : '*'});
        const jsonString = JSON.stringify(parsedData);
        const jsonObject = JSON.parse(jsonString);
        const currentSKU = jsonObject.sku;
        const updatedSKU = jsonObject.newSKU;
        connection.query(`RENAME TABLE ${currentSKU} to ${updatedSKU}`, (err, results) =>{
            if (err) {console.log(err); return;}
            else {console.log(`${currentSKU} changed to ${updatedSKU}!`);}})
            response.end();
        });
    break;

    //Server response: Add Sku Entry
    case '/addEntry':
        let addEntrybody = '';
        request.on('data', chunk =>{ 
        addEntrybody += chunk.toString();
        });
        request.on('end', ()=>{
        const parsedData = querystring.parse(addEntrybody); 
        response.writeHead(200, {  
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin' : '*'});
        const jsonString = JSON.stringify(parsedData);
        const jsonObject = JSON.parse(jsonString);
        const addEntrySKU = jsonObject.sku;
        const addEntryTitle = jsonObject.title;
        const addEntryEntry = jsonObject.skuEntry;
        connection.query(`INSERT INTO ${addEntrySKU} (Title, Entry) VALUES ("${addEntryTitle}", "${addEntryEntry}")`, (err, results) =>{
            if (err) {console.log(err); return;}
            else {console.log(`${addEntryTitle} added to ${addEntrySKU}!`);}
        })
        response.end();
        });
    break;

    //Server response: Updated Data Title
    case '/updateTitle':
        let updateTitleBody = '';
        request.on('data', chunk =>{ 
        updateTitleBody += chunk.toString();
        });
        request.on('end', ()=>{
        const parsedData = querystring.parse(updateTitleBody); 
        response.writeHead(200, {  
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin' : '*'});
        const jsonString = JSON.stringify(parsedData);
        const jsonObject = JSON.parse(jsonString);
        const updateTitleSKU = jsonObject.sku;
        const updateTitle1 = jsonObject.title;
        const updateTitle2 = jsonObject.updatedTitle;
        connection.query(`UPDATE ${updateTitleSKU} SET title = "${updateTitle2}" WHERE title = "${updateTitle1}"`, (err, results) =>{
            if (err) {console.log(err); return;}
            else {console.log(`${updateTitle1} updated to ${updateTitle2} in ${updateTitleSKU}`);}
        })
        response.end();
        });
    break;

    //Server response: Update Data Entry
    case '/updateEntry':
        let updateSkuEntrybody = '';
        request.on('data', chunk =>{ 
        updateSkuEntrybody += chunk.toString();
        });
        request.on('end', ()=>{
        const parsedData = querystring.parse(updateSkuEntrybody); 
        response.writeHead(200, {  
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin' : '*'});
        const jsonString = JSON.stringify(parsedData);
        const jsonObject = JSON.parse(jsonString);
        const updateSkuEntrySKU = jsonObject.sku;
        const updateSkuEntryTitle = jsonObject.title;
        const updateSkuEntryEntry = jsonObject.skuEntry;
        connection.query(`UPDATE ${updateSkuEntrySKU} SET entry = "${updateSkuEntryEntry}" WHERE title = "${updateSkuEntryTitle}"`, (err, results) =>{
            if (err) {console.log(err); return;}
            else {console.log(`${updateSkuEntryTitle} updated in ${updateSkuEntrySKU} to ${updateSkuEntryEntry}!`);}
        })
        response.end();
        });
    break;

    //Server response: Delete a SKU entry
    case '/deleteData':
        let deleteSkuEntrybody = '';
        request.on('data', chunk =>{ 
        deleteSkuEntrybody += chunk.toString();
        });
        request.on('end', ()=>{
        const parsedData = querystring.parse(deleteSkuEntrybody); 
        response.writeHead(200, {  
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin' : '*'});
        const jsonString = JSON.stringify(parsedData);
        const jsonObject = JSON.parse(jsonString);
        const deleteSkuEntrySKU = jsonObject.sku;
        const deleteSkuEntryTitle = jsonObject.title;
        connection.query(`DELETE FROM ${deleteSkuEntrySKU} WHERE title = "${deleteSkuEntryTitle}"`, (err, results) =>{
            if (err) {console.log(err); return;}
            else {console.log(`${deleteSkuEntryTitle} deleted from ${deleteSkuEntrySKU}!`);}
        })
        response.end();
        });
    break;

    //Server response: Show all SKUs
    case '/databasePull':
        connection.query('SHOW TABLES;', (err,results) =>{ 
        if (err){ 
            response.writeHead(200, {
            'Content-Type': 'text/html',
            'Access-Control-Allow-Origin' : '*'});
            response.end('error fetching data');
            return;
        }
        else{
            response.writeHead(200, { 
            'Content-Type': 'text/html',
            'Access-Control-Allow-Origin' : '*'});
            jsonString = JSON.stringify(results);
            jsonObject = JSON.parse(jsonString);
            response.write(readTables(jsonObject));
            response.end();
            }
        });
    break;
}

//Server response: Serves confirmation page after form submission
//Placed outside switch statement becasue using a different variable 
 if (parsedUrl.pathname == "/confirmation"){
response.writeHead(200, {
'Content-Type': 'text/html',
'Access-Control-Allow-Origin' : '*'});//enables CORS
fs.readFile('confirmation.html', function(err,content){
if(err){
console.log(err);
response.end;
}
else{
response.end(content);
}
})
}

//Server respone: Serves the database.html page, which shows entire database
else if (parsedUrl.pathname == "/database"){
    response.writeHead(200, {
    'Content-Type': 'text/html',
    'Access-Control-Allow-Origin' : '*'});//enables CORS
    fs.readFile('database.html', function(err,content){
    if(err){
    console.log(err);
    response.end;
    }
    else{
    response.end(content);
    }
    })
}

//Server respone: Serves the skuDetails.html page, which shows single SKU page
else if (parsedUrl.pathname == "/skuDetails"){
    response.writeHead(200, {
    'Content-Type': 'text/html',
    'Access-Control-Allow-Origin' : '*'});//enables CORS
    fs.readFile('skuDetails.html', function(err,content){
    if(err){
    console.log(err);
    response.end;
    }
    else{
    response.end(content);
    }
    })
}


//function :
//grab data from each row in database
function readRows(arr){
    let max = arr.length -1;
    let results = ' ';
    while (max > -1){
    results += `<li>${arr[max].Title}: ${arr[max].Entry}</li> `
    max--;
    }
    return results;
}
//read each table 
function readTables(arr){
    let max = arr.length -1;
    let results = ' ';
    while (max > -1){
    results += `${arr[max].Tables_in_sql5768538}, `;
    //add link event listener -> goes to path that opens the table
    
    max--;
    }
    return results;
}






if (url == "/home") { //home (GET)
response.writeHead(200, {
'Content-Type': 'text/html',
'Access-Control-Allow-Origin' : '*'});//enables CORS
response.write("<h3>Hello From the Backend!<h3>")
response.end();
}
//ROUTE: /text (responds with text)
else if (url == "/text") {
response.writeHead(200, {
'Content-Type': 'text/html',
'Access-Control-Allow-Origin' : '*'});//enables CORS
response.write("Manual string entered on the backend.")
response.end();
}





//--------------------------------------------------------
//DISPLAYS ALL SKUS
//GET
//ROUTE: /databasePull (responds with database query (SELECT))
//SQL QUERIES RETURN AN ARRAY, NOT A JSON OBJECT!!! must use array [0] and then the json notation -> .text
else if (url == "/databasePull"){
    connection.query('SHOW TABLES;', (err,results) =>{ //First create SQL query
    if (err){ //handle error
    response.writeHead(200, {
    'Content-Type': 'text/html',
    'Access-Control-Allow-Origin' : '*'});//enables CORS
    response.end('error fetching data');
    return;
    }
    //headers already sent from /database 
    // response.writeHead(200, { //Then respond with SQL query results 
    // 'Content-Type': 'text/html',
    // 'Access-Control-Allow-Origin' : '*'});//enables CORS
    jsonString = JSON.stringify(results);
    jsonObject = JSON.parse(jsonString);
    console.log(jsonObject.length);

    fname = jsonObject[0].idTest;
    lname = jsonObject[0].text;
    response.write(readTables(jsonObject));
    response.write('<br><a href="/thehomepagebecausethisisnotfound">Home Page</a><br>')
    response.end();
    });
    } 





//------------------------------------------------------------------
//OPEN INDIVIDUAL SKU TABLE
//catching the table PATH to open each indivual table:
//GET request
else if (parsedUrl.pathname == "/table"){
    console.log("table path entered");
    let body = " ";
    request.on('data', chunk => {body += chunk.toString()})//determines what happens on request (when the path/link is clicked), if you don't put anything here, it will just load endlessly becasuse it dosn't know what to do on the request - i think this is becasue your using the path name /table, but then you have more data to it as well that needs to be handled
    request.on('end', ()=>{
        // const parsedData = querystring.parse(body); //parsing the end of the url - * The querystring. parse() method parses a URL query string ( str ) into a collection of key and value pairs * , aka JSON string
        const searchParams = new URLSearchParams(parsedUrl.search);
        console.log(parsedUrl.search);
        console.log(searchParams);
        console.log(searchParams.get('name'));
        response.writeHead(200, {  
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin' : '*'});//enables CORS
        
        //grabbing first and last name from the parsed url
        // const jsonString = JSON.stringify(parsedData);
        // const jsonObject = JSON.parse(jsonString);
        
        const tableName = searchParams.get('name');
        
        //find table in database 
        console.log(`SELECT * FROM ${tableName}`);
        connection.query(`SELECT * FROM ${tableName}`, (err, results) =>{
        if (err) {console.log("error inserting data into database "+ err); return;}
        else {
        console.log("Table request Successful!");
        jsonString = JSON.stringify(results)
        jsonObject = JSON.parse(jsonString)
        //returns the entire HTML page
        //here, the readRows function filters through the jsonObject parameters and ADDS <li></li> HTML to each section!
        //From there, the function is used directly in the HTML code to manipulate it properly on the HTML page to be returned!
        //WARNING - The variables created outsided the manually written HTML cannot be accessed in the SCRIPT of the manually written HTML, but can be accessed in the BODY of the manually written HTML!
        response.end(`    

<!DOCTYPE html>
<html>
<head>
<title>Display Array</title>
</head>
<body>
  <h1>${tableName}</h1>
  <ul id="myList2"></ul>
  ${readRows(jsonObject)} 


  <script>

  const myArray =     ["apple", "banana", "cherry", "date"]


  const listElement = document.getElementById("myList");
  let listItems = "";

  for (let i = 0; i < myArray.length; i++) {
    listItems += "<li>" + myArray[i] + "</li>";
  }

  listElement.innerHTML = listItems;
  </script>
</body>
</html>

        `);
        }
        })
        })

}


//------------------------------------------------------------------
//DELETE SKU
//catching the table PATH to open each indivual table:
//GET request
else if (parsedUrl.pathname == "/skuDelete"){
    console.log("sku delete path");
    let body = "";
    request.on('data', chunk => {body += chunk.toString()})//determines what happens on request (when the path/link is clicked), if you don't put anything here, it will just load endlessly becasuse it dosn't know what to do on the request - i think this is becasue your using the path name /table, but then you have more data to it as well that needs to be handled
    request.on('end', ()=>{
        // const parsedData = querystring.parse(body); //parsing the end of the url - * The querystring. parse() method parses a URL query string ( str ) into a collection of key and value pairs * , aka JSON string
        console.log(body);//chunk is the DATA sent IN the form URL
        console.log(JSON.stringify(querystring.parse(body)));//puts the data in key:value pair
        // console.log(parsedUrl);
        // console.log(parsedUrl.href);
        // const searchParams = new URLSearchParams(parsedUrl.search);
        // console.log(parsedUrl.search);
        // console.log(searchParams);
        // console.log(searchParams.get('SKU'));
        response.writeHead(200, {  
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin' : '*'});//enables CORS
        //grabbing first and last name from the parsed url
        // const jsonString = JSON.stringify(parsedData);
        // const jsonObject = JSON.parse(jsonString);
        const pData = querystring.parse(body);
        const jString = JSON.stringify(pData);
        const jObject = JSON.parse(jString);
        console.log(jObject);
        console.log(jObject.SKU);
        const tableName = jObject.SKU;
        
        //find table in database 
        console.log(`DROP TABLE ${tableName}`);
        connection.query(`DROP TABLE ${tableName}`, (err, results) =>{
        if (err) {console.log("error inserting data into database "+ err); return;}
        else {
        console.log("Table request Successful!");
        jsonString = JSON.stringify(results)
        jsonObject = JSON.parse(jsonString)
        response.end("Table Name: " + tableName + readRows(jsonObject));
        }
        })
        })

}





//------------------------------------------------------------------
//CHANGE ALREADY EXISTING SKU ENTRY
//catching the table PATH to open each indivual table:
//GET request
else if (parsedUrl.pathname == "/skuUpdateEntry"){
    console.log("sku update entry path");
    let body = "";
    request.on('data', chunk => {body += chunk.toString()})//determines what happens on request (when the path/link is clicked), if you don't put anything here, it will just load endlessly becasuse it dosn't know what to do on the request - i think this is becasue your using the path name /table, but then you have more data to it as well that needs to be handled
    request.on('end', ()=>{
        // const parsedData = querystring.parse(body); //parsing the end of the url - * The querystring. parse() method parses a URL query string ( str ) into a collection of key and value pairs * , aka JSON string
        console.log(body);//chunk is the DATA sent IN the form URL
        console.log(JSON.stringify(querystring.parse(body)));//puts the data in key:value pair
        // console.log(parsedUrl);
        // console.log(parsedUrl.href);
        // const searchParams = new URLSearchParams(parsedUrl.search);
        // console.log(parsedUrl.search);
        // console.log(searchParams);
        // console.log(searchParams.get('SKU'));
        response.writeHead(200, {  
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin' : '*'});//enables CORS
        //grabbing first and last name from the parsed url
        // const jsonString = JSON.stringify(parsedData);
        // const jsonObject = JSON.parse(jsonString);
        const pData = querystring.parse(body);
        console.log(pData);
        const jString = JSON.stringify(pData);
        console.log(jString);
        console.log(jString.sku, jString.title,jString.entry)
        const jObject = JSON.parse(jString);
        console.log(jObject);
        console.log("SKU: " + jObject.sku + " title: " + jObject.title + " updated to: " + jObject.entry);
        
        //update table here -->
        console.log(`UPDATE ${jObject.sku} SET text = ${jObject.entry} WHERE idTest = "${jObject.title}"`)
        connection.query(`UPDATE ${jObject.sku} SET text = "${jObject.entry}" WHERE idTest = "${jObject.title}"`, (err, results) =>{
        if (err) {console.log("error updating entry in SKU "+ err); return;}
        else {
        console.log("SKU entry update successful!");
        }
        })
        })

}



//------------------------------------------------------------------
//CHANGE ALREADY EXISTING SKU NAME
//catching the table PATH to open each indivual table:
//GET request
else if (parsedUrl.pathname == "/skuChangeName"){
    console.log("sku change name path");
    let body = "";
    request.on('data', chunk => {body += chunk.toString()})//determines what happens on request (when the path/link is clicked), if you don't put anything here, it will just load endlessly becasuse it dosn't know what to do on the request - i think this is becasue your using the path name /table, but then you have more data to it as well that needs to be handled
    request.on('end', ()=>{
        // const parsedData = querystring.parse(body); //parsing the end of the url - * The querystring. parse() method parses a URL query string ( str ) into a collection of key and value pairs * , aka JSON string
        console.log(body);//chunk is the DATA sent IN the form URL
        console.log(JSON.stringify(querystring.parse(body)));//puts the data in key:value pair
        // console.log(parsedUrl);
        // console.log(parsedUrl.href);
        // const searchParams = new URLSearchParams(parsedUrl.search);
        // console.log(parsedUrl.search);
        // console.log(searchParams);
        // console.log(searchParams.get('SKU'));
        response.writeHead(200, {  
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin' : '*'});//enables CORS
        //grabbing first and last name from the parsed url
        // const jsonString = JSON.stringify(parsedData);
        // const jsonObject = JSON.parse(jsonString);
        const pData = querystring.parse(body);
        const jString = JSON.stringify(pData);
        const jObject = JSON.parse(jString);
        
        //find table in database 
        console.log(`RENAME TABLE ${jObject.SKU} to ${jObject.newSKU}`);
        connection.query(`RENAME TABLE ${jObject.SKU} to ${jObject.newSKU}`, (err, results) =>{
        if (err) {console.log("error inserting data into database "+ err); return;}
        else {
        console.log("SKU Rename Successful!");
        }
        })
        })

}








//ROUTE: /input (respondes with databse query (INSERT))
//clean this code!
else if (parsedUrl.pathname == "/input"){  //The path created on the form -> action attribute + the information you submitted (which is why yo uhave to parse it)
//use request.on to handle received data

//the body remains empty!! so your not pulling data, your pulling just the href!! this needs to be fixed!!
let body = '';
request.on('data',chunk => {body += chunk.toString();});
request.on('end',()=>{
//const x = querystring(body);  
//inserting the data into the database 
console.log("Parsed: " + body);  
const sql = 'INSERT INTO test (idtest, text) values(?,?)'
//here, your putting in the entire href (end of url)
connection.query(sql,["4", parsedUrl.href], (err, results) =>{
if (err) {console.log("error inserting data into database"); return;}
console.log("Data entered successfully into database!");
console.log("Data entered: " + parsedUrl.href);
//parse form data here to start
}) 
response.writeHead(200, {
'Content-Type': 'text/html',
'Access-Control-Allow-Origin' : '*'});//enables CORS
response.end("data received: " + parsedUrl.href)
});
} 




//POST
//retreiving form data the right way!!
else if (request.method === 'POST' && request.url === '/'){
console.log('create path found');
let body = '';
request.on('data', chunk =>{ //chunk is the end of the url
body += chunk.toString();
});
request.on('end', ()=>{
const parsedData = querystring.parse(body); //parsing the end of the url - * The querystring. parse() method parses a URL query string ( str ) into a collection of key and value pairs * , aka JSON string
response.writeHead(200, {  
'Content-Type': 'text/html',
'Access-Control-Allow-Origin' : '*'});//enables CORS

//grabbing first and last name from the parsed url
const jsonString = JSON.stringify(parsedData);
const jsonObject = JSON.parse(jsonString);
console.log(jsonObject);
const fname = jsonObject.fname;
const lname = jsonObject.lname;


//inserting first and last name into databse 
const sql = 'INSERT INTO test (idtest, text) values(?,?)'
connection.query(sql,[fname, lname], (err, results) =>{
if (err) {console.log("error inserting data into database "+ err); return;}
else {
console.log("Database entry successful: " + fname + ' ' + lname);}
})
response.end(`Received data: ${JSON.stringify(parsedData)}`);
})
}




//PUT
else if (request.method === 'PUT' && request.url === '/'){
console.log('update path found');
let body = '';
request.on('data', chunk =>{ //chunk is the end of the url
body += chunk.toString();
});
request.on('end', ()=>{
const parsedData = querystring.parse(body); //parsing the end of the url - * The querystring. parse() method parses a URL query string ( str ) into a collection of key and value pairs * , aka JSON string
response.writeHead(200, {  
'Content-Type': 'text/html',
'Access-Control-Allow-Origin' : '*'});//enables CORS

//grabbing first and last name from the parsed url
const jsonString = JSON.stringify(parsedData);
const jsonObject = JSON.parse(jsonString);

const fname = jsonObject.fname;
const lname = jsonObject.lname;


//inserting first and last name into databse 
const sql = 'UPDATE test SET text = ? WHERE idtest = ?;'
connection.query(sql,[lname, fname], (err, results) =>{
if (err) {console.log("error inserting data into database "+ err); return;}
else {
console.log("Database update successful: " + fname + ' ' + lname);}
})
response.end(`Received data: ${JSON.stringify(parsedData)}`);
})
}


//DELETE
else if (request.method === 'DELETE' && request.url === '/'){
console.log('delete path found');
let body = '';
request.on('data', chunk =>{ //chunk is the end of the url
body += chunk.toString();
});
request.on('end', ()=>{
const parsedData = querystring.parse(body); //parsing the end of the url - * The querystring. parse() method parses a URL query string ( str ) into a collection of key and value pairs * , aka JSON string
response.writeHead(200, {  
'Content-Type': 'text/html',
'Access-Control-Allow-Origin' : '*'});//enables CORS

//grabbing first and last name from the parsed url
const jsonString = JSON.stringify(parsedData);
const jsonObject = JSON.parse(jsonString);

const fname = jsonObject.fname;

//inserting first and last name into databse 
const sql = 'DELETE FROM test WHERE idtest = ?;'
connection.query(sql,[fname], (err, results) =>{
if (err) {console.log("error inserting data into database "+ err); return;}
else {
console.log("Database delete successful: " + fname + " deleted");}
})
response.end(`Received data: ${JSON.stringify(parsedData)}`);
})
}




//if no route is found - returning your index.html homepage from server!!!
else 
{
// response.writeHead(200, {
// 'Content-Type': 'text/html',
// 'Access-Control-Allow-Origin' : '*'});//enables CORS
// fs.createReadStream('index.html').pipe(response);
fs.readFile('index.html', function(err, content){
if (err){console.log("error occurred trying to send html file"); response.end}
else {
response.end(content);
}
})
// response.end('Not one of your designated endpoints! But we are connected!');
}
}
);

//creating database connection
const connection = mysql.createConnection({
host:'sql5.freesqldatabase.com',
user: 'sql5768538',
password: '9np9VjdEks',
database: 'sql5768538'
});

//connecting database
connection.connect(function(err)
{
if (err){console.log("error occurred while attempting connection: ", err)}
else {console.log("database connection successful!")}
}
);

function insertData(){
//inserting data into database
var data = "INSERT INTO test (idtest, text) VALUES ('1', 'This is sample text!')";
connection.query(data, function(err){
if (err) {console.log("error entering data into the database...");}
console.log("Data entry successful!");
});

//inserting more data into database

var data2 = "INSERT INTO test (idtest, text) VALUES ('2', 'sample text!')";
connection.query(data2, function(err){
if (err) {console.log("error entering data into the database...");}
console.log("Data entry successful!");
});
}

//pulling data from backend 
function pullData(){
var x = "";
var y = "original value";
var z = "";
connection.connect(function(err){
if(err){console.log("error occurred whilte attempting connection: ", err)}
else {console.log("database conncection successful")}
})
var data = "SELECT text FROM test where idtest = 1";

y =  connection.query(data, (err,results)=>{
if (err){return "there was an erro!";}
console.log("raw sql pull: " + results);
x = JSON.stringify(results);
console.log("raw pull stringify: " + x); //prints out correctly
y = JSON.parse(x);
console.log("raw pull stringify parsed: " + y);
console.log(y instanceof Object);
})
console.log("after the function: " + JSON.stringify(y)); //prints out incorrectly 
//x = JSON.stringify(y);
//z = JSON.parse(x);
return y;
}
//pullData();


//pull data from database and return an array:
var theData = "";
function returnData(){ //the problems is it's returning the QUERY itself and not the RESULTS! we need to extract the RESULTS and then stringy it in the response . write on the api 
var data = "SELECT text FROM test where idtest = 1";
var dataArray = "original value";
(connection.query(data, (err,results)=>{
if (err){return "there was an erro!";}
dataArray = results.map(row => Object.values(row));
theData = results;
return results;
}
))
}


console.log("new function" + JSON.stringify(returnData()));

//connecting server
server.listen(5001, console.log("server is listening on 5001"));



var wo = 5
function gg (){
wo =7;
}
gg();
console.log(wo);

console.log(JSON.stringify(returnData()));