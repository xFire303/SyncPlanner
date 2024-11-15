package SyncPlanner.project.repository;

import SyncPlanner.project.entity.RolesModel;
import SyncPlanner.project.entity.SediModel;
import SyncPlanner.project.entity.UserModel;
import SyncPlanner.project.entity.UserSedeRoleModel;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserSedeRoleRepo extends JpaRepository<UserSedeRoleModel, Integer> {
    Optional<UserSedeRoleModel> findByUserAndSede(UserModel user, SediModel sede);

    @Query("SELECT u FROM UserSedeRoleModel u WHERE u.user.id = :userId")
    List<UserSedeRoleModel> getUserSediRole(Integer userId);

    @Transactional
    void deleteByUserAndSedeAndRole(UserModel user, SediModel sede, RolesModel role);

    boolean existsByUserAndSedeAndRole(UserModel user, SediModel sede, RolesModel role);

    void deleteByUser(UserModel userNotFound);
}
