package SyncLab.Service.impl;

import main.java.SyncLab.Dto.EmployeeDTO;
import main.java.SyncLab.Entity.Employee;
import main.java.SyncLab.Service.EmployeeService;

public class EmployeeIMPL implements EmployeeService {

    @Autowired
    private EmployeeRepo employeeRepo;

    String addEmployee(EmployeeDTO employeeDTO){

        Employee employee = new Employee(
                employeeDTO.getEmployeeid(),
                employeeDTO.getEmployeename(),
                employeeDTO.getEmail(),

                this.passwordEncoder.encode(exployeeDTO.getpassword())
        );

        employee.save(employee);

        return  employee.getEmployeename();
    }
}
