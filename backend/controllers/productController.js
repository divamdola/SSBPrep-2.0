const Product = require("../models/product");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");

//Create new product  => /api/v1/admin/product/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

//Get all products => /api/v1/products?category=cds
// exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  // const resPerPage = 4;
  // const productsCount = await Product.countDocuments();

  // const apiFeatures = new APIFeatures(Product.find(), req.query)
  //   .search()
  //   .filter()
    // .pagination(resPerPage);
//   const products = await apiFeatures.query;

//   res.status(200).json({
//     success: true,
//     count: products.length,
//     productsCount,
//     products,
//   });
// });

exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  try {
    const products = await Product.find();

    if (!products.length) {
      return res.status(404).json({ success: false, message: "No books found" });
    }

    // Group books by category
    const booksByCategory = products.reduce((acc, book) => {
      if (!acc[book.category]) {
        acc[book.category] = [];
      }
      acc[book.category].push(book);
      return acc;
    }, {});

    res.status(200).json({
      success: true,
      count: products.length,
      booksByCategory,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


//Get single product detail => /api/v1/product/:category
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 400));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

//Update product  => /api/v1/admin/product/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 400));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//Delete Product => /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 400));
  }

  await product.deleteOne(); // Updated method
  res.status(200).json({
    success: true,
    message: "Product is deleted",
  });
});
