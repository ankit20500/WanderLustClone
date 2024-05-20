const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride=require("method-override")
const ejsMate=require("ejs-mate");

const MONGO = "mongodb://127.0.0.1:27017/wanderlust";
main().then(() => { console.log("db is working") })
    .catch((err) => { console.log(err) });
async function main() {
    await mongoose.connect(MONGO);
}

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.send("start");
})
app.get("/listinglist", async (req, res) => {
    let sampletest = new Listing({
        title: "My new villa",
        discription: "most beautiful villa in this city",
        price: 10000,
        location: "Darbhange",
        country: "India"
    });
    await sampletest.save();
    console.log("save");
    res.send("viewing");
})
app.get("/listing", async (req, res) => {
    let all_list = await Listing.find({});
    res.render("index.ejs", { all_list });
})

app.get("/listing/new", (req, res) => {
    res.render("new_form.ejs");
})

app.post("/listing", async (req, res) => {
    const newlist = new Listing(req.body.listing);
    await newlist.save();
    res.redirect("/listing");
})

app.get("/listing/:id", async (req, res) => {
    let { id } = req.params;
    const lists = await Listing.findById(id);
    
    res.render("show.ejs", { lists });
})

app.get("/listing/edit/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("edit.ejs", { listing });
});

app.delete("/listing/:id",async(req,res)=>{
    let { id } = req.params;
    let del=await Listing.findByIdAndDelete(id);
    console.log(del);
    res.redirect("/listing");
})
app.put("/listing/edit/:id", async (req, res) => {
    let { id } = req.params;
    let newobj ={
        title: `${req.body.listing.title}`,
        description:`${req.body.listing.description}`,
                image: {
          filename: "listingimage",
          url:`${req.body.listing.image}`,
        },
        price:`${ req.body.listing.price}`,
        location:`${req.body.listing.location}`,
        country: `${req.body.listing.country}`,
    }
    await Listing.findByIdAndUpdate(id, newobj,{new:true});
    res.redirect(`/listing/${id}`);
})

app.listen(5050, () => {
    console.log("server is start");
})