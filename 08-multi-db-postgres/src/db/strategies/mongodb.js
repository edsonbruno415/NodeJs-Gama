const ICrud = require('./interfaces/interfaceCrud');

class MongoDB extends ICrud {
    constructor(){
        super();
    }

    create(item){
        console.log('item foi salvo em mongo db');
    }
}

module.exports = MongoDB;