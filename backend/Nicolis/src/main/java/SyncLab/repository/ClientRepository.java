package SyncLab.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import SyncLab.model.Client;

@Repository
public interface ClientRepository extends JpaRepository<Clinet, Long>{

}