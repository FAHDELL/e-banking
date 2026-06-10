package org.sid.ebank_backend.web;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.sid.ebank_backend.dtos.CustomerDTO;
import org.sid.ebank_backend.entities.Customer;
import org.sid.ebank_backend.exceptions.customerNotFoundException;
import org.sid.ebank_backend.services.BankAccountService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@CrossOrigin(origins = "http://localhost:4200")
@RestController
@Slf4j
@AllArgsConstructor
//@CrossOrigin("*")
public class CustomerRestController {
    private BankAccountService bankAccountService;

@GetMapping("/customers")
@PreAuthorize("hasAuthority('SCOPE_USER')")
public List<CustomerDTO> customerDTOS(){
        return bankAccountService.listCustomer();
    }

@GetMapping("/customers/search")
@PreAuthorize("hasAuthority('SCOPE_USER')")
public List<CustomerDTO> searchcustomers(@RequestParam(name="keyword",defaultValue = "") String keyword){

return bankAccountService.searchCustomers(keyword );
}

@GetMapping("/customers/{id}")
@PreAuthorize("hasAuthority('SCOPE_USER')")
    public CustomerDTO getCustomer(@PathVariable(name = "id") Long customerId) throws customerNotFoundException {
        return bankAccountService.getCustomer(customerId);
    }
@PostMapping("/customers")
@PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public CustomerDTO saveCustomer(@RequestBody CustomerDTO customerDTO){
        return bankAccountService.saveCustomer(customerDTO);
    }

@PutMapping("/customers/{customerId}")
@PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public CustomerDTO updateCustomer(@PathVariable Long customerId ,@RequestBody CustomerDTO customerDTO){
        customerDTO.setId(customerId);
        return bankAccountService.updateCustomer(customerDTO);
    }

@DeleteMapping("/customers/{id}")
@PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public void deleteCustomer(@PathVariable Long id){
        bankAccountService.deleteCustomer(id);
    }
}
