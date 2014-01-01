var server = require("./server");
var tcpserver = require("./tcpserver");
var router = require("./route");
var requestHandlers = require("./requestHandlers");

var debug = false;

var handle = {}
handle["/"] = requestHandlers.sendInterface;
handle["/interface"] = requestHandlers.sendInterface;
handle["/themes.css"] = requestHandlers.sendThemes;
handle["/colorpicker.js"] = requestHandlers.sendColor;

server.start(router.route,handle,debug);
tcpserver.start(debug);
