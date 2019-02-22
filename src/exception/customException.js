'use strict';

class CustomError extends Error {
    constructor(message, type){
        super(message);
        this._type = type;
    }
    get type(){
        return this._type;
    }
}

module.exports = CustomError;