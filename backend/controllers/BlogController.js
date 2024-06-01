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

const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({}).sort({ createdAt: -1 }); // Sort by createdAt field in descending order

        if (blogs.length === 0) {
            return res.status(404).json({ status: 404, success: false, message: 'There are no blogs in the system' });
        }

        return res.status(200).json({ status: 200, success: true, data: blogs });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};


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




const updateBlog = async (req, res) => {
    const { id } = req.params; 

    try {
     
        const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedBlog) {
            
            return res.status(404).json({ success: false, error: 'Blog post not found' });
        }

        
        return res.status(200).json({ success: true, data: updatedBlog });
    } catch (error) {
        
        return res.status(500).json({ success: false, error: error.message });
    }
};



const getBlogById = async (req,res) =>{

    try{

        const { id } = req.params

        const singleBlog = await Blog.findById(id)

        if(!singleBlog) {

            return res.status(200).json({status:404,success: false, error: 'Blog post not found' });
        }

        return res.status(200).json({ success: true, data: singleBlog });

    }catch(error){

        return res.status(500).json({ success: false, error: error.message });

    }

}



module.exports = { updateBlog };






module.exports = { getBlogs,postBlogs,deleteBlog,updateBlog,getBlogById }