package SyncPlanner.project.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;
import org.springframework.stereotype.Component;

@Component
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "bookingsParticipant")
public class BookingParticipantsModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private UserModel user;

    @ManyToOne
    @JoinColumn(name = "bookingId", nullable = false)
    private BookingsModel booking;
}
