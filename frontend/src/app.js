const API_URL = "http://localhost:4321/employees";

// Fetch all employees
async function fetchEmployees() {
  try {
    const response = await fetch(API_URL);
    const employees = await response.json();
    const employeeList = document.getElementById("employee-list");
    employeeList.innerHTML = "";

    employees.forEach((employee) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${employee.id}</td>
        <td>${employee.firstname}</td>
        <td>${employee.lastname}</td>
        <td>${employee.age}</td>
        <td>${employee.isMarried ? "Yes" : "No"}</td>
        <td>
          <button onclick="deleteEmployee('${employee.id}')">Delete</button>
          <button onclick="populateForm('${employee.id}')">Edit</button>
        </td>
      `;
      employeeList.appendChild(row);
    });
  } catch (error) {
    console.error("Failed to fetch employees:", error);
  }
}

// Add or update an employee
document.getElementById("employee-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("employee-id").value.trim();
  const firstname = document.getElementById("employee-firstname").value.trim();
  const lastname = document.getElementById("employee-lastname").value.trim();
  const age = document.getElementById("employee-age").value.trim();
  const isMarried = document.getElementById("employee-isMarried").checked;

  const method = id ? "PUT" : "POST";
  const url = id ? `${API_URL}/${id}` : API_URL;

  try {
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstname, lastname, age, isMarried }),
    });
    fetchEmployees();
    document.getElementById("employee-form").reset();
  } catch (error) {
    console.error("Failed to save employee:", error);
  }
});

// Delete an employee
async function deleteEmployee(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchEmployees();
  } catch (error) {
    console.error("Failed to delete employee:", error);
  }
}

// Populate the form for editing
async function populateForm(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const employee = await response.json();

    document.getElementById("employee-id").value = employee.id;
    document.getElementById("employee-firstname").value = employee.firstname;
    document.getElementById("employee-lastname").value = employee.lastname;
    document.getElementById("employee-age").value = employee.age;
    document.getElementById("employee-isMarried").checked = employee.isMarried;
  } catch (error) {
    console.error("Failed to populate form:", error);
  }
}

// Search employees by firstname
document.getElementById("search-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const firstname = document.getElementById("search-firstname").value.trim();

  try {
    const response = await fetch(`${API_URL}/search?firstname=${firstname}`);
    const employees = await response.json();
    const employeeList = document.getElementById("employee-list");
    employeeList.innerHTML = "";

    employees.forEach((employee) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${employee.id}</td>
        <td>${employee.firstname}</td>
        <td>${employee.lastname}</td>
        <td>${employee.age}</td>
        <td>${employee.isMarried ? "yes" : "no"}</td>
        <td>
          <button onclick="deleteEmployee('${employee.id}')">Delete</button>
          <button onclick="populateForm('${employee.id}')">Edit</button>
        </td>
      `;
      employeeList.appendChild(row);
    });
  } catch (error) {
    console.error("Failed to search employees:", error);
  }
});

fetchEmployees();



