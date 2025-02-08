package SyncPlanner.project.dto;

import lombok.*;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserUpdateProfile {
    private String password;
}
