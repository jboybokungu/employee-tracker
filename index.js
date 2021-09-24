const inquirer = require("inquirer");
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employee_db"
})

connection.connect(err => {
    if (err) throw err;
    mainMenu()
})

function mainMenu() {
    inquirer.prompt([
        {
            message: "What would you like to do?",
            name: "choice",
            type: "list",
            choices: ["View All Departments", "Add Departments", "View All Roles", "Add Role", "View All Employees", "Add Employee", "Update an employee role"]
        }
    ]).then(({ choice }) => {
        if (choice == "View All Departments") {
            viewDepartment()
        } else if (choice == "Add Departments") {
            addDepartment()
        } else if (choice == "View All Roles") {
            viewRole()
        } else if (choice == "Add Role") {
            addRole()
        } else if (choice == "View All Employees") {
            viewEmployee()
        } else if (choice == "Add Employee") {
            addEmployee()
        } else if (choice == "Update an employee role") {
            updateRole()
        }
    })
}

function viewDepartment() {
    const sqlString = `
    SELECT *
    FROM department`

    connection.query(sqlString, (err, data) => {
        if (err) throw err;
        console.log('\n')
        console.table(data)
        console.log('\n')

        mainMenu()
    })
}

function addDepartment() {
    inquirer.prompt([
        {
            message: "What is the new Department name?",
            name: "newDepartment",
            type: "input"
        }
    ]).then(({ newDepartment }) => {
        const sqlString = `
        INSERT INTO department (name)
        VALUES (?)`

        connection.query(sqlString, [newDepartment], (err, data) => {
            if (err) throw err;

            console.log("added a new department")
            // console.log(data);

            mainMenu()
        })
    })
}

function viewRole() {
    const sqlString = `
    SELECT *
    FROM role`

    connection.query(sqlString, (err, data) => {
        if (err) throw err;
        console.log('\n')
        console.table(data)
        console.log('\n')

        mainMenu()
    })
}

function addRole() {
    connection.query(`SELECT * FROM department`, function (err, data) {
        if (err) return console.log(err);

        inquirer.prompt([
            {
                message: "What is the new role?",
                name: "newRole",
                type: "input"
            },
            {
                type: "number",
                message: "What is the salary for the new role?",
                name: "newSalary"
            },
            {
                type: "list",
                message: "What department does the role belong to?",
                name: "newDpt",
                choices: data.map(department =>
                ({
                    name: department.name,
                    value: department.id
                })
                )
            }

        ]).then((response) => {
            const sqlString = `
        INSERT INTO role (title, salary, department_id)
        VALUES (?, ?, ?)`

            connection.query(sqlString, [response.newRole, response.newSalary, response.newDpt],
                function (err) {
                    if (err) throw err;

                    //console.log("added a new role")
                    //console.log(newSalary);

                    mainMenu()
                })
        })
    });
}

function viewEmployee() {
    const sqlString = `
    SELECT *
    FROM employee`

    connection.query(sqlString, (err, data) => {
        if (err) throw err;
        console.log('\n')
        console.table(data)
        console.log('\n')

        mainMenu()
    })
}

function addEmployee() {

    connection.query(`SELECT * FROM employee`, function (err, employeeData) {


        connection.query(`SELECT * FROM role`, function (err, data) {
            if (err) return console.log(err);
            inquirer.prompt([
                {
                    message: "What is the first name of the new employee?",
                    name: "firstName",
                    type: "input"
                },
                {
                    type: "input",
                    message: "What is the last name of the new employee?",
                    name: "lastName"
                },
                {
                    type: "rawlist",
                    message: "What is the role of the new employee?",
                    name: "newRole",
                    choices: data.map(role =>
                    ({
                        name: role.title,
                        value: role.id
                    })
                    )
                },

                {
                    type: 'rawlist',
                    message: 'Who is your manager?',
                    name: 'newManager',
                    choices: employeeData.map(employee =>
                    ({
                        name: employee.first_name + ' ' + employee.last_name,
                        value: employee.id
                    })


                    )
                }

            ]).then((response) => {
                const sqlString = `
        INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES (?, ?, ?, ?)`

                connection.query(sqlString, [response.firstName, response.lastName, response.newRole, response.newManager],
                    function (err) {
                        if (err) throw err;

                        //console.log("added a new role")
                        //console.log(newSalary);

                        mainMenu()
                    })
            })
        });
    });
}

// function updateRole() {

//     connection.query(`SELECT * FROM employee`, function (err, employeeData) {

//         connection.query(`SELECT * FROM role`, function (err, data) {

//             if (err) return console.log(err);
//             inquirer.prompt([
//                 {
//                     type: 'list',
//                     message: 'What employee do you want to update?',
//                     name: 'updatedEmployee',
//                     choices: employeeData.map(employee =>
//                     ({
//                         name: employee.first_name + ' ' + employee.last_name,
//                         value: employee.id
//                     })
//                     ),
//                 },
//                 {
//                     input: 'rawlist',
//                     message: 'What is the new role of the employee?',
//                     name: 'employeeRole',
//                     choices: data.map(role =>
//                     ({
//                         name: role.title,
//                         value: role.id
//                     })
//                     ),

//                 }
//             ]).then((response) => {
//                 connection.query(`
//             UPDATE employee
//             SET role_id = ?
//             WHERE id = ?`, [response.employeeRole, response.updatedEmployee],
//                     function (err) {
//                         if (err) return console.log(err);
//                         console.log(`Updated Employee's Role`);
//                         mainMenu();
//                     })
//             })
//         })
//     })
// }
