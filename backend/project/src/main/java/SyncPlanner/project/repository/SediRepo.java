package SyncPlanner.project.repository;

import SyncPlanner.project.entity.SediModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SediRepo extends JpaRepository<SediModel, Long> {

    Optional<SediModel> findByName(String name);
}
