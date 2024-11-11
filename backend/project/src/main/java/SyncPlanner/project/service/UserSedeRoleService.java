package SyncPlanner.project.service;

import SyncPlanner.project.dto.UpdateUserSediRole;
import SyncPlanner.project.entity.RolesModel;
import SyncPlanner.project.entity.SediModel;
import SyncPlanner.project.entity.UserModel;
import SyncPlanner.project.entity.UserSedeRoleModel;
import SyncPlanner.project.repository.RoleRepo;
import SyncPlanner.project.repository.SediRepo;
import SyncPlanner.project.repository.UserRepo;
import SyncPlanner.project.repository.UserSedeRoleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserSedeRoleService {
    @Autowired
    private UserSedeRoleRepo userSedeRoleRepo;

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private SediRepo sedeRepository;

    @Autowired
    private RoleRepo roleRepository;

    public void addUserSedeRole(UserSedeRoleModel userSedeRole) {
        userSedeRoleRepo.save(userSedeRole);
    }

    public List<UserSedeRoleModel> getUserSediRole(Integer id) {
        return userSedeRoleRepo.getUserSediRole(id);
    }

    public List<UserSedeRoleModel> getUsers() {
        return userSedeRoleRepo.findAll();
    }

    public void updateUserSedeRole(Integer userId, List<UpdateUserSediRole> userSediRoles) {
        // Recupera l'utente
        UserModel user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utente non trovato"));

        // Rimozione di tutti i ruoli associati all'utente
        userSedeRoleRepo.deleteByUser(user);

        // Aggiungi i nuovi ruoli
        for (UpdateUserSediRole userSedeRole : userSediRoles) {
            SediModel sede = sedeRepository.findByName(userSedeRole.getSedeName())
                    .orElseThrow(() -> new RuntimeException("Sede non trovata"));

            RolesModel role = roleRepository.findByName(userSedeRole.getRoleName())
                    .orElseThrow(() -> new RuntimeException("Ruolo non trovato"));

            UserSedeRoleModel newUserSedeRole = new UserSedeRoleModel(user, sede, role);
            userSedeRoleRepo.save(newUserSedeRole);
        }
    }
}
