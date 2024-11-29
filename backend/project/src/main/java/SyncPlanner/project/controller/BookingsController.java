package SyncPlanner.project.controller;

import SyncPlanner.project.dto.BookingsRequest;
import SyncPlanner.project.dto.UpdateBooking;
import SyncPlanner.project.entity.BookingsModel;
import SyncPlanner.project.service.BookingsService;
import SyncPlanner.project.service.DiscordBotService;
import SyncPlanner.project.service.JWTService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
public class BookingsController {
    @Autowired
    private BookingsService bookingsService;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private DiscordBotService discordBotService;

    private static final Map<String, String> SEDE_TO_DISCORD_ROLE = Map.of(
            "verona", "1308145201352671302", // ID ruolo per Verona
            "padova", "1308145246487445555", // ID ruolo per Padova
            "milano", "345678901234567890", // ID ruolo per Milano
            "como", "456789012345678901",   // ID ruolo per Como
            "napoli", "567890123456789012", // ID ruolo per Napoli
            "roma", "678901234567890123"    // ID ruolo per Roma
    );

    @PostMapping("/bookings")
    public void addBooking(@RequestBody BookingsRequest booking, HttpServletRequest request) {
        String token = jwtService.extractTokenFromHeader(request);
        String discordRoleId = SEDE_TO_DISCORD_ROLE.get(booking.getSedeName().toLowerCase());

        if (discordRoleId != null) {
            String message = "Ciao <@&%s>, **%s** sarà in sede il %s".formatted(
                    discordRoleId,
                    booking.getUserUsername(),
                    booking.getDate()
            );

            discordBotService.sendMessageToThread(message);
        } else {
            throw new IllegalArgumentException("Sede non valida: " + booking.getSedeName());
        }

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
