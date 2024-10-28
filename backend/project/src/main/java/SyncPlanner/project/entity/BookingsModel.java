package SyncPlanner.project.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Component
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "bookings")
public class BookingsModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "date")
    private String date;

    @Column(name = "timestamp")
    private Instant timeStamp;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private UserModel user;

    @ManyToOne
    @JoinColumn(name = "sedeId", nullable = false)
    private SediModel sede;
}
