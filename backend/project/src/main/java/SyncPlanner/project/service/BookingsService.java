package SyncPlanner.project.service;

import SyncPlanner.project.entity.BookingsModel;
import SyncPlanner.project.repository.BookingsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingsService {
    @Autowired
    private BookingsRepo bookingsRepo;

    public List<BookingsModel> getBookings() {
        return bookingsRepo.findAll();
    }

    public void addBooking(BookingsModel booking) {
        bookingsRepo.save(booking);
    }
}
