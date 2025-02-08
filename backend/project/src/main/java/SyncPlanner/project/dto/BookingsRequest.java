package SyncPlanner.project.dto;

import lombok.*;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
@AllArgsConstructor
@NoArgsConstructor
public class BookingsRequest {
    private String date;
    private String userUsername;
    private String sedeName;
}
