const errorHandler = (err,req,res,next) =>{

    console.error(err.stack);

    res.status(err.statusCode || 500).json({
        message:err.message || "Internal server Error",
        error:process.env.NODE_ENV === 'production' ? {} : err
    })

}


module.exports = { errorHandler };