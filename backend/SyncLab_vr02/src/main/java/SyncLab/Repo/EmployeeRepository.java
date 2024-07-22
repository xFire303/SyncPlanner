package main.java.SyncLab.Repo;

import main.java.SyncLab.Entity.Employee;

@EnableJpaRepositories
@Repository

public interface EmployeeRepository extends JpaRepository<Employee, Integer>{

}
