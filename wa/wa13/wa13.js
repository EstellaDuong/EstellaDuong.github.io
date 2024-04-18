function printProblem(num, object){
    console.log(`Problem ${num}: `, JSON.parse(JSON.stringify(object)));
}


// Problem 1 - create JSON for each employee
const employees = [
    {
        firstName:"Sam", 
        department:"Tech", 
        designation:"Manager", 
        salary: 40000, 
        raiseEligible:true 
    },
    {
        firstName:"Mary", 
        department:"Finance", 
        designation:"Trainee", 
        salary: 18500, 
        raiseEligible: true 
    },
    {
        firstName:"Bill", 
        department:"HR", 
        designation:"Executive", 
        salary: 21200, 
        raiseEligible: false 
    }
]
printProblem(1, employees);

// Problem 2 - create JSON for the company
const company = {
        companyName: "Tech Star",
        website: "www.techstars.site",
        employees: employees,
    }
printProblem(2, company);

// Problem 3 - A new employee has joined 
const newEmployee = {
    firstName:"Anna", 
    department:"Tech", 
    designation:"Executive", 
    salary: 25600, 
    raiseEligible:false 
}
company.employees.push(newEmployee);
// printProblem(3, employees);
printProblem(3, company);

// Problem 4 - calculate the total salary for all company employees
let totalSalary = 0;
for(const employee of employees){
    totalSalary += employee["salary"]; 
}
printProblem(4, totalSalary);

// Problem 5 - Update salary for eligible employees
for(const employee of employees){
    if(employee.raiseEligible){
        employee.salary *=  1.1;
        employee.raiseEligible = false;
    }
}
printProblem(5, employees);

// Problem 6 - 
const workingFromHome = ["Anna", "Sam"];
for(const employee of employees){
    employee.wfh = false; 
    for(const i of workingFromHome)
    {
        if(employee.firstName === i){
            employee.wfh = true; 
        }
    }
}
printProblem(6, employees);