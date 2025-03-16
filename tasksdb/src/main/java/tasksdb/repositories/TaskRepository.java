package tasksdb.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tasksdb.entities.Task;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByDay(String day);
}
