const readline = require('readline');

class AccountSystem {
    constructor() {
        this.balance = 1000.00;
    }

    readBalance() {
        return this.balance;
    }

    writeBalance(newBalance) {
        this.balance = newBalance;
    }

    async viewBalance() {
        console.log(`Current balance: ${this.balance.toFixed(2)}`);
    }

    async creditAccount() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        return new Promise((resolve) => {
            rl.question('Enter credit amount: ', (amount) => {
                rl.close();
                const creditAmount = parseFloat(amount);
                if (!isNaN(creditAmount)) {
                    this.balance += creditAmount;
                    console.log(`Amount credited. New balance: ${this.balance.toFixed(2)}`);
                } else {
                    console.log('Invalid amount entered.');
                }
                resolve();
            });
        });
    }

    async debitAccount() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        return new Promise((resolve) => {
            rl.question('Enter debit amount: ', (amount) => {
                rl.close();
                const debitAmount = parseFloat(amount);
                if (!isNaN(debitAmount)) {
                    if (this.balance >= debitAmount) {
                        this.balance -= debitAmount;
                        console.log(`Amount debited. New balance: ${this.balance.toFixed(2)}`);
                    } else {
                        console.log('Insufficient funds for this debit.');
                    }
                } else {
                    console.log('Invalid amount entered.');
                }
                resolve();
            });
        });
    }

    async displayMenu() {
        console.log('--------------------------------');
        console.log('Account Management System');
        console.log('1. View Balance');
        console.log('2. Credit Account');
        console.log('3. Debit Account');
        console.log('4. Exit');
        console.log('--------------------------------');
    }

    async getUserChoice() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        return new Promise((resolve) => {
            rl.question('Enter your choice (1-4): ', (choice) => {
                rl.close();
                resolve(parseInt(choice));
            });
        });
    }

    async run() {
        let continueFlag = true;

        while (continueFlag) {
            await this.displayMenu();
            const choice = await this.getUserChoice();

            switch (choice) {
                case 1:
                    await this.viewBalance();
                    break;
                case 2:
                    await this.creditAccount();
                    break;
                case 3:
                    await this.debitAccount();
                    break;
                case 4:
                    continueFlag = false;
                    console.log('Exiting the program. Goodbye!');
                    break;
                default:
                    console.log('Invalid choice, please select 1-4.');
            }
        }
    }
}

// Run the application
const app = new AccountSystem();
app.run().catch(console.error);