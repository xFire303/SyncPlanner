package SyncPlanner.project.service;

import SyncPlanner.project.dto.UserUpdateProfile;
import SyncPlanner.project.entity.UserModel;
import SyncPlanner.project.entity.UserPrincipal;
import SyncPlanner.project.repository.BookingParticipantsRepo;
import SyncPlanner.project.repository.BookingsRepo;
import SyncPlanner.project.repository.UserRepo;
import SyncPlanner.project.repository.UserSedeRoleRepo;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));

            if (authentication.isAuthenticated()) {
                UserPrincipal userDetails = (UserPrincipal) authentication.getPrincipal();
                Integer userId = userDetails.getId();
                return jwtService.generateToken(email, userId);
            } else {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
            }
        } catch (BadCredentialsException ex) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Email o password errati");
        }
    }

    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
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
    public boolean deleteUser(Integer id) {
        try {
            UserModel user = userRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));

            userSedeRoleRepo.deleteByUser(user);
            bookingParticipantsRepo.deleteByUserId(id);
            bookingsRepo.deleteByUserId(id);

            userRepository.deleteById(id);

            return true;
        } catch (EntityNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Errore durante l'eliminazione dell'utente con id: " + id, e);
        }
    }
}
