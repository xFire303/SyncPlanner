package SyncLab.EmbloyeeController;


import com.sun.net.httpserver.Request;
import main.java.SyncLab.Entity.Employee;
import main.java.SyncLab.Service.EmployeeService;

@RestController
@CrossOrigin
@RequestMapping("api/v1/employee")

public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping(path = "/save")
    public String saveEmployee(@RequestBody EmployeeDTO employeeDTO){
        String id = employeeService.addEmployee(employeeDTO);
        return id;
    }
    @PostMapping(path = "/login")
    public ResponseEntity<?> loginEmployee(@RequestBody LoginDTO loginDTO){
        LoginResponse loginResponse = employeeService.loginEmployee(loginDTO);
        return ResponseEmpity.ok(loginResponse);
    }
}