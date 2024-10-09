package SyncPlanner.project.service;

import SyncPlanner.project.entity.SediModel;
import SyncPlanner.project.repository.SediRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SediService {
    @Autowired
    private static SediRepo sediRepo;

    public static SediModel getSedeByName(String name) {
        return sediRepo.findByName(name).orElse(null);
    }
}
