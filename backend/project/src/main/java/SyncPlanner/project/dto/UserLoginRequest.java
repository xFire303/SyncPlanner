package SyncPlanner.project.dto;

import SyncPlanner.project.entity.UserModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserLoginRequest {
    private String username;
    private String password;
}
