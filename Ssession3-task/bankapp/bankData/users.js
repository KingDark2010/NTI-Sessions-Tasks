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

    addUser(user){
        let task = {
            id: new Date().getTime(),
            namee: user.name,
            email: user.email,
            accountType: user.accountType,
            statuss: false,
            balance: user.balance
        };
        this.readData();
        this.bankData.push(task);
        this.writeData();
        console.log('User added');
        console.log(`username => ${task.namee}
        email => ${task.email}
        accountType => ${task.accountType}
        status => ${task.statuss}
        balance => ${task.balance}`)
    }
}

let bank = new Bank();
module.exports = bank;