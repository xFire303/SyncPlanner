package SyncPlanner.project.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user_sede_role")
public class UserSedeRoleModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserModel user;

    @ManyToOne
    @JoinColumn(name = "sede_id")
    private SediModel sede;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private RolesModel role;

    public UserSedeRoleModel(UserModel user, SediModel sede, RolesModel role) {
        this.user = user;
        this.sede = sede;
        this.role = role;
    }
}
