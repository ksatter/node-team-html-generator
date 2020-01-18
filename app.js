let inquirer = require("inquirer")
let render = require("./lib/render")

let Manager = require("./lib/Manager");
let Engineer = require("./lib/Engineer");
let Intern = require("./lib/Intern");

let manager;
let engineers = [];
let interns = [];

console.log(
    `   -------------------------------------
    
      Welcome to the team page generator!
    
      Please add your team's Manager. 
    
    -------------------------------------`
)

const promptNext = () => {

    console.log(
        `   -------------------------------------
        
          Your Team:
        
          Manager: 

            ${manager.name}

          Engineer${engineers.length > 1 ? "s" : ""}:

            ${!engineers.length ? "" : engineers.map(engineer => engineer.name).join("\n            ")}
          
          Intern${interns.length > 1 ? "s" : ""}:

            ${!interns.length ? "" : interns.map(intern => intern.name).join("\n            ")}
    -------------------------------------`
    )

    inquirer.prompt({
        type: "list",
        message: "The next team member is a: ",
        choices: ["Engineer", "Intern", new inquirer.Separator(), "Exit"],
        name: "role"
    }).then(answer => {

        if (answer.role === "Exit") {
            
            if (engineers.length || interns.length) render([manager, ...engineers, ...interns]) 
            else {
                console.log(
                    `   -------------------------------------
    
      Your Manager does not have a team!
    
      Please add at least one team member. 
      `
                
                )
                promptNext()
            }
        }
        else teamMemberPrompt(answer.role)
    
    })

}

const teamMemberPrompt = role  => {
    
    let specialPrompt = role === "Manager" ? "Office Number" : role === "Engineer" ?  "Gitub User Name" : "School"
    
    
    
    inquirer.prompt([
        {
            message: `${role}'s Name:`,
            type: "input",
            validate: input => input !== "" || "All fields are required" ,
            name: "name"
        }, {
            message: `${role}'s Employee ID:`,
            type: "input",
            validate: input => input !== "" || "All fields are required" ,
            name: "id"
        },{
            message: `${role}'s Email:`,
            type: "input",
            validate: input => input !== "" || "All fields are required" ,
            name: "email"
        },{
            message: `${role}'s ${specialPrompt}:`,
            type: "input",
            validate: input => input !== ""  || "All fields are required" ,
            name: "special"
        }
    ]).then(employee => {

        switch (role) {
            case "Manager":
                manager = new Manager (employee.name, employee.id,  employee.email, employee.special);
                break
            case "Engineer":
                engineers.push(new Engineer (employee.name, employee.id,  employee.email, employee.special));
                break
            case "Intern":
                interns.push(new Intern (employee.name, employee.id,  employee.email, employee.special));
                break
        }

        promptNext()
    })
}



teamMemberPrompt("Manager")

