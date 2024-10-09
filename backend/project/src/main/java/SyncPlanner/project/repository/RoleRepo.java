package SyncPlanner.project.repository;

import SyncPlanner.project.entity.RolesModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepo extends JpaRepository<RolesModel, Long> {
}
