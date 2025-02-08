package SyncPlanner.project.repository;

import SyncPlanner.project.entity.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<UserModel, Integer> {
    Optional<UserModel> findByEmail(String email);

    boolean existsByUsername(String username);

    Optional<UserModel> findByUsername(String username);

    boolean existsByEmail(String email);
}
