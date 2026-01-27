import {
  createProductService,
  deleteProductService,
  getAllProductService,
  getProductByIdService,
  updateProductService,
} from "../service/productService.js";

// create product
export const createProduct = async (req, res) => {
  try {
    const product = await createProductService(req.body);
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      total: 1,
      product
    });
  } catch (error) {
    console.log("Error in ceating product", error);
    if (error.message === "Product already exists") {
      res.status(409).json({
        success: false,
        message: "Product already exists",
      });
    }
  }
};
// get all product
export const getAllProuct = async (req, res) => {
  try {
    const products = await getAllProductService();
    res.status(200).json({
      success: true,
      message: "All Product fetched successfully",
      total: products.length,
      products
    });
  } catch (error) {
    console.log("Error in fetching product", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
// get product by id
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const singleProduct = await getProductByIdService(id);
    res.status(200).json({
      success: true,
      message: "Fetched single product successfully",
      totle: 1,
      singleProduct,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
// delete product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteProductService(id);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      totla: 1,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
// update product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const newUpdatedProduct = await updateProductService(id, req.body);
    res.status(200).json({
      success: true,
      message: "Product updated successfully..",
      total: 1,
      newUpdatedProduct
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
