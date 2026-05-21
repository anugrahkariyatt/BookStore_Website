import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send({ title: "Admin page" });
});

export default router;
