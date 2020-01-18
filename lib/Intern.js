var Employee = require("./Employee")


class Intern extends Employee {

    constructor(name, id, email, school) {

        super(name, id, email);
        
        this.school = school;
    
    }

    getRole() { return "Intern" };
    getSchool() { return this.school };
    getSpec() { return {name: "School", value: this.getSchool()}}

}

module.exports = Intern;
