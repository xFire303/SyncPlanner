package SyncPlanner.project.controller;

import SyncPlanner.project.dto.BookingParticipantsRequest;
import SyncPlanner.project.entity.BookingParticipantsModel;
import SyncPlanner.project.service.BookingParticipantsService;
import SyncPlanner.project.service.JWTService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BookingParticipantsController {
    @Autowired
    private BookingParticipantsService bookingParticipantsService;

    @Autowired
    private JWTService jwtService;

    @PostMapping("/bookingParticipants")
    public void addBookingParticipants(@RequestBody BookingParticipantsRequest bookingParticipants, HttpServletRequest request) {
        String token = jwtService.extractTokenFromHeader(request);
        int id = Integer.parseInt(jwtService.getUserIdFromToken(token));
        bookingParticipants.setUserId(id);
        bookingParticipantsService.addBookingParticipants(bookingParticipants);
    }

    @GetMapping("/bookingParticipants/{bookingId}")
    public List<BookingParticipantsModel> getBookingParticipantsByBookingId(@PathVariable("bookingId") Integer bookingId, HttpServletRequest request) {
        String token = jwtService.extractTokenFromHeader(request);
        return bookingParticipantsService.getBookingParticipantsByBookingId(bookingId);
    }

    @DeleteMapping("/bookingParticipants/{bookingId}")
    public void deleteBookingParticipants(@PathVariable("bookingId") Integer bookingId, HttpServletRequest request) {
        String token = jwtService.extractTokenFromHeader(request);
        Integer userId = Integer.parseInt(jwtService.getUserIdFromToken(token));
        bookingParticipantsService.deleteBookingParticipants(bookingId, userId);
    }
}
