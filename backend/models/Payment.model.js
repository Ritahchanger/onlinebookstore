const mongoose = require("mongoose");


const PaymentSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",required:true,
    },
    paymentMethod:{
        type:String,
        enum:[
            'mpesa',
            'paypal'
        ],
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    location:{
        type:{
            type:String,
            default:'Point'
        },
        coordinates:{
            type:[Number],
            required:true,
        },
    }

},{timestamps:true});

PaymentSchema.index({location:'2dsphere'});

const Payment = mongoose.model('Payment',PaymentSchema);

module.exports = { Payment }