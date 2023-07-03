import { Router } from "express";
import { body } from "express-validator";
import { handleInputError } from "./modules/middlewares";
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from "./handlers/product";
import {
  createUpdate,
  deleteUpdate,
  getOneUpdate,
  getUpdates,
  updateUpdate,
} from "./handlers/update";

const router = Router();
// Products
router.get("/product", getProducts);
router.get("/product/:id", getOneProduct);
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputError,
  updateProduct
);
router.post(
  "/product",
  body("name").notEmpty().trim().isString(),
  handleInputError,
  createProduct
);
router.delete("/product/:id", deleteProduct);
// Update
router.get("/update", getUpdates);
router.get("/update/:id", getOneUpdate);
router.put(
  "/update/:id",
  body("title").optional().trim(),
  body("body").optional().trim(),
  body("version").optional(),
  body("asset").optional().trim().isURL(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
  handleInputError,
  updateUpdate
);
router.post(
  "/update",
  body("title").trim().exists().isString(),
  body("body").trim().exists().isString(),
  body("asset").trim().isURL(),
  body("productId").trim().exists().isString(),
  createUpdate
);
router.delete("/update/:id", deleteUpdate);
// Points
router.get("/updatepoint", (req, res) => {});
router.get("/updatepoint/:id", (req, res) => {});
router.put(
  "/updatepoint/:id",
  body("name").optional().trim().isString(),
  body("description").optional().trim().isString(),
  (req, res) => {}
);
router.post(
  "/updatepoint",
  body("name").trim().isString(),
  body("description").trim().isString(),
  body("updateId").trim().exists().exists(),
  (req, res) => {}
);
router.delete("/updatepoint/:id", (req, res) => {});

router.use((err, req, res, next) => {
  console.log(err);
  return res
    .status(500)
    .json({ message: "Something went wrong in router handler" });
});
export default router;
