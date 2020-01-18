var Employee = require("./Employee")


class Manager extends Employee {

    constructor(name, id, email, officeNumber) {

        super(name, id, email);
        
        this.officeNumber = officeNumber;
    
    }

    getRole () { return "Manager"};
    getOfficeNumber () { return this.officeNumber }
    getSpec() { return {name: "Office Number", value: this.getOfficeNumber()}}
}

module.exports =  Manager;
