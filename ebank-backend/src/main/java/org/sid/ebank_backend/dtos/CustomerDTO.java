package org.sid.ebank_backend.dtos;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.sid.ebank_backend.entities.BankAccount;

import java.util.List;


@Data @NoArgsConstructor @AllArgsConstructor
public class CustomerDTO {

    private Long id;
    private String name;
    private String email;

}