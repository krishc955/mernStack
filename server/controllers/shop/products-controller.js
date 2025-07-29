const Product = require("../../models/Product");

const getFilteredProducts = async (req, res) => {
  try {
    const { 
      category = [], 
      fabric = [], 
      brand = [], // Keep for backward compatibility
      stitchType = [],
      occasion = [],
      sortBy = "price-lowtohigh" 
    } = req.query;

    let filters = {};

    if (category.length) {
      filters.category = { $in: category.split(",") };
    }

    // Handle fabric filtering (both brand and fabric fields for compatibility)
    if (fabric.length) {
      filters.$or = [
        { brand: { $in: fabric.split(",") } },
        { fabric: { $in: fabric.split(",") } }
      ];
    } else if (brand.length) {
      // Fallback to brand field for backward compatibility
      filters.brand = { $in: brand.split(",") };
    }

    if (stitchType.length) {
      filters.stitchType = { $in: stitchType.split(",") };
    }

    if (occasion.length) {
      filters.occasion = { $in: occasion.split(",") };
    }

    let sort = {};

    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;

        break;
      case "price-hightolow":
        sort.price = -1;

        break;
      case "title-atoz":
        sort.title = 1;

        break;

      case "title-ztoa":
        sort.title = -1;

        break;

      default:
        sort.price = 1;
        break;
    }

    const products = await Product.find(filters).sort(sort);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

module.exports = { getFilteredProducts, getProductDetails };
