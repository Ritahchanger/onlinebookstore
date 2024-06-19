const mongoose = require('mongoose');

const WithdrawalsSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    amount:{
        type:Number,
        default:0,
    },
    requestedTime:{
        type:Date,
        default:Date.now
    },
    paypalEmail:{
        type:String,
    },
    mpesaNumber:{
        type:String,
    }
})

const Withdrawal = mongoose.model('Withdrawal',WithdrawalsSchema);

module.exports = Withdrawal;
