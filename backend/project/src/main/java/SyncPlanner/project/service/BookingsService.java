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
import java.util.Map;
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

        String discordRoleId = SEDE_TO_DISCORD_ROLE.get(bookingRequest.getSedeName().toLowerCase());

        if (discordRoleId != null) {
            String message = "Ciao <@&%s>, **%s** sarà in sede il %s".formatted(
                    discordRoleId,
                    bookingRequest.getUserUsername(),
                    bookingRequest.getDate()
            );
            discordBotService.sendMessageToThread(message);
        }

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

    public boolean deleteBooking(Integer id) {
        try {
            if (bookingsRepo.findById(id).isPresent()) {
                String discordRoleId = SEDE_TO_DISCORD_ROLE.get(bookingsRepo.findById(id).get().getSede().getName());
                String message = "Ciao, <@&%s>, **%s** ha cancellato la prenotazione del %s".formatted(discordRoleId, bookingsRepo.findById(id).get().getUser().getUsername(), bookingsRepo.findById(id).get().getDate());
                discordBotService.sendMessageToThread(message);

                bookingParticipantsRepo.deleteByBookingId(id);
                bookingsRepo.deleteById(id);

                return true;
            } else {
                throw new RuntimeException("Booking not found");
            }
        }catch (Exception e) {
            throw new RuntimeException("Errore durante l'eliminazione della prenotazione con id: " + id, e);
        }
    }
}
