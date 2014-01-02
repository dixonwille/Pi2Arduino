// functions that will be executed when 
// typeoff handle[pathname] === a function in requestHandlers.
// the handle and function are discribed in index.js

var fs = require('fs'),
server = require('./server');

function sendInterface(response) {
  console.log("Request handler 'interface' was called.");
  response.writeHead(200, {"Content-Type": "text/html"});
  var html = fs.readFileSync(__dirname + "/pages/interface.html")
  response.end(html);
}

function sendThemes(response) {
 response.writeHead(200, {"Content-Type": "text/css"});
 var css = fs.readFileSync(__dirname + "/pages/themes.css");
 response.end(css);
};

function sendColor(response) {
 response.writeHead(200, {"Content-Type": "text/javascript"});
 var java = fs.readFileSync(__dirname + "/pages/colorpicker.js");
 response.end(java);
};

function twitter(respone) {

};

exports.sendThemes = sendThemes;
exports.sendColor = sendColor;
exports.sendInterface = sendInterface;
