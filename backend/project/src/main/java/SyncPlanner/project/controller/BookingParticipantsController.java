package SyncPlanner.project.controller;

import SyncPlanner.project.dto.BookingParticipantsRequest;
import SyncPlanner.project.entity.BookingParticipantsModel;
import SyncPlanner.project.service.BookingParticipantsService;
import SyncPlanner.project.service.JWTService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BookingParticipantsController {
    @Autowired
    private BookingParticipantsService bookingParticipantsService;

    @Autowired
    private JWTService jwtService;

    @PostMapping("/bookingParticipants")
    public ResponseEntity<Void> addBookingParticipants(@RequestBody BookingParticipantsRequest bookingParticipants, HttpServletRequest request) {
        String token = jwtService.extractTokenFromHeader(request);
        int id = Integer.parseInt(jwtService.getUserIdFromToken(token));
        bookingParticipants.setUserId(id);
        bookingParticipantsService.addBookingParticipants(bookingParticipants);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/bookingParticipants/{bookingId}")
    public ResponseEntity<List<BookingParticipantsModel>> getBookingParticipantsByBookingId(@PathVariable("bookingId") Integer bookingId, HttpServletRequest request) {
        List<BookingParticipantsModel> bookingParticipants = bookingParticipantsService.getBookingParticipantsByBookingId(bookingId);

        return ResponseEntity.ok(bookingParticipants);
    }

    @DeleteMapping("/bookingParticipants/{bookingId}")
    public ResponseEntity<?> deleteBookingParticipants(@PathVariable("bookingId") Integer bookingId, HttpServletRequest request) {
        String token = jwtService.extractTokenFromHeader(request);
        try{
            Integer userId = Integer.parseInt(jwtService.getUserIdFromToken(token));
            bookingParticipantsService.deleteBookingParticipants(bookingId, userId);
            return ResponseEntity.ok().build();
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Errore durante l'eliminazione: " + e.getMessage());
        }
    }
}
