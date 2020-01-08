const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const CONNECTION_URL = "mongodb+srv://deepak:punia@cluster0-1jmbx.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_NAME = "test";
import path from 'path'; 
 
var app = Express();
app.use(express.static(path.join(__dirname,'/build')));
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
var database, collection;
 
app.listen(5000, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("appdatas");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.sendFile(path.join(__dirname + '/build/index.html'));
    next();
  });

app.get("/api/articles/:name", async (req, response) => {
    const articleName = req.params.name;
    collection.findOne({ "Name": articleName }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.post('/api/articles/:name/upvote',(req, res) =>{
    const articleName = req.params.name;

    collection.findOne({ "Name": articleName }, (error, result) => {
        if(error) {
            return res.status(500).send(error);
        }
        collection.updateOne({Name: articleName},{
            '$set': {
                Upvotes: result.Upvotes + 1,
            },
        });
        collection.findOne({ "Name": articleName }, (error, result) => {
            return res.status(400).send(result);
        });
    });
    
});


app.post('/api/articles/:name/add-comment',(req, res) =>{
    const {Name, Text} =req.body;
    const articleName = req.params.name;

    collection.findOne({ "Name": articleName }, (error, result) => {
        if(error) {
            return res.status(500).send(error);
        }
        collection.updateOne({Name: articleName},{
            '$set': {
                Comments: result.Comments.concat({Name, Text}),
            },
        });   
        collection.findOne({ "Name": articleName }, (error, result2) => {
            return res.send(result2);
        });

    });
});
