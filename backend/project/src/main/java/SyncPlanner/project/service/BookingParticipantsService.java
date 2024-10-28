package SyncPlanner.project.service;

import SyncPlanner.project.dto.BookingParticipantsRequest;
import SyncPlanner.project.entity.BookingParticipantsModel;
import SyncPlanner.project.repository.BookingParticipantsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookingParticipantsService {

    @Autowired
    private BookingParticipantsRepo bookingParticipantsRepo;

    public void addBookingParticipants(BookingParticipantsRequest bookingParticipantsRequest) {
        BookingParticipantsModel bookingParticipantsModel = new BookingParticipantsModel();


    }
}
