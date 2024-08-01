const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const router = express.Router();

router.get("/",(req,res)=>{
    let err = req.flash("error");
    res.render("index",{err});
})

router.get("/shop",isLoggedIn, async (req,res)=>{
    let products = await productModel.find();
    res.render("shop",{products});
})

module.exports = router;