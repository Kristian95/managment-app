package handler

import (
	"todo-app/pkg/services"
	"github.com/gofiber/fiber/v2"
	"todo-app/pkg/models"
	"strconv"
)

type TaskHandler struct {
	service *service.TaskService
}

func NewTaskHandler(service *service.TaskService) *TaskHandler {
	return &TaskHandler{
		service: service,
	}
}

func (h *TaskHandler) GetAllTasks(c *fiber.Ctx) error {
	tasks, err := h.service.GetAllTasks()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Could not fetch tasks"})
	}
	return c.Status(fiber.StatusOK).JSON(tasks)
}

func (h *TaskHandler) CreateTask(c *fiber.Ctx) error {
	task := new(model.Task)

	// Parse the request body into the task struct
	if err := c.BodyParser(task); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "cannot parse JSON",
		})
	}

	// Save to repository
	newTask, err := h.service.CreateTask(task)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "failed to create task",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(newTask)
}

func (h *TaskHandler) DeleteTask(c *fiber.Ctx) error {
	id := c.Params("id")
	// Convert the ID to an integer
	// You may want to handle the conversion error properly
	intID, err := strconv.Atoi(id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Invalid ID",
		})
	}

	err = h.service.DeleteTask(intID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "failed to delete task",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
        "message": "Task deleted successfully",
    })
}

func (h *TaskHandler) ToggleTaskComplete(c *fiber.Ctx) error {
	id := c.Params("id")

	intID, err := strconv.Atoi(id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Invalid ID",
		})
	}

	// Call service to toggle the completion status
	task, err := h.service.ToggleTaskComplete(intID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Error",
		})
	}

	return c.Status(fiber.StatusOK).JSON(task)
}

func (h *TaskHandler) UpdateTask(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid task ID"})
	}

	var task model.Task
	if err := c.BodyParser(&task); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request payload"})
	}

	task.ID = id // Ensure the task ID from the URL is set
	updatedTask, err := h.service.UpdateTask(&task)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(fiber.StatusOK).JSON(updatedTask)
}