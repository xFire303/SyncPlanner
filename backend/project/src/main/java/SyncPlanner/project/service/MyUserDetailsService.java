package SyncPlanner.project.service;

import SyncPlanner.project.entity.UserModel;
import SyncPlanner.project.entity.UserPrincipal;
import SyncPlanner.project.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<UserModel> user = userRepo.findByEmail(username);

        if(user.isEmpty()) {
            throw new UsernameNotFoundException("User not found");
        }

        return new UserPrincipal(user.get());
    }
}
