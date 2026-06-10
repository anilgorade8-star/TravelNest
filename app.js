require('dotenv').config();
const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const methodOverride = require('method-override');
const ejsmate=require('ejs-mate');
const port = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/wanderlust';

// DataBase
main().then((result)=>{
  console.log(result)
}).catch((err)=>{
   console.log(err)
})
async function main() {
    await mongoose.connect(MONGO_URL);
    console.log("Connection Done");
}

app.set('view engine',"ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))
app.engine('ejs',ejsmate)


// app.get("/test", async (req, res) => {
//   try {
//     const sampleListing = new Listing({
//       title: "my house",
//       description: "Near Goa",
//       price: 1200,
//       location: "Goa",
//       country: "India"
//     });

//     await sampleListing.save();
//     console.log("sample is saved");
//     res.send("Successful");
//   } catch (err) {
//     console.error("Save failed:", err);
//     res.status(500).send("Save failed");
//   }
// });

app.get("/",(req,res)=>{
  res.send("Hi working Root")
});

// Index Route 
app.get("/listing", async(req,res)=>{
  let data =await Listing.find({})
    res.render("index.ejs",{list:data})
});

// Create Route
app.get("/listing/new", (req,res)=>{
     res.render("create.ejs");
});

app.post("/listing", async(req,res)=>{
   const new_listing=new Listing (req.body.listing);
   await new_listing.save();
   res.redirect("/listing");
});

// Show Route
app.get("/listing/:id", async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("show.ejs", { listing });
});

// Edit Route
app.get("/listing/:id/edit", async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("edit.ejs", { listing });
});
// Update Route
app.put("/listing/:id", async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, req.body.listing);
    res.redirect("/listing");
});


// delete Route
app.delete("/listing/:id", async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findByIdAndDelete(id);
    res.redirect("/listing");
});







app.listen(port, () => {
      console.log("Port listen On", port);
});

