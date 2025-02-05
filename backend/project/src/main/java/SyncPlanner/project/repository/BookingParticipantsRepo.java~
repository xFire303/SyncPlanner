package SyncPlanner.project.repository;

import SyncPlanner.project.entity.BookingParticipantsModel;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingParticipantsRepo extends JpaRepository<BookingParticipantsModel, Integer> {
    List<BookingParticipantsModel> getBookingParticipantsByBookingId(Integer bookingId);

    @Modifying
    @Transactional
    @Query("DELETE FROM BookingParticipantsModel bp WHERE bp.booking.id = :bookingId AND bp.user.id = :userId")
    void deleteByBookingIdAndUserId(Integer bookingId, Integer userId);

    @Modifying
    @Transactional
    @Query("DELETE FROM BookingParticipantsModel bp WHERE bp.booking.id = :bookingId")
    void deleteByBookingId(Integer bookingId);
}
