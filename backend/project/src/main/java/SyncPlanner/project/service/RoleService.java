package SyncPlanner.project.service;

import SyncPlanner.project.entity.RolesModel;
import SyncPlanner.project.repository.RoleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {
    @Autowired
    private RoleRepo roleRepo;

    public RolesModel getRoleById(Long id) {
        return roleRepo.findById(id).orElseThrow(() -> new RuntimeException("Role not found"));
    }
}
