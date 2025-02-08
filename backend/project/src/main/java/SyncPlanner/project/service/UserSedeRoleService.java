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

    public void updateUserSedeRole(Integer userId, List<UpdateUserSediRole> updatedRoles, List<UpdateUserSediRole> removedRoles) {
        // Recupera l'utente
        UserModel user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utente non trovato"));

        // Rimuovi solo i ruoli selezionati per la rimozione
        for (UpdateUserSediRole roleToRemove : removedRoles) {
            SediModel sede = sedeRepository.findByName(roleToRemove.getSedeName())
                    .orElseThrow(() -> new RuntimeException("Sede non trovata"));
            RolesModel role = roleRepository.findByName(roleToRemove.getRoleName())
                    .orElseThrow(() -> new RuntimeException("Ruolo non trovato"));

            // Rimuove la specifica relazione sede-ruolo
            userSedeRoleRepo.deleteByUserAndSedeAndRole(user, sede, role);
        }

        // Aggiungi o aggiorna i ruoli selezionati
        for (UpdateUserSediRole newUserRole : updatedRoles) {
            SediModel sede = sedeRepository.findByName(newUserRole.getSedeName())
                    .orElseThrow(() -> new RuntimeException("Sede non trovata"));
            RolesModel role = roleRepository.findByName(newUserRole.getRoleName())
                    .orElseThrow(() -> new RuntimeException("Ruolo non trovato"));

            // Verifica se l'associazione esiste già, altrimenti la crea
            if (!userSedeRoleRepo.existsByUserAndSedeAndRole(user, sede, role)) {
                UserSedeRoleModel newUserSedeRole = new UserSedeRoleModel(user, sede, role);
                userSedeRoleRepo.save(newUserSedeRole);
            }
        }
    }
}
