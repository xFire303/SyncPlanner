package SyncPlanner.project.repository;

import SyncPlanner.project.entity.BookingParticipantsModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingParticipantsRepo extends JpaRepository<BookingParticipantsModel, Integer> {
}
