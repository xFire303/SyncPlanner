package SyncPlanner.project.service;

import SyncPlanner.project.entity.UserModel;
import SyncPlanner.project.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public void addUser(UserModel user) {
        user.setUsername(generateUniqueUsername(user.getName(), user.getSurname()));
        userRepository.save(user);
    }

    public Optional<UserModel> loginUser(String email, String password) {
        Optional<UserModel> user = userRepository.findByEmail(email);
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            return user;
        } else {
            return Optional.empty();
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

    public Optional<UserModel> getUserById(Long id) {
        return userRepository.findById(id);
    }
}
