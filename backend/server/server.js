const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDatabase = require("../database/database");


dotenv.config();

const app = express();

app.use(helmet());
app.use(express.json());


app.use(morgan("combined"));

const PORT = process.env.PORT || 8000;


// ROUTE IMPORTS

const AuthenticationRoute = require("../routes/AuthenticationRoute");
const PaymentsRoutes = require("../routes/PaymentsRoutes");


app.use('/api/auth',AuthenticationRoute);
app.use('/api/payment',PaymentsRoutes);




const connectServer = async () =>{

    await connectDatabase()

    app.listen(PORT,()=>{

        console.log(`The server is running on PORT ${PORT}`);
    
    })
    

}


connectServer()