const express = require("express");
const router = express.Router();
const Task = require("../models/task");


/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: API for managing tasks
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     description: Retrieve a list of all tasks
 *     tags:
 *       - Tasks
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               - _id: "60abc123def4567890123456"
 *                 title: "Task 1"
 *                 description: "Description for Task 1"
 *                 completed: false
 *               - _id: "60abc456def7890123456789"
 *                 title: "Task 2"
 *                 description: "Description for Task 2"
 *                 completed: true
 *       500:
 *         description: Internal server error
 */
router.get("/tasks", async (request, response) => {
  try {
    const tasks = await Task.find();
    response.status(200).json(tasks);
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
});


/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     description: Create a new task with the provided data
 *     tags:
 *       - Tasks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInput'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               message: "Added successfully!"
 *               task:
 *                 _id: "60abc123def4567890123456"
 *                 title: "New Task"
 *                 description: "Description for the new task"
 *                 completed: false
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid data provided"
 */
router.post("/tasks", async (request, response) => {
  try {
    const task = new Task(request.body);
    await task.save();
    response.status(200).json({ message: "Added successfuly!", task });
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
});


/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task
 *     description: Update a task with the provided data
 *     tags:
 *       - Tasks
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the task to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInput'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               message: "Updated successfully!"
 *               task:
 *                 _id: "60abc123def4567890123456"
 *                 title: "Updated Task"
 *                 description: "Updated description"
 *                 completed: true
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid data provided"
 */
router.put("/tasks/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const dataToUpdate = request.body;
    const task = await Task.findByIdAndUpdate(id, dataToUpdate, { new: true });
    response.status(200).json({ message: "Updated Successfully!", task });
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
});


/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     description: Delete a task by its ID
 *     tags:
 *       - Tasks
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the task to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               message: "Deleted successfully!"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid ID provided"
 */
router.delete("/tasks/:id", async (request, response) => {
  try {
    const { id } = request.params;
    await Task.findByIdAndDelete(id);
    response.status(200).json({ message: "Deleted successfully!" });
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
});

module.exports = router;
