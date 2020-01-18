let template = require("html-template")
let fs = require("fs")

module.exports = function (allMembers) {

    var html = template();
    var employees = html.template("employee", {include: false});

    fs.createReadStream(__dirname + "/../templates/test.html")
        .pipe(html)
        .pipe(fs.createWriteStream(__dirname + "/../output/team.html"))

    allMembers.forEach(teamMember => employees.write({

        '[key=role]': teamMember.getRole(),
        '[key=name]': teamMember.getName(),
        '[key=id]': teamMember.getId(),
        '[key=email]': teamMember.getEmail(),
        '[key=spec-name]': teamMember.getSpec().name,
        '[key=spec]': teamMember.getSpec().value
    }))

    employees.end();

}
