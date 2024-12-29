package repository

import (
	"todo-app/pkg/models"
	"sync"
	"sort"
	"fmt"
)

type TaskRepository interface {
	GetAllTasks() ([]model.Task, error)
	CreateTask(task *model.Task) (*model.Task, error)
	DeleteTask(id int) error
	ToggleTaskComplete(id int) (*model.Task, error)
}

func (r *InMemoryRepository) addDummyData() {
	r.mu.Lock()
	defer r.mu.Unlock()
	r.tasks[1] = model.Task{ID: 1, Title: "Learn Go", Description: "Learn Go fast", Completed: true}
	r.tasks[2] = model.Task{ID: 2, Title: "Build a Go API", Description: "App buidling for begginers only", Completed: false}
	r.tasks[3] = model.Task{ID: 3, Title: "Learn Fiber Framework", Description: "Learn fiber for dummies", Completed: false}
	r.tasks[4] = model.Task{ID: 4, Title: "Complete To-Do App", Description: "", Completed: false}
}

type InMemoryRepository struct {
	tasks map[int]model.Task
	mu    sync.RWMutex
}

func NewInMemoryRepository() *InMemoryRepository {
	repo := &InMemoryRepository{
		tasks: make(map[int]model.Task),
	}
	// Add dummy data
	repo.addDummyData()
	return repo
}

func (r *InMemoryRepository) GetAllTasks() ([]model.Task, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	var result []model.Task
	for _, task := range r.tasks {
		result = append(result, task)
	}
	sort.Slice(result, func(i, j int) bool {
		return result[i].ID < result[j].ID
	})
	return result, nil
}

func (r *InMemoryRepository) CreateTask(task *model.Task) (*model.Task, error) {
	r.mu.Lock()
	defer r.mu.Unlock()
	task.ID = len(r.tasks) + 1
	r.tasks[task.ID] = *task
	return task, nil
}

func (r *InMemoryRepository) DeleteTask(id int) error {
	r.mu.Lock()
	defer r.mu.Unlock()
	delete(r.tasks, id)
	return nil
}

func (r *InMemoryRepository) ToggleTaskComplete(id int) (*model.Task, error) {
	r.mu.Lock()
	defer r.mu.Unlock()

	task, exists := r.tasks[id]
	if !exists {
		return nil, fmt.Errorf("Task with ID %d not found", id)
	}

	task.Completed = !task.Completed
	r.tasks[id] = task  // Update the task in the map

	return &task, nil
}