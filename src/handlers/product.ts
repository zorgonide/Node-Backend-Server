import prisma from "../db";

//get all products
export const getProducts = async (req, res) => {
  const products = await prisma.user.findMany({
    where: {
      id: req.user.id,
    },
    include: {
      products: true,
    },
  });
  res.status(200).json({ data: products });
};

// get one product
export const getOneProduct = async (req, res) => {
  const id = req.params.id;
  const product = await prisma.product.findFirst({
    where: {
      id: id,
      belongsToId: req.user.id,
    },
  });

  res.status(200).json({ data: product });
};

//create product

export const createProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        belongsToId: req.user.id,
      },
    });
    res.status(200).json({ data: product });
  } catch (err) {
    next(err);
  }
};

//update product
export const updateProduct = async (req, res) => {
  const id = req.params.id;
  const product = await prisma.product.update({
    where: {
      id_belongsToId: {
        id: id,
        belongsToId: req.user.id,
      },
    },
    data: {
      name: req.body.name,
    },
  });
  res.status(200).json({ data: product });
};

//delete product
export const deleteProduct = async (req, res) => {
  const id = req.params.id;
  const product = await prisma.product.delete({
    where: {
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user.id,
      },
    },
  });
  res.status(204).json({ data: product });
};
