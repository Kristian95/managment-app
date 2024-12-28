package main

import ("log"
		"github.com/gofiber/fiber/v2"
		"todo-app/pkg/handlers"
		"todo-app/pkg/services"
		"todo-app/pkg/repositories"
		"github.com/gofiber/fiber/v2/middleware/cors"
	)

func main() {
	app := fiber.New()

	// Enable CORS for all origins
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",  // Allow all origins
		AllowMethods: "GET,POST,PUT,DELETE, PATCH", // Allow only certain methods
	}))

	repo := repository.NewInMemoryRepository() // Using in-memory DB for simplicity
	svc := service.NewTodoService(repo)
	h := handler.NewTodoHandler(svc)

	app.Get("/todos", h.GetTodos)
	app.Post("/todos", h.CreateTodo)
	app.Delete("/todos/:id", h.DeleteTodo)
	app.Patch("/todo/:id/complete", h.ToggleTodoComplete)

	log.Fatal(app.Listen(":4000"))
}