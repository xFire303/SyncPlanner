package SyncLab.Service;



import SyncLab.Dto.EmployeeDTO;
import SyncLab.Dto.LoginDTO;
import SyncLab.response.Response.LoginResponse;

public interface EmployeeService {
    String addEmployee(EmployeeDTO employeeDTO);

    LoginResponse loginEmployee(LoginDTO loginDTO);

}