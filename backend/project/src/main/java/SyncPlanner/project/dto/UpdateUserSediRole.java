package SyncPlanner.project.dto;

import lombok.*;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserSediRole {
    private String sedeName;

    private String roleName;
}
