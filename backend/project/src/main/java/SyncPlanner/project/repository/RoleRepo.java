package SyncPlanner.project.repository;

import SyncPlanner.project.entity.RolesModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepo extends JpaRepository<RolesModel, Integer> {
    Optional<RolesModel> findByName(String roleName);
}
