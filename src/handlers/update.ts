import prisma from "../db";

//get all updates
export const getUpdates = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      Update: true,
    },
  });
  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.Update];
  }, []);
  res.status(200).json({ data: updates });
};

// get one update
export const getOneUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      Update: true,
    },
  });
  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.Update];
  }, []);
  const match = updates.find((update) => update.id === req.params.id);
  res.status(200).json({ data: match });
};

//create update
export const createUpdate = async (req, res) => {
  const { productId, ...rest } = req.body;
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) {
    return res.status(400).json({ message: "Product does not exist" });
  }
  const update = await prisma.update.create({
    data: {
      ...rest,
      product: { connect: { id: product.id } },
    },
  });
  res.status(200).json({ data: update });
};

// update update
export const updateUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      Update: true,
    },
  });
  if (!products) {
    return res.status(400).json({ message: "Product does not exist" });
  }
  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.Update];
  }, []);
  const match = updates.find((update) => update.id === req.params.id);
  if (!match) {
    return res.status(400).json({ message: "Update does not exist" });
  }
  const updated = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });
  res.status(200).json({ data: updated });
};

//delete update

export const deleteUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.body.productId,
    },
    include: {
      Update: true,
    },
  });
  if (!products) {
    return res.status(400).json({ message: "Product does not exist" });
  }
  const match = products
    .reduce((allUpdates, product) => {
      return [...allUpdates, ...product.Update];
    }, [])
    .find((update) => update.id === req.params.id);
  if (!match) {
    return res.status(400).json({ message: "Update does not exist" });
  }
  const deleted = await prisma.update.delete({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({ data: deleted });
};
