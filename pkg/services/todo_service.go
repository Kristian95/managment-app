package service

import (
	"todo-app/pkg/models"
	"todo-app/pkg/repositories"
)

type TodoService struct {
	repo repository.TodoRepository
}

// NewTodoService creates a new instance of TodoService
func NewTodoService(repo repository.TodoRepository) *TodoService {
	return &TodoService{
		repo: repo,
	}
}

// GetAllTodos retrieves all todos
func (s *TodoService) GetAllTodos() ([]model.Todo, error) {
	return s.repo.GetAllTodos()
}

// CreateTodo creates a new todo
func (s *TodoService) CreateTodo(todo *model.Todo) (*model.Todo, error) {
    return s.repo.CreateTodo(todo)
}

// DeleteTodo deletes a todo by its ID
func (s *TodoService) DeleteTodo(id int) error {
	return s.repo.DeleteTodo(id)
}

// ToggleTodoComplete complete toto
func (s *TodoService) ToggleTodoComplete(id int) (*model.Todo, error) {
    return s.repo.ToggleTodoComplete(id)
}