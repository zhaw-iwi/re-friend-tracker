import {FriendDatabase} from "./database/friend-database";
import {LocationDatabase} from "./database/location-database";
import {ActivityDatabase} from "./database/activity-database";
import {AbstractDatabase} from "./database/abstract-database";
import {TestData} from "./test-data";
import {FriendRestService} from "./rest/friend-rest-service";
import {ActivityRestService} from "./rest/activity-rest-service";
import {LocationRestService} from "./rest/location-rest-service";
import {GroupDatabase} from "./database/group-database";
import {GroupRestService} from "./rest/group-rest-service";
import express = require("express");

const bodyParser = require("body-parser");
const path = require('path');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// set the port of our application
// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 8080;

process.on("unhandledRejection", (reason, p) => {
    console.log("Unhandled Rejection at:", p, "reason:", reason);
});

// serve Frontend
app.use("/", [express.static(__dirname + "./../../app")]);
app.use("/path", [express.static(path.join(__dirname,"./../../node_modules/path-framework"))]);

// setup CORS
app.all("/*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Request-Method", "*");
    res.header("Access-Control-Allow-Headers", req.header["Access-Control-Request-Headers"]);
    res.header("Access-Control-Expose-Headers", "Authorization");
    res.type("application/json");
    next();
});

app.options("/*", function (req, res, next) {
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With");
    res.sendStatus(200);
});

// disable Caching
app.get("/*", function (req, res, next) {
    res.header("cache-control", "no-cache, no-store, must-revalidate"); // HTTP 1.1
    res.header("pragma", "no-cache"); // HTTP 1.0
    res.header("expires", "0"); // HTTP 1.0 proxies
    next();
});

// Path ping request
app.get("/services/ping", function (req, res) {
    res.json({status: "ok", userId: "demo", version: "0.8.0"});
});

// Path example entities
AbstractDatabase.initDatabase();
const friendDatabase = new FriendDatabase();
const activityDatabase = new ActivityDatabase();
const locationDatabase = new LocationDatabase();
const groupDatabase = new GroupDatabase();
new FriendRestService(app, friendDatabase).init();
new LocationRestService(app, locationDatabase).init();
new GroupRestService(app, groupDatabase).init();
new ActivityRestService(app, activityDatabase).init();
TestData.init();

// set the home page route
app.get("/", function (req, res) {

    // ejs render automatically looks in the views folder
    res.render("../index.html");
});

app.listen(port, function () {
    console.log("Path example server running on http://localhost:" + port);
});
