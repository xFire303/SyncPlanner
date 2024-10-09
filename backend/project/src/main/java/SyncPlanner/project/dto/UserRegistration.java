package SyncPlanner.project.dto;

import SyncPlanner.project.entity.SediModel;
import SyncPlanner.project.entity.UserModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserRegistration {
    private UserModel user;
    private List<String> sedi;
}
