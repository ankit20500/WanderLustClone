const mongoose = require("mongoose");
const schema = mongoose.Schema;

const listingschema = new schema({
    title: String,
    description: String,
    // image: {
       
    //     default: "https://th.bing.com/th/id/OIP.UIR3lidUIzUaPEOOxG823gHaEz?rs=1&pid=ImgDetMain",
    //     set: (v) =>
    //         v === "" ? "https://th.bing.com/th/id/OIP.UIR3lidUIzUaPEOOxG823gHaEz?rs=1&pid=ImgDetMain" : v,
    // },
    image:{
        filename: String,
        url: String,
    },
    price: Number,
    location: String,
    country: String
});

const List = mongoose.model("List", listingschema); // Change the model name to "List"
module.exports = List;
