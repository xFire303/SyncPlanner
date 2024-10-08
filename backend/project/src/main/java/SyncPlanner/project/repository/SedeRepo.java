package SyncPlanner.project.repository;

import SyncPlanner.project.entity.SediModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SedeRepo extends JpaRepository<SediModel, Long> {
}
