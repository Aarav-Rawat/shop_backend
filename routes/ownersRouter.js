const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");

router.get("/", (req, res) => {
  res.send("working");
});

if (process.env.NODE_ENV === "development,") {
  router.post("/create", async function (req, res) {
    let owners = await ownerModel.find();
    if (owners.length > 0) {
      return res.status(504).send("Already Exist");
    }

    let{fullname,email,password} = req.body;

     await ownerModel.create({
        fullname,
        email,
        password,
    });

    res.status(201).send("owner created");
  });
}

router.get("/admin",(req,res)=>{
  const success = res.flash("success"); 
   res.render("createproducts",{success});
})

module.exports = router;
