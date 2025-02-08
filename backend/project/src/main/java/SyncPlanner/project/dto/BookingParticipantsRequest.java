package SyncPlanner.project.dto;

import lombok.*;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
@AllArgsConstructor
@NoArgsConstructor
public class BookingParticipantsRequest {
    private int userId;
    private int bookingId;
}
