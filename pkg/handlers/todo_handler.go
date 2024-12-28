package handler

import (
	"todo-app/pkg/services"
	"github.com/gofiber/fiber/v2"
	"todo-app/pkg/models"
	"strconv"
)

// TodoHandler handles HTTP requests related to To-Do operations
type TodoHandler struct {
	service *service.TodoService
}

func NewTodoHandler(service *service.TodoService) *TodoHandler {
	return &TodoHandler{
		service: service,
	}
}

// GetTodos handles GET /todos
func (h *TodoHandler) GetTodos(c *fiber.Ctx) error {
	todos, err := h.service.GetAllTodos()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Could not fetch todos"})
	}
	return c.Status(fiber.StatusOK).JSON(todos)
}

func (h *TodoHandler) CreateTodo(c *fiber.Ctx) error {
	todo := new(model.Todo)

	// Parse the request body into the todo struct
	if err := c.BodyParser(todo); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "cannot parse JSON",
		})
	}

	// Save to repository
	newTodo, err := h.service.CreateTodo(todo)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "failed to create todo",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(newTodo)
}

// DeleteTodo handles DELETE /todos/:id
func (h *TodoHandler) DeleteTodo(c *fiber.Ctx) error {
	id := c.Params("id")
	// Convert the ID to an integer
	// You may want to handle the conversion error properly
	intID, err := strconv.Atoi(id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Invalid ID",
		})
	}

	err = h.service.DeleteTodo(intID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "failed to delete todo",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
        "message": "Todo deleted successfully",
    })
}