package repository

import (
	"todo-app/pkg/models"
	"sync"
	"sort"
)

type TodoRepository interface {
	GetAllTodos() ([]model.Todo, error)
	CreateTodo(todo *model.Todo) (*model.Todo, error)
	DeleteTodo(id int) error
}

// addDummyData is a helper function to add predefined To-Do items for testing
func (r *InMemoryRepository) addDummyData() {
	r.mu.Lock()
	defer r.mu.Unlock()
	r.todos[1] = model.Todo{ID: 1, Title: "Learn Go", Description: "Learn Go fast", Completed: true}
	r.todos[2] = model.Todo{ID: 2, Title: "Build a Go API", Description: "App buidling for begginers only", Completed: false}
	r.todos[3] = model.Todo{ID: 3, Title: "Learn Fiber Framework", Description: "Learn fiber for dummies", Completed: false}
	r.todos[4] = model.Todo{ID: 4, Title: "Complete To-Do App", Description: "", Completed: false}
}

// InMemoryRepository implements the TodoRepository interface using an in-memory map
type InMemoryRepository struct {
	todos map[int]model.Todo
	mu    sync.RWMutex
}

func NewInMemoryRepository() *InMemoryRepository {
	repo := &InMemoryRepository{
		todos: make(map[int]model.Todo),
	}
	// Add dummy data
	repo.addDummyData()
	return repo
}

// GetAllTodos returns all the todos
func (r *InMemoryRepository) GetAllTodos() ([]model.Todo, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	var result []model.Todo
	for _, todo := range r.todos {
		result = append(result, todo)
	}
	// Sort todos by ID
	sort.Slice(result, func(i, j int) bool {
		return result[i].ID < result[j].ID
	})
	return result, nil
}

// CreateTodo adds a new To-Do item
func (r *InMemoryRepository) CreateTodo(todo *model.Todo) (*model.Todo, error) {
	r.mu.Lock()
	defer r.mu.Unlock()
	todo.ID = len(r.todos) + 1
	r.todos[todo.ID] = *todo
	return todo, nil
}

// DeleteTodo deletes a To-Do by its ID
func (r *InMemoryRepository) DeleteTodo(id int) error {
	r.mu.Lock()
	defer r.mu.Unlock()
	delete(r.todos, id)
	return nil
}