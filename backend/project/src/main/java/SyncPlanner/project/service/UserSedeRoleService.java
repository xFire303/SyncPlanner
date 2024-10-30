package SyncPlanner.project.service;

import SyncPlanner.project.entity.UserModel;
import SyncPlanner.project.entity.UserSedeRoleModel;
import SyncPlanner.project.repository.UserSedeRoleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserSedeRoleService {
    @Autowired
    private UserSedeRoleRepo userSedeRoleRepo;

    public void addUserSedeRole(UserSedeRoleModel userSedeRole) {
        userSedeRoleRepo.save(userSedeRole);
    }

    public List<UserSedeRoleModel> getUserSediRole(Integer id) {
        return userSedeRoleRepo.getUserSediRole(id);
    }

    public List<UserSedeRoleModel> getUsers() {
        return userSedeRoleRepo.findAll();
    }
}
