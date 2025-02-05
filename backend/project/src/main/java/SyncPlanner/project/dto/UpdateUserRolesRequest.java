package SyncPlanner.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Data
@Component
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserRolesRequest {
    private List<UpdateUserSediRole> updatedRoles;
    private List<UpdateUserSediRole> removedRoles;
}
