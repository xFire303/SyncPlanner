package SyncPlanner.project.service;

import SyncPlanner.project.dto.BookingsRequest;
import SyncPlanner.project.dto.UpdateBooking;
import SyncPlanner.project.entity.BookingsModel;
import SyncPlanner.project.entity.SediModel;
import SyncPlanner.project.entity.UserModel;
import SyncPlanner.project.repository.BookingParticipantsRepo;
import SyncPlanner.project.repository.BookingsRepo;
import SyncPlanner.project.repository.SediRepo;
import SyncPlanner.project.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class BookingsService {
    @Autowired
    private BookingsRepo bookingsRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private SediRepo sedeRepo;

    @Autowired
    private BookingParticipantsRepo bookingParticipantsRepo;

    public List<BookingsModel> getBookings() {
        return bookingsRepo.findAll();
    }

    public void addBooking(BookingsRequest bookingRequest) {
        Optional<UserModel> userOptional = userRepo.findByUsername(bookingRequest.getUserUsername());
        if (userOptional.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        UserModel user = userOptional.get();

        Optional<SediModel> sedeOptional = sedeRepo.findByName(bookingRequest.getSedeName());
        if (sedeOptional.isEmpty()) {
            throw new RuntimeException("Sede not found");
        }

        SediModel sede = sedeOptional.get();

        BookingsModel booking = new BookingsModel();
        booking.setDate(bookingRequest.getDate());
        booking.setTimeStamp(Instant.now());
        booking.setUser(user);
        booking.setSede(sede);

        bookingsRepo.save(booking);
    }

    public Optional<BookingsModel> getBookingById(Integer id) {
        return bookingsRepo.findById(id);
    }

    public void updateBooking(Integer id, UpdateBooking updateBooking) {
        Optional<BookingsModel> bookingOptional = bookingsRepo.findById(id);
        if (bookingOptional.isEmpty()) {
            throw new RuntimeException("Booking not found");
        }
        BookingsModel booking = bookingOptional.get();
        booking.setDate(updateBooking.getDate());
        bookingsRepo.save(booking);
    }

    public void deleteBooking(Integer id) {
        bookingParticipantsRepo.deleteByBookingId(id);
        bookingsRepo.deleteById(id);
    }
}
