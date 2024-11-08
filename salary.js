// Function to load payment history from local storage and display it in the report section
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

// Load payment history when the page is loaded
loadPaymentHistory();