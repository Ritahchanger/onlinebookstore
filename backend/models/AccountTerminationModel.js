const mongoose = require("mongoose");

function formatDate(date){

    const day = date.getDate()

    const month = date.getMonth() + 1

    const year = date.getFullYear()

    return `${day}-${month}-${year}`

}

const AccountTerminationSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    reason:{
        type:String,
    },
    createdOn:{
        type:String,
        default:() =>formatDate(new Date())
    }  
})

const AccountTermination = mongoose.model('AccountTermination',AccountTerminationSchema);

module.exports = AccountTermination