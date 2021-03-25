import {HOST} from '../../commons/hosts';
import RestApiClient from '../../commons/api/rest-client';
import authHeader from '../../services/auth-header';
import token from '../../services/token';

const endpointPatients = {
    getPatients: '/patients',
    getMedicationPlans: '/patient/medicationPlans',
    createPatient: '/patient/create',
    deletePatient:'/patient/delete',
    updatePatient: '/patient/update',
    createMedicationPlan: '/patient/medicationPlan/create'
};

const endpointMedications = {
    getMedications: '/medications'
}

function getPatients(callback) {
    let request = new Request(HOST.backend_api + endpointPatients.getPatients, {
        method: 'GET',
        headers: authHeader()
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getMedicationPlansForPatient(param, callback) {
    let request = new Request(HOST.backend_api + endpointPatients.getMedicationPlans + "/" + param, {
        method: 'GET',
        headers: authHeader()
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function createPatient(user, callback) {
    let request = new Request(HOST.backend_api + endpointPatients.createPatient, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token()
        },
        body: JSON.stringify(user)
    });
    console.log(request.url);
    console.log("api user", user);
    RestApiClient.performRequest(request, callback);
}

function deletePatient(param, callback) {
    let request = new Request(HOST.backend_api + endpointPatients.deletePatient + "/" + param, {
        method: 'DELETE',
        headers: authHeader()
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function updatePatient(user, callback) {
    let request = new Request(HOST.backend_api + endpointPatients.updatePatient, {
        method: 'PUT',
        headers: authHeader(),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token()
        },
        body: JSON.stringify(user)
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function createMedicationPlan(param, medicationPlan, callback) {
    let request = new Request(HOST.backend_api + endpointPatients.createMedicationPlan + "/" + param, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token()
        },
        body: JSON.stringify(medicationPlan)
    });
    console.log(request.url);
    console.log("api", medicationPlan);
    RestApiClient.performRequest(request, callback);
}

function getMedications(callback) {
    let request = new Request(HOST.backend_api + endpointMedications.getMedications, {
        method: 'GET',
        headers: authHeader()
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}



export {
    getPatients,
    getMedicationPlansForPatient,
    createPatient,
    deletePatient,
    updatePatient,
    createMedicationPlan,
    getMedications
};