package SyncPlanner.project.controller;

import SyncPlanner.project.dto.*;
import SyncPlanner.project.entity.RolesModel;
import SyncPlanner.project.entity.SediModel;
import SyncPlanner.project.entity.UserModel;
import SyncPlanner.project.entity.UserSedeRoleModel;
import SyncPlanner.project.service.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
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

    @Autowired
    private JWTService jwtService;

    @PostMapping("/signup")
    public void addUser(@RequestBody UserRegistration userRegistration) {
        UserModel user = userRegistration.getUser();
        List<String> sediNomi = userRegistration.getSedi();

        userService.addUser(user);

        RolesModel guestRole = roleService.getRoleById(1);

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

    @GetMapping("/users/check-email")
    public ResponseEntity<Boolean> checkIfEmailExists(@RequestParam String email) {
        boolean exists = userService.emailExists(email);
        return ResponseEntity.ok(exists);
    }

    @PostMapping("/signin")
    public ResponseEntity<?> loginUser(@RequestBody UserLoginRequest loginRequest) {
        return userService.loginUser(loginRequest.getUsername(), loginRequest.getPassword());
    }

    @GetMapping("/user")
    public Optional<UserModel> getUserById(HttpServletRequest request) {
        String token = jwtService.extractTokenFromHeader(request);
        Integer id = Integer.parseInt(jwtService.getUserIdFromToken(token));
        return userService.getUserById(id);
    }

    @GetMapping("/user/roles")
    public List<UserSedeRoleModel> getUserRoles(HttpServletRequest request) {
        String token = jwtService.extractTokenFromHeader(request);
        Integer id = Integer.parseInt(jwtService.getUserIdFromToken(token));
        return userSedeRoleService.getUserSediRole(id);
    }

    @PatchMapping("/user")
    public ResponseEntity<?> updateUser(@RequestBody UserUpdateProfile user, HttpServletRequest request) {
        String token = jwtService.extractTokenFromHeader(request);
        Integer id = Integer.parseInt(jwtService.getUserIdFromToken(token));
        userService.updateUser(id, user);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/users")
    public List<UserSedeRoleModel> getUsers() {
        return userSedeRoleService.getUsers();
    }

    @PostMapping("/user/roles")
    public ResponseEntity<?> updateUserRoles(@RequestBody UpdateUserRolesRequest updateUserRolesRequest, HttpServletRequest request) {
        String token = jwtService.extractTokenFromHeader(request);
        Integer id = Integer.parseInt(jwtService.getUserIdFromToken(token));
        try {
            userSedeRoleService.updateUserSedeRole(id, updateUserRolesRequest.getUpdatedRoles(), updateUserRolesRequest.getRemovedRoles());

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Ruoli aggiornati correttamente.");
            response.put("success", true);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", "Errore durante l'aggiornamento dei ruoli: " + e.getMessage());
            errorResponse.put("success", false);

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @DeleteMapping("/user")
    public void deleteUser(HttpServletRequest request) {
        String token = jwtService.extractTokenFromHeader(request);
        Integer id = Integer.parseInt(jwtService.getUserIdFromToken(token));
        userService.deleteUser(id);
    }
}
