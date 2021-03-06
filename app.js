const express = require("express");
const bodyparser = require("body-parser");
const https = require("https");
const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({
    extended: true
}));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html")
});
app.post("/", function (req, res) {
    const fname = req.body.firstname;
    const lname = req.body.lastname;
    const email = req.body.email;
    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: fname,
                LNAME: lname
            }
        }]

    };
    const jsondata = JSON.stringify(data);
//     const url = "https://us14.api.mailchimp.com/3.0/lists/"unique id";
    const options = {
        method: "POST",
//         auth: "mayank:{api key}"
    }
    const request = https.request(url, options, function (response) {

        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html")

        }
        else{
res.sendFile(__dirname+"/failure.html")
        }
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    });
    request.write(jsondata);
    request.end();
});
app.post("/failure",function(req,res){
    res.redirect("/");
})
app.listen(process.env.PORT || 3000, function () {
    console.log("server is running on port 3000")
});

//api key

// unique id
