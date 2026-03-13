# COBOL Student Account Management System - Test Plan

This test plan covers the business logic and functionality of the COBOL student account management system. It is designed to validate the system's behavior against business requirements and will be used as a foundation for creating unit and integration tests in the Node.js transformation.

## Test Cases

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status (Pass/Fail) | Comments |
|--------------|----------------------|----------------|------------|-----------------|----------------|-------------------|----------|
| TC001 | View Initial Account Balance | Application is started with default balance of $1000.00 | 1. Start the application<br>2. Select option 1 (View Balance) | Current balance displays as $1000.00 |  |  | Initial balance validation |
| TC002 | Credit Account with Positive Amount | Application is running with initial balance | 1. Select option 2 (Credit Account)<br>2. Enter credit amount: 500.00<br>3. Select option 1 to view balance | Balance increases by $500.00, displays $1500.00 |  |  | Test positive credit operation |
| TC003 | Debit Account with Sufficient Funds | Application has balance of $1500.00 (after TC002) | 1. Select option 3 (Debit Account)<br>2. Enter debit amount: 200.00<br>3. Select option 1 to view balance | Balance decreases by $200.00, displays $1300.00 |  |  | Test debit with sufficient funds |
| TC004 | Debit Account with Insufficient Funds | Application has balance of $1300.00 (after TC003) | 1. Select option 3 (Debit Account)<br>2. Enter debit amount: 2000.00 | Displays "Insufficient funds for this debit." message, balance remains $1300.00 |  |  | Test insufficient funds handling |
| TC005 | Multiple Credit Operations | Application has balance of $1300.00 | 1. Select option 2 (Credit Account)<br>2. Enter credit amount: 100.00<br>3. Select option 2 again<br>4. Enter credit amount: 50.00<br>5. Select option 1 to view balance | Balance increases by $150.00 total, displays $1450.00 |  |  | Test cumulative credit operations |
| TC006 | Multiple Debit Operations with Sufficient Funds | Application has balance of $1450.00 | 1. Select option 3 (Debit Account)<br>2. Enter debit amount: 100.00<br>3. Select option 3 again<br>4. Enter debit amount: 50.00<br>5. Select option 1 to view balance | Balance decreases by $150.00 total, displays $1300.00 |  |  | Test cumulative debit operations |
| TC007 | Zero Amount Credit | Application is running | 1. Select option 2 (Credit Account)<br>2. Enter credit amount: 0.00<br>3. Select option 1 to view balance | Balance remains unchanged |  |  | Test edge case: zero credit |
| TC008 | Zero Amount Debit | Application has positive balance | 1. Select option 3 (Debit Account)<br>2. Enter debit amount: 0.00<br>3. Select option 1 to view balance | Balance remains unchanged |  |  | Test edge case: zero debit |
| TC009 | Exact Balance Debit | Application has balance of $1300.00 | 1. Select option 3 (Debit Account)<br>2. Enter debit amount: 1300.00<br>3. Select option 1 to view balance | Balance becomes $0.00 |  |  | Test debiting exact remaining balance |
| TC010 | Invalid Menu Choice | Application is running | 1. Enter invalid choice: 5 | Displays "Invalid choice, please select 1-4." message, returns to menu |  |  | Test menu input validation |
| TC011 | Negative Amount Credit | Application is running | 1. Select option 2 (Credit Account)<br>2. Enter credit amount: -100.00<br>3. Select option 1 to view balance | Balance decreases by $100.00 (COBOL behavior with negative input) |  |  | Test negative input handling (COBOL may accept as-is) |
| TC012 | Negative Amount Debit | Application has positive balance | 1. Select option 3 (Debit Account)<br>2. Enter debit amount: -100.00<br>3. Select option 1 to view balance | Balance increases by $100.00 (COBOL behavior with negative input) |  |  | Test negative input handling |
| TC013 | Large Amount Credit | Application is running | 1. Select option 2 (Credit Account)<br>2. Enter credit amount: 999999.99<br>3. Select option 1 to view balance | Balance becomes very large (within COBOL PIC limits) |  |  | Test large number handling |
| TC014 | Application Exit | Application is running | 1. Select option 4 (Exit) | Displays "Exiting the program. Goodbye!" and terminates |  |  | Test proper application exit |
| TC015 | Balance Persistence Across Operations | Application maintains balance between operations | 1. Perform TC002<br>2. Perform TC003<br>3. Perform TC001 | Balance correctly reflects cumulative changes |  |  | Test data persistence in memory |

## Test Execution Notes

- **Environment**: COBOL application compiled with GnuCOBOL, run in terminal
- **Data Setup**: Start each test case with known initial state
- **Cleanup**: Reset application state between test cases if needed
- **Assumptions**: Input amounts are numeric; COBOL handles formatting as PIC 9(6)V99
- **Risks**: COBOL may accept invalid numeric inputs; no input validation for amounts

## Business Rules Validation

This test plan ensures the following business rules are met:
- Initial account balance is $1000.00
- Credit operations can add any positive amount to the balance
- Debit operations only succeed if sufficient funds are available
- Insufficient funds are properly rejected with appropriate messaging
- Balance is accurately maintained across multiple operations
- Menu-driven interface provides clear options and feedback