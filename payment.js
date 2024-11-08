    // Function to update payroll dropdown based on local storage data
    function updatePayrollDropdown() {
        const employeeSelect = document.getElementById('employee-select');
        employeeSelect.innerHTML = '';  // Clear existing options
        
        const employees = JSON.parse(localStorage.getItem('employees')) || [];
        employees.forEach((emp, index) => {
            const option = document.createElement('option');
            option.value = index;  // Use index as value for easy retrieval
            option.textContent = emp.name;  // Display name in dropdown
            employeeSelect.appendChild(option);
        });
    }
    
    // Function to load payment history from local storage
    function loadPaymentHistory() {
        const tbody = document.getElementById('payroll-history').querySelector('tbody');
        tbody.innerHTML = '';  // Clear existing rows
        
        const payments = JSON.parse(localStorage.getItem('payments')) || [];
        payments.forEach(payment => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${payment.date}</td><td>${payment.employeeName}</td><td>${payment.amountPaid.toFixed(2)}</td>`;
            tbody.appendChild(row);
        });
    }
    
    // Handle form submission for payroll processing
    document.getElementById('payroll-form').addEventListener('submit', function(event) {
        event.preventDefault();
    
        const date = document.getElementById('payroll-date').value;
        const employeeIndex = document.getElementById('employee-select').value;
        const salaryAmount = parseFloat(document.getElementById('salary-amount').value);
    
        // Calculate tax and net amount
        const taxRate = 0.05; // 5% tax
        const taxAmount = salaryAmount * taxRate;
        const netAmount = salaryAmount - taxAmount;
    
        // Find employee name by index
        const employees = JSON.parse(localStorage.getItem('employees')) || [];
        const employeeName = employees[employeeIndex].name;
    
        // Add entry to payment history in local storage
        const payments = JSON.parse(localStorage.getItem('payments')) || [];
        payments.push({ date, employeeName, amountPaid: netAmount });
        localStorage.setItem('payments', JSON.stringify(payments));
    
        // Add entry to payroll history table
        const tbody = document.getElementById('payroll-history').querySelector('tbody');
        const row = document.createElement('tr');
        
        row.innerHTML = `<td>${date}</td><td>${employeeName}</td><td>${netAmount.toFixed(2)}</td>`;
        
        tbody.appendChild(row);
    
        // Clear form fields
        this.reset();
    });
    
    // Load dropdown and payment history when the page is loaded
    updatePayrollDropdown();
    loadPaymentHistory();