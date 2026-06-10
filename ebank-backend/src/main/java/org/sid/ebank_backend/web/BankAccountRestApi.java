package org.sid.ebank_backend.web;

import org.sid.ebank_backend.dtos.*;
import org.sid.ebank_backend.exceptions.BalanceNotSufficientException;
import org.sid.ebank_backend.exceptions.BankAccountNotFoundException;
import org.sid.ebank_backend.services.BankAccountService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class BankAccountRestApi {

    private BankAccountService bankAccountService;

    public BankAccountRestApi(BankAccountService bankAccountService) {
        this.bankAccountService = bankAccountService;
    }

    @GetMapping("/accounts/{accountId}")
    public BankAccountDTO getBankAccount(@PathVariable String accountId) throws BankAccountNotFoundException {
        return bankAccountService.getBankAccount(accountId);
    }

    @GetMapping("/accounts")
    public List<BankAccountDTO> listAccounts(){
        return bankAccountService.bankAccountList();
    }

    @GetMapping("/accounts/{accountId}/operations")
    public  List<AccountOperationDTO> getHistory( @PathVariable  String accountId){
        return  bankAccountService.accountHistory(accountId);
    }

    @GetMapping("/accounts/{accountId}/pageoperations")
    public AccountHistoryDTO getAccountHistory(@PathVariable  String accountId,
                                               @RequestParam(name="page",defaultValue = "0") int page,
                                               @RequestParam(name="size",defaultValue = "5") int size) throws BankAccountNotFoundException {
          return  bankAccountService.getAccountHistory(accountId,page,size);
    }

    @PostMapping("/accounts/debit")
    public DebitDTO debit (@RequestBody DebitDTO debitDTO) throws BankAccountNotFoundException, BalanceNotSufficientException {
        this.bankAccountService.debit(debitDTO.getAccountId(),debitDTO.getAmount(),debitDTO.getDescription());
        return  debitDTO;
    }

    @PostMapping("/accounts/credit")
    public CreditDTO creditt (@RequestBody CreditDTO creditDTO) throws BankAccountNotFoundException, BalanceNotSufficientException {
        this.bankAccountService.debit(creditDTO.getAccountId(),creditDTO.getAmount(),creditDTO.getDescription());
        return  creditDTO;
    }

    @PostMapping("/accounts/transfer")
    public void transfer(@RequestBody TransferRequestDTO transferRequestDTO) throws BankAccountNotFoundException, BalanceNotSufficientException {
        this.bankAccountService.transfer(transferRequestDTO.getAccountSource(),
                transferRequestDTO.getAccountDestination(),
                transferRequestDTO.getAmount());
    }
}
