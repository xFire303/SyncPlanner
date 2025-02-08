package SyncPlanner.project.dto;

import SyncPlanner.project.entity.UserModel;
import lombok.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserRegistration {
    private UserModel user;
    private List<String> sedi;
}
