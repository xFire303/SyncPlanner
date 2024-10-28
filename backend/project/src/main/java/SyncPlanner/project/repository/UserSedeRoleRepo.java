package SyncPlanner.project.repository;

import SyncPlanner.project.entity.UserSedeRoleModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserSedeRoleRepo extends JpaRepository<UserSedeRoleModel, Long> {
    @Query("SELECT u FROM UserSedeRoleModel u WHERE u.user.id = :userId")
    List<UserSedeRoleModel> getUserSediRole(Integer userId);
}
