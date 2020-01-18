var Employee = require("./Employee")

class Engineer extends Employee {

    constructor(name, id, email, github) {

        super(name, id, email);
        
        this.github = github;
    
    }

    getRole() { return "Engineer" };
    getGithub() { return this.github };
    getSpec() { return {name: "Github", value: this.getGithub()}}
}

module.exports = Engineer;
