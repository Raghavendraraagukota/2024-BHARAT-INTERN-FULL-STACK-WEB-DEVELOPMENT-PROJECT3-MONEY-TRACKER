let step = 1;
let expenditureCount = 1;
let myPieChart;

function addExpenditureFields() {
    const expenditureFields = document.getElementById('expenditureFields');

    if (expenditureCount <= 15) {
        expenditureFields.innerHTML += `
            <div>
                <label for="category${expenditureCount}">Category:</label>
                <input type="text" id="category${expenditureCount}" required>

                <label for="cost${expenditureCount}">Cost:</label>
                <input type="number" id="cost${expenditureCount}" required>
            </div>
        `;
        expenditureCount++;
    } else {
        alert('You can only add up to 15 categories and costs.');
    }
}

function nextStep() {
    if (step === 1) {
        const income = document.getElementById('income').value;

        if (!income) {
            alert('Please enter income before proceeding.');
            return;
        }

        // Call addExpenditureFields to generate the fields
        for (let i = 0; i < 15; i++) {
            addExpenditureFields();
        }

        step++;
    } else {
        alert('You have already moved to the next step.');
    }
}

async function generateReport() {
    if (step === 1) {
        alert('Please complete the steps before generating the report.');
        return;
    }

    const income = document.getElementById('income').value;

    const categories = [];
    for (let i = 1; i < expenditureCount; i++) {
        const category = document.getElementById(`category${i}`).value;
        const cost = document.getElementById(`cost${i}`).value;
        categories.push({ category, cost });
    }

    await new Promise(resolve => setTimeout(resolve, 1000));

    const reportElement = document.getElementById('report');
    reportElement.innerHTML = `
        <h2>Expense Report</h2>
        <p>Income: $${income}</p>
        <table>
            <tr>
                <th>Category</th>
                <th>Cost</th>
            </tr>
            ${categories.map(category => `<tr><td>${category.category}</td><td>$${category.cost}</td></tr>`).join('')}
        </table>
    `;

    generatePieChart(categories);
}

function generatePieChart(categories) {
    const labels = categories.map(category => category.category);
    const data = categories.map(category => category.cost);

    if (myPieChart) {
        myPieChart.destroy();
    }

    const ctx = document.getElementById('pieChart').getContext('2d');
    myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#9966FF', '#FF9900'],
            }],
        },
    });
}
