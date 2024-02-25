import express from "express";
import {
  createTask,
  deleteTask,
  getAllTask,
  singleTaskController,
  updateTask,
} from "../controller/taskContoller.js";
import { requireSignIn } from "../middleware/authMiddleware.js";

const router = express();

router.post("/create-task", requireSignIn, createTask);
router.put("/update-task/:id", requireSignIn, updateTask);
router.get("/single-task/:id", singleTaskController);
router.delete("/delete-task/:id", requireSignIn, deleteTask);
router.get("/get-task", getAllTask);

export default router;
