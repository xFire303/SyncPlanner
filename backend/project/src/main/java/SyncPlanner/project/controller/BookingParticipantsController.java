package SyncPlanner.project.controller;

import SyncPlanner.project.dto.BookingParticipantsRequest;
import SyncPlanner.project.service.BookingParticipantsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BookingParticipantsController {
    @Autowired
    private BookingParticipantsService bookingParticipantsService;

    @PostMapping("/bookingParticipants")
    public void addBookingParticipants(@RequestBody BookingParticipantsRequest bookingParticipants) {
        bookingParticipantsService.addBookingParticipants(bookingParticipants);
    }
}
