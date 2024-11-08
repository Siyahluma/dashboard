 // Get references to the form and tbody
 const form = document.getElementById('employee-form');
 const employeeList = document.getElementById('employee-list').querySelector('tbody');
 let currentEditIndex = null; // Track the index of the employee being edited
 
 // Load employees from localStorage
 function loadEmployees() {
     const employees = JSON.parse(localStorage.getItem('employees')) || [];
     employees.forEach((employee, index) => {
         addEmployeeRow(employee, index);
     });
 }
 
 // Add a new employee row to the table
 function addEmployeeRow(employee, index) {
     const newRow = employeeList.insertRow();
 
     newRow.insertCell(0).textContent = employee.name;
     newRow.insertCell(1).textContent = employee.email;
     newRow.insertCell(2).textContent = employee.jobTitle;
     newRow.insertCell(3).textContent = employee.salary;
     newRow.insertCell(4).textContent = employee.idNumber;
 
     // Create delete button
     const deleteCell = newRow.insertCell(5);
     const deleteButton = document.createElement('button');
     deleteButton.textContent = 'Delete';
     
     // Attach event listener to delete button
     deleteButton.addEventListener('click', function() {
         deleteEmployee(index);
     });
 
     deleteCell.appendChild(deleteButton);
 
     // Create update button
     const updateButton = document.createElement('button');
     updateButton.textContent = 'Update';
 
     // Attach event listener to update button
     updateButton.addEventListener('click', function() {
         editEmployee(index);
     });
 
     deleteCell.appendChild(updateButton);
 }
 
 // Add event listener for form submission
 form.addEventListener('submit', function(event) {
     event.preventDefault(); // Prevent default form submission
 
     // Get input values
     const name = document.getElementById('employee-name').value;
     const email = document.getElementById('employee-email').value;
     const jobTitle = document.getElementById('employee-job').value;
     const salary = document.getElementById('employee-salary').value;
     const idNumber = document.getElementById('employee-id-number').value;
 
     // Create an employee object
     const employee = { name, email, jobTitle, salary, idNumber };
 
     if (currentEditIndex !== null) {
         // Update existing employee
         const employees = JSON.parse(localStorage.getItem('employees')) || [];
         employees[currentEditIndex] = employee; // Update the employee data
         localStorage.setItem('employees', JSON.stringify(employees));
         
         currentEditIndex = null; // Clear edit index
         reloadEmployees();
         return;
     }
 
     // Save new employee to localStorage
     const employees = JSON.parse(localStorage.getItem('employees')) || [];
     employees.push(employee);
     localStorage.setItem('employees', JSON.stringify(employees));
 
     addEmployeeRow(employee, employees.length - 1);
     
     // Clear form fields
     form.reset();
     
     // Update payroll dropdown
     updatePayrollDropdown();
 });
 
 // Function to reload employees in the list and dropdown
 function reloadEmployees() {
     employeeList.innerHTML = '';
     loadEmployees();
     
     // Update payroll dropdown after reloading employees
     updatePayrollDropdown();
 }
 
 // Edit an employee's information
 function editEmployee(index) {
     const employees = JSON.parse(localStorage.getItem('employees')) || [];
     
     document.getElementById('employee-name').value = employees[index].name;
     document.getElementById('employee-email').value = employees[index].email;
     document.getElementById('employee-job').value = employees[index].jobTitle;
     document.getElementById('employee-salary').value = employees[index].salary;
     document.getElementById('employee-id-number').value = employees[index].idNumber;
 
     currentEditIndex = index; // Set the current edit index
 }
 
 // Delete an employee
 function deleteEmployee(index) {
     let employees = JSON.parse(localStorage.getItem('employees')) || [];
     
     employees.splice(index, 1); // Remove the employee from the array
     
     localStorage.setItem('employees', JSON.stringify(employees));
     
     reloadEmployees(); // Reload to reflect changes in both lists and dropdowns
 }
 
 // Load employees when the page is loaded
 loadEmployees();