package tasksdb.controllers;

import org.springframework.web.bind.annotation.*;
import tasksdb.entities.Task;
import tasksdb.repositories.TaskRepository;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins="*")//Permitir acceso desde el frontend TODO ver esto
public class TaskController {
    private final TaskRepository taskRepository;
    public TaskController(TaskRepository taskRepository){
        this.taskRepository = taskRepository;
    }

    @PostMapping
    public Task addTask(@RequestBody Task task){
        return taskRepository.save(task);
    }
    @GetMapping
    public List<Task> getAllTasks(){
        return taskRepository.findAll();
    }

    @GetMapping("/{day}")
    public List<Task> getTasksByDay(@PathVariable String day){
        return taskRepository.findByDay(day);
    }
    @DeleteMapping
    public void deleteAllTasks(){
        taskRepository.deleteAll();
    }
}
