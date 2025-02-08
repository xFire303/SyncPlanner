package SyncPlanner.project.controller;

import SyncPlanner.project.dto.BookingsRequest;
import SyncPlanner.project.dto.UpdateBooking;
import SyncPlanner.project.entity.BookingsModel;
import SyncPlanner.project.service.BookingsService;
//import SyncPlanner.project.service.DiscordBotService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class BookingsController {
    @Autowired
    private BookingsService bookingsService;


    //@Autowired
    //private DiscordBotService discordBotService;

    @PostMapping("/bookings")
    public ResponseEntity<Void> addBooking(@RequestBody BookingsRequest booking, HttpServletRequest request) {
        bookingsService.addBooking(booking);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/bookings")
    public ResponseEntity<List<BookingsModel>> getBookings(HttpServletRequest request) {
        List<BookingsModel> bookings = bookingsService.getBookings();

        return ResponseEntity.ok(bookings);
    }

    @GetMapping("/bookings/{id}")
    public ResponseEntity<?> getBookingById(@PathVariable("id") Integer id, HttpServletRequest request) {

        Optional<BookingsModel> bookingOptional = bookingsService.getBookingById(id);

        if (bookingOptional.isPresent()) {
            return ResponseEntity.ok(bookingOptional.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Booking not found with ID: " + id);
        }
    }

    @PatchMapping("/bookings/{id}")
    public ResponseEntity<?> updateBooking(@PathVariable("id") Integer id, @RequestBody UpdateBooking updateBooking, HttpServletRequest request) {

        try{
            bookingsService.updateBooking(id, updateBooking);
            return ResponseEntity.ok().build();
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Errore durante l'aggiornamento: " + e.getMessage());
        }
    }

    @DeleteMapping("/bookings/{id}")
    public ResponseEntity<?> deleteBooking(@PathVariable("id") Integer id, HttpServletRequest request) {

        if(bookingsService.deleteBooking(id)){
            return ResponseEntity.ok().build();
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Booking not found with ID: " + id);
        }
    }
}
