var mongoClient = require("mongodb").MongoClient;
var express = require("express");
var cors = require("cors");

var connectionString = "mongodb://127.0.0.1:27017";

var app = express();
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.get("/products", (req, res) => {
  mongoClient.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("shopper");
    database
      .collection("products")
      .find({})
      .toArray()
      .then((documents) => {
        res.send(documents);
      });
  });
});

app.get("/details/:id", (req, res) => {
  var id = parseInt(req.params.id);
  mongoClient.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("shopper");
    database
      .collection("products")
      .find({ ProductId: id })
      .toArray()
      .then((document) => {
        console.log("Record Inserted");
        res.redirect("/products");
        res.end();
      });
  });
});

app.post("/addproduct", (req, res) => {
  var product = {
    ProductId: parseInt(req.body.ProductId),
    Name: req.body.Name,
    Price: req.body.Price,
  };
  mongoClient.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("shopper");
    database
      .collection("products")
      .insertOne(product)
      .toArray()
      .then((document) => {
        res.send(document);
        res.redirect("/products");
        res.end();
      });
  });
});

app.put("/updateproduct", (req, res) => {
  var findquery = { ProductId: parseInt(req.params.ProductId) };
  var updatequery = {
    $set: { Name: req.body.Name, Price: parseFloat(req.body.Price) },
  };

  mongoClient.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("shopper");
    database
      .collection("products")
      .updateOne(findquery, updatequery)
      .toArray()
      .then((result) => {
        console.log("Record Updated");
        res.end();
      });
  });
});

app.delete("/deleteproduct/:id", (req, res) => {
  var id = parseInt(req.params.id);
  mongoClient.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("shopper");
    database
      .collection("products")
      .deleteOne({ ProductId: id })
      .then((result) => {
        console.log("Record Deleted");
        res.redirect("/products");
        res.end();
      });
  });
});

app.listen(8000);
console.log(`Server Started :http://127.0.0.1:8000`);
