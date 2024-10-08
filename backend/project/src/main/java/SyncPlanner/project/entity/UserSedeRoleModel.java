package SyncPlanner.project.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@Entity
@Data
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

}
