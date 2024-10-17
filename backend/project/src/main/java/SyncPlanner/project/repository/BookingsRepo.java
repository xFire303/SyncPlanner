package SyncPlanner.project.repository;

import SyncPlanner.project.entity.BookingsModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingsRepo extends JpaRepository<BookingsModel, Long> {
}
