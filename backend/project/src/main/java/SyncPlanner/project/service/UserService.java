package SyncPlanner.project.service;

import SyncPlanner.project.dto.UserUpdateProfile;
import SyncPlanner.project.entity.UserModel;
import SyncPlanner.project.repository.BookingParticipantsRepo;
import SyncPlanner.project.repository.BookingsRepo;
import SyncPlanner.project.repository.UserRepo;
import SyncPlanner.project.repository.UserSedeRoleRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepository;

    @Autowired
    private UserSedeRoleRepo userSedeRoleRepo;

    @Autowired
    private BookingsRepo bookingsRepo;

    @Autowired
    private BookingParticipantsRepo bookingParticipantsRepo;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTService jwtService;

    public void addUser(UserModel user) {
        user.setUsername(generateUniqueUsername(user.getName(), user.getSurname()));
        userRepository.save(user);
    }

    public String loginUser(String email, String password) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));

        if(authentication.isAuthenticated()) {
            return jwtService.generateToken(email);
        } else {
            return "Error logging in";
        }
    }

    public List<String> getAllUserEmails() {
        return userRepository.findAll().stream()
                .map(UserModel::getEmail)
                .toList();
    }

    private String generateUniqueUsername(String name, String surname) {
        String baseUsername = name.toLowerCase() + Character.toUpperCase(surname.charAt(0));
        String username = baseUsername;
        int counter = 1;

        while (userRepository.existsByUsername(username)) {
            username = baseUsername + counter;
            counter++;
        }

        return username;
    }

    public Optional<UserModel> getUserById(Integer id) {
        return userRepository.findById(id);
    }

    public void updateUser(Integer id, UserUpdateProfile userUpdateProfile) {
        UserModel existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (userUpdateProfile.getPassword() != null) {
            existingUser.setPassword(userUpdateProfile.getPassword());
        }

        userRepository.save(existingUser);
    }

    @Transactional
    public void deleteUser(Integer id) {
        UserModel user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

        userSedeRoleRepo.deleteByUser(user);
        bookingParticipantsRepo.deleteByUserId(id);
        bookingsRepo.deleteByUserId(id);
        userRepository.deleteById(id);
    }
}
