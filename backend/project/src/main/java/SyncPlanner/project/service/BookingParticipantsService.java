package SyncPlanner.project.service;

import SyncPlanner.project.dto.BookingParticipantsRequest;
import SyncPlanner.project.entity.BookingParticipantsModel;
import SyncPlanner.project.entity.BookingsModel;
import SyncPlanner.project.entity.UserModel;
import SyncPlanner.project.repository.BookingParticipantsRepo;
import SyncPlanner.project.repository.BookingsRepo;
import SyncPlanner.project.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingParticipantsService {

    @Autowired
    private BookingParticipantsRepo bookingParticipantsRepo;

    @Autowired
    private BookingsRepo bookingsRepo;

    @Autowired
    private UserRepo userRepo;

    public void addBookingParticipants(BookingParticipantsRequest bookingParticipantsRequest) {
        UserModel user = userRepo.findById(bookingParticipantsRequest.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        BookingsModel booking = bookingsRepo.findById(bookingParticipantsRequest.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        BookingParticipantsModel model = new BookingParticipantsModel();
        model.setUser(user);
        model.setBooking(booking);

        bookingParticipantsRepo.save(model);


    }

    public List<BookingParticipantsModel> getBookingParticipantsByBookingId(Integer bookingId) {

        return bookingParticipantsRepo.getBookingParticipantsByBookingId(bookingId);
    }

    public void deleteBookingParticipants(Integer bookingId, Integer userId) {
        bookingParticipantsRepo.deleteByBookingIdAndUserId(bookingId, userId);
    }
}
