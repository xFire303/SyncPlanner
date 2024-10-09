package SyncPlanner.project.controller;

import SyncPlanner.project.dto.UserLoginRequest;
import SyncPlanner.project.dto.UserRegistration;
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

@RestController
public class UserController {
    @Autowired
    private UserService userService;
    private UserSedeRoleService userSedeRoleService;

    @PostMapping("/signup")
    @CrossOrigin(origins = "http://localhost:4200")
    public void addUser(@RequestBody UserRegistration userRegistration) {
        UserModel user = userRegistration.getUser();
        List<String> sediNomi = userRegistration.getSedi();

        String username = user.generateUsername();
        user.setUsername(username);
        userService.addUser(user);

        RolesModel guestRole = RoleService.getRoleById(1L);

        for (String sedeNome : sediNomi) {
            SediModel sede = SediService.getSedeByName(sedeNome);

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

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/users/emails")
    public List<String> getAllUserEmails() {
        return userService.getAllUserEmails();
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/signin")
    public ResponseEntity<String> loginUser(@RequestBody UserLoginRequest loginRequest) {
        boolean isAuthenticated = userService.loginUser(loginRequest.getEmail(), loginRequest.getPassword()).isPresent();

        if (isAuthenticated) {
            return ResponseEntity.ok("Login successful!");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password.");
        }
    }
}
