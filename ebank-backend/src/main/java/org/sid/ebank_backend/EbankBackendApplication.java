package org.sid.ebank_backend;


import org.sid.ebank_backend.dtos.BankAccountDTO;
import org.sid.ebank_backend.dtos.CurrentBankAccountDTO;
import org.sid.ebank_backend.dtos.CustomerDTO;
import org.sid.ebank_backend.dtos.SavingBankAccountDTO;
import org.sid.ebank_backend.entities.*;
import org.sid.ebank_backend.enums.AccountStatus;
import org.sid.ebank_backend.enums.OperationType;
import org.sid.ebank_backend.exceptions.customerNotFoundException;
import org.sid.ebank_backend.repositories.AccountOperationRepository;
import org.sid.ebank_backend.repositories.BankAccountRepository;
import org.sid.ebank_backend.repositories.CustomerRepository;
import org.sid.ebank_backend.services.BankAccountService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Stream;

@SpringBootApplication
public class EbankBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(EbankBackendApplication.class, args);

	}
	@Bean
	CommandLineRunner commandLineRunner(BankAccountService bankAccountService ){
		return args ->{
			Stream.of("Hassan" , "Yassin" , "Aicha").forEach(name-> {
				CustomerDTO customer = new CustomerDTO();
				customer.setName(name);
				customer.setEmail(name + "@gmail.com");
				bankAccountService.saveCustomer(customer);
			});
			bankAccountService.listCustomer().forEach(customer -> {
                try {
                    bankAccountService.saveCurrentBankAccount(Math.random()*9000,9000, customer.getId());
					bankAccountService.saveSavingBankAccount(Math.random()*12000,5.5, customer.getId());
					//bankAccountService.bankAccountList();



                } catch (customerNotFoundException e) {
                    e.printStackTrace();
                }
//				catch (BankAccountNotFoundException | BalanceNotSufficientException e) {
//                    throw new RuntimeException(e);
//				}
            });
			List<BankAccountDTO> bankAccounts = bankAccountService.bankAccountList();
			for (BankAccountDTO bankAccount :bankAccounts){
				for (int i = 0 ; i <10 ; i++){
					String accountId;
					if(bankAccount instanceof SavingBankAccountDTO){
						accountId = ((SavingBankAccountDTO) bankAccount).getId();
					}
					else {
						accountId = ((CurrentBankAccountDTO) bankAccount).getId();
					}
					bankAccountService.credit(accountId,10000+Math.random()*12000,"Credit");
					bankAccountService.debit(accountId,1000+Math.random()*9000,"Debit");
				}
			}
		};
	}

	//@Bean
	CommandLineRunner start(CustomerRepository custumerRepository ,
							BankAccountRepository bankAccountRepository ,
							AccountOperationRepository accountOperationRepository){
		return  args -> {

			Stream.of("Hassan" , "Yassin" , "Aicha").forEach(name->{
				Customer customer = new Customer();
				customer.setName(name);
				customer.setEmail(name + "@gmail.com");
				custumerRepository.save(customer);
			});
			 custumerRepository.findAll().forEach(customer -> {
				 CurrentAccount currentAccount = new CurrentAccount();
				 currentAccount.setId(UUID.randomUUID().toString());
				 currentAccount.setBalance(Math.random()*9000);
				 currentAccount.setCreateAt(new Date());
				 currentAccount.setStatus(AccountStatus.CREATED);
				 currentAccount.setCustomer(customer);
				 currentAccount.setOverDraft(9000);
				 bankAccountRepository.save(currentAccount);
			 });

			custumerRepository.findAll().forEach(customer -> {
				SavingAccount savingAccount = new SavingAccount();
				savingAccount.setId(UUID.randomUUID().toString());
				savingAccount.setBalance(Math.random()*9000);
				savingAccount.setCreateAt(new Date());
				savingAccount.setStatus(AccountStatus.CREATED);
				savingAccount.setCustomer(customer);
				savingAccount.setInterestRate(5.5);
				bankAccountRepository.save(savingAccount);
			});

			bankAccountRepository.findAll().forEach(acc->{
				AccountOperation accountOperation = new AccountOperation();
				accountOperation.setOperationDate(new Date());
				accountOperation.setAmount(Math.random()*12000);
				accountOperation.setType(Math.random()>0.5 ? OperationType.DEBIT:OperationType.CREDIT);
				accountOperation.setBankAccount(acc);
				accountOperationRepository.save(accountOperation);
			});
		};
	}
}



