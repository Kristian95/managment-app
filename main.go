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
	svc := service.NewTaskService(repo)
	h := handler.NewTaskHandler(svc)

	lh := handler.NewLoginHandler()

	// Login
	app.Post("/login", lh.Login)
	app.Post("/logout", lh.Logout)

	// Tasks
	app.Get("/tasks", h.GetAllTasks)
	app.Post("/tasks", h.CreateTask)
	app.Delete("/tasks/:id", h.DeleteTask)
	app.Patch("/task/:id/complete", h.ToggleTaskComplete)
	app.Put("/tasks/:id", h.UpdateTask)

	log.Fatal(app.Listen(":4000"))
}