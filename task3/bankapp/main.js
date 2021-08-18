//global vars
const yargs = require('yargs');
//get bank module
const bank = require('./bankData/users');

//main function
yargs.command({
    command: 'createUser',
    describe: 'Create a new user',
    builder: {
        name: { demandOption:true, type:"string"},
        password: { demandOption:true, type:"string"},
        email: { demandOption:true, type:"string"},
        balance: { demandOption:true, type:"number"}
            },
    handler: function(argv) { bank.addUser(argv) }
});


yargs.command({
    command: 'deleteUser',
    describe: 'Delete User',
    builder: {
        email: { demandOption:true, type:"string"},
        password: { demandOption:true, type:"string"}
            },
    handler: function(argv) { bank.deleteUser(argv) }
});

yargs.command({
    command: 'setUserStatus',
    describe: 'change user status from active to disaled or vice versa',
    builder: {
        email: { demandOption:true, type:"string"},
        password: { demandOption:true, type:"string"}
            },
    handler: function(argv) { bank.setUserStatus(argv) }
});

yargs.command({
    command: 'deposit',
    describe: 'deposit money within the accepted range',
    builder: {
        email: { demandOption:true, type:"string"},
        password: { demandOption:true, type:"string"},
        amount: { demandOption:true, type:"number"}
        },
    handler: function(argv) { bank.deposit(argv) }
});

yargs.command({
    command: 'withdraw',
    describe: 'withdraw money within the accepted range',
    builder: {
        email: { demandOption:true, type:"string"},
        password: { demandOption:true, type:"string"},
        amount: { demandOption:true, type:"number"}
        },
    handler: function(argv) { bank.withdraw(argv) }
});

yargs.argv