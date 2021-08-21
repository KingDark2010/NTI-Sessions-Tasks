const fs = require('fs');


class Bank {
    bankData = [];
    readData(){
        try{
            this.bankData = JSON.parse(fs.readFileSync('src/models/data.json').toString());
            if(!Array.isArray(this.bankData)){
                throw new Error('Data is not of right type');
            }
        }
        catch(e){
            this.bankData = [];
            console.log(this.bankData);
        }
    }

    writeData(){
        fs.writeFileSync('src/models/data.json', JSON.stringify(this.bankData));
    }

    isRegistered(userEmail){
        this.readData();
        for(let i=0; i<this.bankData.length; i++){
            if(this.bankData[i].email.toLowerCase().trim() === userEmail.toLowerCase().trim()){
                return {status: true, index: i};
            }
        }
        return false;
    }

    getAllCustomers(){
        this.readData();
        return this.bankData;
    }

    addUser(userName, userPassword, userEmail,  userBalance){
        let task = {
            id: new Date().getTime(),
            name: userName,
            email: userEmail,
            password: userPassword,
            userstatus: false,
            balance: userBalance
        };
        this.readData();
        // check if userEmail already exists
        if(this.isRegistered(userEmail) == false){
            this.bankData.push(task);
            this.writeData();
            console.log('User added');
        }else{
            console.log('User already exists');
        }
    }
    
    deleteUser(userEmail){
        this.readData();
        let myIndex = this.isRegistered(userEmail);
        console.log(myIndex);
        if(myIndex != false){
            this.bankData.splice(myIndex.index, 1);
            this.writeData();
        }
    }
    setUserStatus(userEmail){
        this.readData();
        let myIndex = this.isRegistered(userEmail);
        if(myIndex){
            if(this.bankData[myIndex.index].userstatus == true){
                this.bankData[myIndex.index].userstatus = false;
            }else{
                this.bankData[myIndex.index].userstatus = true;
            }
            this.writeData();
        }
    }

    deposit(userEmail, amount){
        this.readData();
        let myIndex = this.isRegistered(userEmail);
        if(myIndex){
            if(this.bankData[myIndex.index].userstatus == true){
                if(amount <= 10000){
                    this.bankData[myIndex.index].balance += amount;
                    this.writeData();
                }
            }
        }
    }
    
    withdraw(userEmail, amount){
        this.readData();
        let myIndex = this.isRegistered(userEmail);
        if(myIndex){
            if(this.bankData[myIndex.index].userstatus == true){
                if(amount <= this.bankData[myIndex.index].balance && amount <= 5000){
                    this.bankData[myIndex.index].balance -= amount;
                    this.writeData();
                }
            }
        }
    }
}

let bank = new Bank();
module.exports = bank;