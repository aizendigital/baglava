'use strict';


const EventEmitter = require('events').EventEmitter;

class Mysql2Interface extends EventEmitter {

    constructor() {
        super();
        this.query = new Promise(function (resolve, reject) {
            resolve('1');
        });
        // this.query = () => {

        // }
        
    }


    getConnection() {

    }

    // query(sql, args) {
    //     return new Promise();
    // }

    execute(sql, values) {

    }

    end() {

    }
}


module.exports = Mysql2Interface;