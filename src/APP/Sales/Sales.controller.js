const salesService = require("./Sales.service");

const getSaless = async (req, res, next) => {
  try {
    const saless = await salesService.getSaless();

    res.status(200).json({
      message: "success",
      data: saless,
    });
  } catch (error) {
    next(error);
  }
};

const addSales = async (req, res, next) => {
  try {
      
    if(!req.body)throw new Error("must write body ")
    const Sales = await salesService.addSales(
      req.body
    );

    res.status(201).json({
      message: "success",
      data: Sales,
    });
  } catch (error) {
    next(error);
  }
};
const getSalesByProduct = async (req, res, next) => {
  try {
    const productid = req.params.id;

    const sales =
      await salesService.getSalesByProduct(productid);

    res.status(200).json({
      message: "success",
      data: sales,
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getSaless,
  addSales,
  getSalesByProduct

};