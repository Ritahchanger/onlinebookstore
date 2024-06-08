const express = require('express')

const Category = require('../models/BooksCategories.model')


const postCategories = async (req, res) => {
  try {
    const { bookTypes, books } = req.body;

    if (!bookTypes || !books) {
      return res.status(200).json({
        status: 400,
        success: false,
        message: 'bookTypes and books are required'
      });
    }

    const newCategory = new Category({ booksTypes: bookTypes, books });

    await newCategory.save();

    return res.status(200).json({
      status: 200,
      success: true,
      data: newCategory
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};


const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({})

    if (!categories)
      return res
        .status(404)
        .json({ status: 404, success: true, data: 'No authors found' })

    return res.status(200).json({
      successs: true,
      message: 'categories gotten successfully',
      data: categories
    })
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message })
  }
}


const deleteCategory = async (req,res)=>{

  try{

    const { id } = req.params;

    const deletedCategory = await Category.findByIdAndDelete(id);

    
    if(!deletedCategory){

      return res.status(200).json({
        status:404,
        success:false,
        message:'Categories not found'
      })

    }

    return res.status(200).json({
      status:200,
      success:true,
      message:"Category deleted successfully",
      data:deletedCategory
    })


  }catch(error){

    return res.status(500).json({
      success: false,
      error: error.message
    });

  }

}





const updateBookSales = async (req,res) =>{

  try{

    const { id } = req.params;

    const { sales } = req.body;

    const user = await Bo


  }catch(error){


  }


}


module.exports = { postCategories, getCategories,deleteCategory}
