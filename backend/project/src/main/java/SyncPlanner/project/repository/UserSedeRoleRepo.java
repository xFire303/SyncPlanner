package SyncPlanner.project.repository;

import SyncPlanner.project.entity.UserModel;
import SyncPlanner.project.entity.UserSedeRoleModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserSedeRoleRepo extends JpaRepository<UserSedeRoleModel, Long> {
}
