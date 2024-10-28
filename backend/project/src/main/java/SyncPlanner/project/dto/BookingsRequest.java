package SyncPlanner.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Data
@Component
@AllArgsConstructor
@NoArgsConstructor
public class BookingsRequest {
    private String date;
    private String userUsername;
    private String sedeName;
}
