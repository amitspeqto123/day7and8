import { Category } from "../model/category.js";

// create category
export const createCategoryService = async (data) =>{
    const {name} = data;
    const existsCategory = await Category.findOne({name});
    if(existsCategory){
        throw new Error("Category all ready exists")
    }
    return await Category.create({
        name
    })
}
// get All Category
export const getAllCategoryService = async () =>{
    return await Category.find();
}