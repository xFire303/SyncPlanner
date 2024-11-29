package SyncPlanner.project.controller;

import SyncPlanner.project.dto.BookingsRequest;
import SyncPlanner.project.dto.UpdateBooking;
import SyncPlanner.project.entity.BookingsModel;
import SyncPlanner.project.service.BookingsService;
import SyncPlanner.project.service.JWTService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class BookingsController {
    @Autowired
    private BookingsService bookingsService;

    @Autowired
    private JWTService jwtService;

    @PostMapping("/bookings")
    public void addBooking(@RequestBody BookingsRequest booking, HttpServletRequest request) {
        String token = jwtService.extractTokenFromHeader(request);
        bookingsService.addBooking(booking);
    }

    @GetMapping("/bookings")
    public List<BookingsModel> getBookings(HttpServletRequest request) {
        String token = jwtService.extractTokenFromHeader(request);
        return bookingsService.getBookings();
    }

    @GetMapping("/bookings/{id}")
    public Optional<BookingsModel> getBookingById(@PathVariable("id") Integer id, HttpServletRequest request) {
        String token = jwtService.extractTokenFromHeader(request);
        return bookingsService.getBookingById(id);
    }

    @PatchMapping("/bookings/{id}")
    public void updateBooking(@PathVariable("id") Integer id, @RequestBody UpdateBooking updateBooking, HttpServletRequest request) {
        String token = jwtService.extractTokenFromHeader(request);
        bookingsService.updateBooking(id, updateBooking);
    }

    @DeleteMapping("/bookings/{id}")
    public void deleteBooking(@PathVariable("id") Integer id, HttpServletRequest request) {
        String token = jwtService.extractTokenFromHeader(request);
        bookingsService.deleteBooking(id);
    }
}
