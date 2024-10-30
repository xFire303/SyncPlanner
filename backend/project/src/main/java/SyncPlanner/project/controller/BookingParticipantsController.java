package SyncPlanner.project.controller;

import SyncPlanner.project.dto.BookingParticipantsRequest;
import SyncPlanner.project.entity.BookingParticipantsModel;
import SyncPlanner.project.service.BookingParticipantsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BookingParticipantsController {
    @Autowired
    private BookingParticipantsService bookingParticipantsService;

    @PostMapping("/bookingParticipants")
    public void addBookingParticipants(@RequestBody BookingParticipantsRequest bookingParticipants) {
        bookingParticipantsService.addBookingParticipants(bookingParticipants);
    }

    @GetMapping("/bookingParticipants/{bookingId}")
    public List<BookingParticipantsModel> getBookingParticipantsByBookingId(@PathVariable("bookingId") Integer bookingId) {
        return bookingParticipantsService.getBookingParticipantsByBookingId(bookingId);
    }

    @DeleteMapping("/bookingParticipants/{bookingId}")
    public void deleteBookingParticipants(@PathVariable("bookingId") Integer bookingId, @Param("userId") Integer userId) {
        bookingParticipantsService.deleteBookingParticipants(bookingId, userId);
    }
}
