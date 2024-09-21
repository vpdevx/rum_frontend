const apiUrl = 'https://api-cl.k8s.lab4ever.xyz'; // Replace with your API URL

document.getElementById('viewConsultations').addEventListener('click', loadConsultations);
document.getElementById('viewDoctors').addEventListener('click', loadDoctors);
document.getElementById('viewPatients').addEventListener('click', loadPatients);
document.getElementById('addPatient').addEventListener('click', showAddPatientForm);

// READ: Load all consultations
async function loadConsultations() {
    const response = await fetch(`${apiUrl}/consultas`);
    const data = await response.json();
    displayConsultations(data._embedded.consultas);
}

// READ: Load all doctors
async function loadDoctors() {
    const response = await fetch(`${apiUrl}/medicos`);
    const data = await response.json();
    displayDoctors(data._embedded.medicos);
}

// READ: Load all patients
async function loadPatients() {
    const response = await fetch(`${apiUrl}/pacientes`);
    const data = await response.json();
    displayPatients(data._embedded.pacientes);
}

// CREATE: Show add patient form
function showAddPatientForm() {
    const html = `
        <h2>Add New Patient</h2>
        <form id="addPatientForm">
            <label>Name:</label><input type="text" id="patientName" required><br>
            <label>CPF:</label><input type="text" id="patientCPF" required><br>
            <label>Email:</label><input type="email" id="patientEmail" required><br>
            <label>Phone:</label><input type="text" id="patientPhone" required><br>
            <button type="submit">Add Patient</button>
        </form>
    `;
    document.getElementById('content').innerHTML = html;
    
    document.getElementById('addPatientForm').addEventListener('submit', addPatient);
}

// CREATE: Add a new patient
async function addPatient(event) {
    event.preventDefault();
    
    const newPatient = {
        nome: document.getElementById('patientName').value,
        cpf: document.getElementById('patientCPF').value,
        email: document.getElementById('patientEmail').value,
        telefone: document.getElementById('patientPhone').value
    };
    
    const response = await fetch(`${apiUrl}/pacientes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPatient)
    });
    
    if (response.ok) {
        loadPatients();
    }
}

// UPDATE: Show update form for a patient
async function showUpdatePatientForm(id) {
    const response = await fetch(`${apiUrl}/pacientes/${id}`);
    const patient = await response.json();
    
    const html = `
        <h2>Update Patient</h2>
        <form id="updatePatientForm">
            <label>Name:</label><input type="text" id="patientName" value="${patient.nome}" required><br>
            <label>CPF:</label><input type="text" id="patientCPF" value="${patient.cpf}" required><br>
            <label>Email:</label><input type="email" id="patientEmail" value="${patient.email}" required><br>
            <label>Phone:</label><input type="text" id="patientPhone" value="${patient.telefone}" required><br>
            <button type="submit">Update Patient</button>
        </form>
    `;
    document.getElementById('content').innerHTML = html;
    
    document.getElementById('updatePatientForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const updatedPatient = {
            nome: document.getElementById('patientName').value,
            cpf: document.getElementById('patientCPF').value,
            email: document.getElementById('patientEmail').value,
            telefone: document.getElementById('patientPhone').value
        };
        
        const response = await fetch(`${apiUrl}/pacientes/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedPatient)
        });
        
        if (response.ok) {
            loadPatients();
        }
    });
}

// DELETE: Delete a patient
async function deletePatient(id) {
    const response = await fetch(`${apiUrl}/pacientes/${id}`, { method: 'DELETE' });
    if (response.ok) {
        loadPatients();
    }
}

// Display consultations in a table
function displayConsultations(consultations) {
    let html = `<h2>Consultations</h2><table><tr><th>Date</th><th>Observations</th></tr>`;
    consultations.forEach(consulta => {
        html += `<tr><td>${consulta.data_consulta}</td><td>${consulta.observacoes}</td></tr>`;
    });
    html += `</table>`;
    document.getElementById('content').innerHTML = html;
}

// Display doctors in a table
function displayDoctors(doctors) {
    let html = `<h2>Doctors</h2><table><tr><th>Name</th><th>Specialization</th></tr>`;
    doctors.forEach(doctor => {
        html += `<tr><td>${doctor.nome}</td><td>${doctor.especialidade}</td></tr>`;
    });
    html += `</table>`;
    document.getElementById('content').innerHTML = html;
}

// Display patients with edit/delete options
function displayPatients(patients) {
    let html = `<h2>Patients</h2><table><tr><th>Name</th><th>CPF</th><th>Actions</th></tr>`;
    patients.forEach(patient => {
        html += `<tr>
                    <td>${patient.nome}</td>
                    <td>${patient.cpf}</td>
                    <td>
                        <button onclick="showUpdatePatientForm(${patient.id})">Edit</button>
                        <button onclick="deletePatient(${patient.id})">Delete</button>
                    </td>
                </tr>`;
    });
    html += `</table>`;
    document.getElementById('content').innerHTML = html;
}
