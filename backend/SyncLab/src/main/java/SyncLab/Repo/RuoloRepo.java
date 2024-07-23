package SyncLab.Repo;

import SyncLab.Entity.Ruolo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@EnableJpaRepositories
@Repository
public interface RuoloRepo extends JpaRepository<Ruolo,Integer>
{
    Optional<Ruolo> findOneByRuoloId_Ad(String ruoloAd, int idRuolo);

    Ruolo findByRuolo(String ruoloAd);
}
