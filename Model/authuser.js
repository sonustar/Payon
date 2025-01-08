const mongoose = require("mongoose")

const authuserSchema = new mongoose.Schema({

    email : "string",
    password : "string"

})

const accountSchema = new mongoose.Schema({
    balance:{
        type:"Number",
        required:true
    },
    userId : {
        required : true,
        type : mongoose.Schema.Types.ObjectId,
        ref:"authuser"
    }
})

const authusermodel = mongoose.model("authuser",authuserSchema)
const Account = mongoose.model("Account",accountSchema)

module.exports = {
    authusermodel,
    Account
}