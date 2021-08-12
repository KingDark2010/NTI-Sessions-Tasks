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
        email: { demandOption:true, type:"string"},
        accountType: { demandOption:true, type:"number"},
        balance: { demandOption:true, type:"number"}
            },
    handler: function(argv) { bank.addUser(argv) }
});


yargs.argv