package handler

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/session"
)

type LoginHandler struct {
	store *session.Store
}

func NewLoginHandler() *LoginHandler {
	// Initialize the session store
	store := session.New()
	return &LoginHandler{store: store}
}

func (h *LoginHandler) Login(c *fiber.Ctx) error {
	username := c.FormValue("username")
	password := c.FormValue("password")

	// Validate username and password (e.g., from a database)
	if username != "admin" || password != "password" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid credentials"})
	}

	// Create a session
	sess, err := h.store.Get(c)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to create session"})
	}

	sess.Set("authenticated", true)
	sess.Set("username", username)

	if err := sess.Save(); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to save session"})
	}

	return c.JSON(fiber.Map{"message": "Login successful"})
}

func (h *LoginHandler) Logout(c *fiber.Ctx) error {
	sess, err := h.store.Get(c)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to get session"})
	}

	// Destroy the session
	if err := sess.Destroy(); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to destroy session"})
	}

	return c.JSON(fiber.Map{"message": "Logout successful"})
}
