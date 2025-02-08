package SyncPlanner.project.controller;

import SyncPlanner.project.dto.UpdateUserRolesRequest;
import SyncPlanner.project.dto.UserLoginRequest;
import SyncPlanner.project.dto.UserRegistration;
import SyncPlanner.project.dto.UserUpdateProfile;
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
    public ResponseEntity<?> addUser(@RequestBody UserRegistration userRegistration) {
        UserModel user = userRegistration.getUser();
        List<String> sediNomi = userRegistration.getSedi();

        userService.addUser(user);

        RolesModel guestRole = roleService.getRoleById(1);

        for (String sedeNome : sediNomi) {
            SediModel sede = sediService.getSedeByName(sedeNome);

            if (sede != null) {
                UserSedeRoleModel userSedeRole = new UserSedeRoleModel();
                userSedeRole.setUser(user);
                userSedeRole.setSede(sede);
                userSedeRole.setRole(guestRole);
                userSedeRoleService.addUserSedeRole(userSedeRole);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Sede not found: " + sedeNome);
            }
        }
        return ResponseEntity.ok().build();
    }

    @GetMapping("/users/check-email")
    public ResponseEntity<Boolean> checkIfEmailExists(@RequestParam String email) {
        boolean exists = userService.emailExists(email);
        return ResponseEntity.ok(exists);
    }

    @PostMapping("/signin")
    public ResponseEntity<?> loginUser(@RequestBody UserLoginRequest loginRequest) {
        try {
            String token = userService.loginUser(loginRequest.getUsername(), loginRequest.getPassword());
            return ResponseEntity.ok(token);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenziali non valide");
        }
    }

    @GetMapping("/user")
    public ResponseEntity<UserModel> getUserById(HttpServletRequest request) {
        String token = jwtService.extractTokenFromHeader(request);
        Integer id = Integer.parseInt(jwtService.getUserIdFromToken(token));

        Optional<UserModel> user = userService.getUserById(id);

        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/user/roles")
    public ResponseEntity<List<UserSedeRoleModel>> getUserRoles(HttpServletRequest request) {
        String token = jwtService.extractTokenFromHeader(request);
        Integer id = Integer.parseInt(jwtService.getUserIdFromToken(token));
        List<UserSedeRoleModel> userSediRoles = userSedeRoleService.getUserSediRole(id);

        return ResponseEntity.ok(userSediRoles);
    }

    @PatchMapping("/user")
    public ResponseEntity<?> updateUser(@RequestBody UserUpdateProfile user, HttpServletRequest request) {
        String token = jwtService.extractTokenFromHeader(request);
        Integer id = Integer.parseInt(jwtService.getUserIdFromToken(token));

        try {
            userService.updateUser(id, user);
            return ResponseEntity.ok("Profilo aggiornato con successo");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Errore durante l'aggiornamento: " + e.getMessage());
        }
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserSedeRoleModel>> getUsers() {
        List <UserSedeRoleModel> users = userSedeRoleService.getUsers();

        return ResponseEntity.ok(users);
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

    @DeleteMapping("/user/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Integer id, HttpServletRequest request) {
        if (userService.deleteUser(id)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Utente non trovato");
        }
    }
}
