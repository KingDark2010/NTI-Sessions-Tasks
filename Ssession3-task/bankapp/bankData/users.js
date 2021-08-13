const fs = require('fs');

class Bank {
    bankData = null;

    readData(){
        try{
            this.bankData = JSON.parse(fs.readFileSync('./bankData/data.json', 'utf8'));
            if(!Array.isArray(this.bankData)){
                throw new Error('Data is not of right type');
            }
        }
        catch(e){
            this.bankData = [];
        }
    }

    writeData(){
        fs.writeFileSync('./bankData/data.json', JSON.stringify(this.bankData));
    }
    //make sure that the user is not already in the bank
    checkUser(user){
        this.readData();
        for(let i = 0; i < this.bankData.length; i++){
            if(this.bankData[i].email.toLowerCase().trim() === user.email.toLowerCase().trim() && this.bankData[i].password.trim() === user.password.trim()){
                return false;
            }
        }
        return true;
    }
    addUser(user){
        let task = {
            id: new Date().getTime(),
            username: user.name,
            password: user.password,
            email: user.email,
            userstatus: false,
            balance: user.balance
        };
        this.readData();
        if(this.checkUser(user) == true){
            this.bankData.push(task);
            this.writeData();
            console.log('User added');
            console.log(`username => ${task.username}
            email => ${task.email}
            balance => ${task.balance}`)
        }else{
            console.log('User already exists');
        }
    }
    
    deleteUser(user){
        let deletable = false;
        this.readData();
        for(let i = 0; i < this.bankData.length; i++){
            if(this.bankData[i].email.toLowerCase().trim() === user.email.toLowerCase().trim() && this.bankData[i].password.trim() === user.password.trim()){
                this.bankData.splice(i, 1);
                this.writeData();
                deletable = true;
                console.log('User deleted');
            }
        }
        if(deletable == false){
            console.log('User not found');
        }
    }
    setUserStatus(user){
        this.readData();
        for(let i = 0; i < this.bankData.length; i++){
            if(this.bankData[i].email.toLowerCase().trim() === user.email.toLowerCase().trim() && this.bankData[i].password.trim() === user.password.trim()){
                if(bankData[i].userstatus == false){
                    this.bankData[i].userstatus = true;
                    console.log('User status set to disabled');
                }else{
                    this.bankData[i].userstatus = false;
                    console.log('User status set to enabled');
                }
                this.writeData();
                console.log('User status changed');
            }
        }
    }
    isDisabled(user){
        this.readData();
        for(let i = 0; i < this.bankData.length; i++){
            if(this.bankData[i].email.toLowerCase().trim() === user.email.toLowerCase().trim() && this.bankData[i].password.trim() === user.password.trim()){
                if(this.bankData[i].userstatus == true){
                    return true;
                }else{
                    return false;
                }
            }
        }
    }

    deposit(user){
        this.readData();
        if(this.isDisabled(user) == false){
            for(let i = 0; i < this.bankData.length; i++){
                if(this.bankData[i].email.toLowerCase().trim() === user.email.toLowerCase().trim() && this.bankData[i].password.trim() === user.password.trim()){
                    if(user.deposit <= 10000){
                        this.bankData[i].balance += user.deposit;
                        this.writeData();
                        console.log('Deposit successful');
                        console.log(`balance => ${this.bankData[i].balance}`);
                    }else{
                        console.log('Deposit amount is more than 10000');
                    }
                }
            }
        }else{
            console.log('User is disabled');
        }
    }
    withdraw (user){
        this.readData();
        if(this.isDisabled(user) == false){
            for(let i = 0; i < this.bankData.length; i++){
                if(this.bankData[i].email.toLowerCase().trim() === user.email.toLowerCase().trim() && this.bankData[i].password.trim() === user.password.trim()){
                    if(this.bankData[i].balance > user.withdraw){
                        if(this.withdraw >= 5000){
                            this.bankData[i].balance -= user.withdraw;
                            this.writeData();
                            console.log('Withdraw successful');
                            console.log(`balance => ${this.bankData[i].balance}`);
                        }else{
                            console.log('Withdraw amount can not be more than 5000');
                        }
                    }else{
                        console.log('Withdraw amount is more than balance');
                    }
                }
            }
        }else{
            console.log('User is disabled');
        }
    }
}

let bank = new Bank();
module.exports = bank;