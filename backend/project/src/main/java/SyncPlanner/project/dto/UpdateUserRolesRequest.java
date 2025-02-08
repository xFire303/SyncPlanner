package SyncPlanner.project.dto;

import lombok.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Getter
@Setter
@Component
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserRolesRequest {
    private List<UpdateUserSediRole> updatedRoles;
    private List<UpdateUserSediRole> removedRoles;
}
