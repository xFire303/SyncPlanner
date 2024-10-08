package SyncPlanner.project.controller;

import SyncPlanner.project.dto.UserLoginRequest;
import SyncPlanner.project.entity.UserModel;
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

    @PostMapping("/signup")
    @CrossOrigin(origins = "http://localhost:4200")
    public void addUser(@RequestBody UserModel user) {
        String username = user.generateUsername();
        user.setUsername(username);
        userService.addUser(user);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/users/emails")
    public List<String> getAllUserEmails() {
        return userService.getAllUserEmails();
    }

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
