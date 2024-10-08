package SyncPlanner.project.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "sedi")
public class SediModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;

    @ManyToMany(mappedBy = "sedi")
    private Set<UserModel> users;

    @OneToMany(mappedBy = "sede")
    private Set<UserSedeRoleModel> userSedeRoles = new HashSet<>();
}
