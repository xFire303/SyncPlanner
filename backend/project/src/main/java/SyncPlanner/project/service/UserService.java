package SyncPlanner.project.service;

import SyncPlanner.project.entity.UserModel;
import SyncPlanner.project.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepository;

    public void addUser(UserModel user) {
        userRepository.save(user);
    }

    public Optional<UserModel> loginUser(String email, String password) {
        Optional<UserModel> user = userRepository.findByEmail(email);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
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
}
