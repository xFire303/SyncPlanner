package SyncPlanner.project.controller;

import SyncPlanner.project.dto.BookingsRequest;
import SyncPlanner.project.entity.BookingsModel;
import SyncPlanner.project.service.BookingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BookingsController {
    @Autowired
    private BookingsService bookingsService;

    @PostMapping("/bookings")
    public void addBooking(@RequestBody BookingsRequest booking) {
        bookingsService.addBooking(booking);
    }

    @GetMapping("/bookings")
    public List<BookingsModel> getBookings() {
        return bookingsService.getBookings();
    }
}
