import {
  allOrderService,
  createOrderService,
  getOrderByIdService,
} from "../service/orderService.js";

export const orderCreate = async (req, res) => {
  try {
    const order = await createOrderService(req.user.id, req.body);
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      total: 1,
      order,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const totalOrder = async (req, res) => {
  try {
    const orders = await allOrderService();
    res.status(200).json({
      success: true,
      message: "Total order fetched",
      total: orders.length,
      orders,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const {id} = req.params;
    const order = await getOrderByIdService(id);
    res.status(200).json({
      success: true,
      message: "Single Order Fetched successfully",
      total: 1,
      order,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
