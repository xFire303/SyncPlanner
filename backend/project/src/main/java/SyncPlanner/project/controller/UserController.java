package SyncPlanner.project.controller;

import SyncPlanner.project.dto.UserLoginRequest;
import SyncPlanner.project.dto.UserRegistration;
import SyncPlanner.project.dto.UserUpdateProfile;
import SyncPlanner.project.entity.RolesModel;
import SyncPlanner.project.entity.SediModel;
import SyncPlanner.project.entity.UserModel;
import SyncPlanner.project.entity.UserSedeRoleModel;
import SyncPlanner.project.service.RoleService;
import SyncPlanner.project.service.SediService;
import SyncPlanner.project.service.UserSedeRoleService;
import SyncPlanner.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    @Autowired
    private SediService sediService;

    @Autowired
    private UserSedeRoleService userSedeRoleService;

    @PostMapping("/signup")
    public void addUser(@RequestBody UserRegistration userRegistration) {
        UserModel user = userRegistration.getUser();
        List<String> sediNomi = userRegistration.getSedi();

        userService.addUser(user);

        RolesModel guestRole = roleService.getRoleById(1L);

        for (String sedeNome : sediNomi) {
            SediModel sede = sediService.getSedeByName(sedeNome);

            if(sede != null) {
                UserSedeRoleModel userSedeRole = new UserSedeRoleModel();
                userSedeRole.setUser(user);
                userSedeRole.setSede(sede);
                userSedeRole.setRole(guestRole);
                userSedeRoleService.addUserSedeRole(userSedeRole);
            }else{
                throw new RuntimeException("Sede not found: " + sedeNome);
            }
        }
    }

    @GetMapping("/users/emails")
    public List<String> getAllUserEmails() {
        return userService.getAllUserEmails();
    }

    @PostMapping("/signin")
    public ResponseEntity<?> loginUser(@RequestBody UserLoginRequest loginRequest) {
        Optional<UserModel> user = userService.loginUser(loginRequest.getEmail(), loginRequest.getPassword());


        if (user.isPresent()) {
            return ResponseEntity.ok(user.get().getId());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email o password non validi");
        }
    }

    @GetMapping("/user/{id}")
    public Optional<UserModel> getUserById(@PathVariable("id") Integer id) {
        return userService.getUserById(id);
    }

    @GetMapping("/user/{id}/roles")
    public List<UserSedeRoleModel> getUserRoles(@PathVariable("id") Integer id) {
        return userSedeRoleService.getUserSediRole(id);
    }

    @PatchMapping("/user/{id}")
    public ResponseEntity<Void> updateUser(@PathVariable("id") Integer id, @RequestBody UserUpdateProfile user) {
        userService.updateUser(id, user);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
