const Blog  = require("../models/Blog.model")


function formatCurrentDate(){

    const now = new Date();

    const options = {
        day:"numeric",
        month:"short",
        year:"numeric"
    }

    return now.toLocaleDateString("en-US",options);

}

const postBlogs = async (req,res) =>{

    try{

       const {title,content} = req.body

       const filePath = req.file.filename

       const formattedDate = formatCurrentDate();

       const newBlog = await Blog.create({

            title:title,
            content:content,
            filePath:filePath,
            createdOn:formattedDate
        })

        return res.status(200).json({ status:200,success:true, data:newBlog })

    }catch(error){

        return res.status(500).json({ success: false, error: `${error.message}` })

    }

}

const getBlogs = async (req,res) =>{

    try{


        const blogs = await Blog.find({});

        if(!blogs) return res.status(200).json({ status:404, success: false, message:'There are no blogs in the system' })

        return res.status(200).json({status:200, success: true, data:blogs })


    }catch(error){

        return res.status(500).json({ success: false, error: `${error.message}` })

    }

}

const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;

        const findItemToDelete = await Blog.findById(id);

        if (!findItemToDelete) {
            return res.status(404).json({ success: false, message: 'No such blog with the provided Id' });
        }

        await Blog.findByIdAndDelete(id);

        return res.status(200).json({ success: true, message: 'Blog deleted successfully' });
    } catch (error) {
       
        return res.status(500).json({ success: false, error: error.message });
    }
}

const editBlog = async (req,res) =>{

    try{


    }catch(error){

        return res.status(500).json({ success: false, error: `${error.message}` })

    }

}




module.exports = { editBlog,getBlogs,postBlogs,deleteBlog }