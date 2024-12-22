// Your code here

   // Function to create an employee record
function createEmployeeRecord(employeeArray) {
    return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Function to create multiple employee records
function createEmployeeRecords(employeeArrays) {
    return employeeArrays.map(createEmployeeRecord);
}

// Function to create a TimeIn event
function createTimeInEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });
    return employee;
}

// Function to create a TimeOut event
function createTimeOutEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });
    return employee;
}

// Function to calculate hours worked on a specific date
function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
}

// Function to calculate wages earned on a specific date
function wagesEarnedOnDate(employee, date) {
    const hours = hoursWorkedOnDate(employee, date);
    return hours * employee.payPerHour;
}

// Function to calculate all wages for an employee
function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(event => event.date);
    return datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
}

// Function to calculate payroll for all employees
function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, employee) => total + allWagesFor(employee), 0);
}

// Example Usage
const employees = [
    ["John", "Doe", "Developer", 50],
    ["Jane", "Smith", "Manager", 60]
];

const employeeRecords = createEmployeeRecords(employees);

// Add time events
createTimeInEvent(employeeRecords[0], "2024-12-22 0900");
createTimeOutEvent(employeeRecords[0], "2024-12-22 1700");

createTimeInEvent(employeeRecords[1], "2024-12-22 1000");
createTimeOutEvent(employeeRecords[1], "2024-12-22 1800");

// Payroll calculations
console.log(hoursWorkedOnDate(employeeRecords[0], "2024-12-22")); // 8
console.log(wagesEarnedOnDate(employeeRecords[0], "2024-12-22")); // 400
console.log(allWagesFor(employeeRecords[1])); // 480
console.log(calculatePayroll(employeeRecords)); // 880
