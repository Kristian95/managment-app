package service

import (
	"todo-app/pkg/models"
	"todo-app/pkg/repositories"
)

type TaskService struct {
	repo repository.TaskRepository
}

func NewTaskService(repo repository.TaskRepository) *TaskService {
	return &TaskService{
		repo: repo,
	}
}

func (s *TaskService) GetAllTasks() ([]model.Task, error) {
	return s.repo.GetAllTasks()
}

func (s *TaskService) CreateTask(task *model.Task) (*model.Task, error) {
    return s.repo.CreateTask(task)
}

func (s *TaskService) DeleteTask(id int) error {
	return s.repo.DeleteTask(id)
}

func (s *TaskService) ToggleTaskComplete(id int) (*model.Task, error) {
    return s.repo.ToggleTaskComplete(id)
}