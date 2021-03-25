import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";
import authHeader from '../../services/auth-header';
import token from '../../services/token';

const endpointMedications = {
    getMedications: '/medications',
    createMedication: '/medication/create',
    updateMedication: '/medication/update',
    deleteMedication: '/medication/delete',
    getSideEffects: '/sideEffects'
};

function getMedications(callback) {
    let request = new Request(HOST.backend_api + endpointMedications.getMedications, {
        method: 'GET',
        headers: authHeader()
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function createMedication(medication, callback) {
    let request = new Request(HOST.backend_api + endpointMedications.createMedication, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token()
        },
        body: JSON.stringify(medication)
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function updateMedication(medication, callback) {
    let request = new Request(HOST.backend_api + endpointMedications.updateMedication, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token()
        },
        body: JSON.stringify(medication)
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function deleteMedication(param, callback) {
    let request = new Request(HOST.backend_api + endpointMedications.deleteMedication + "/" + param, {
        method: 'DELETE',
        headers: authHeader()
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getSideEffects(callback) {
    let request = new Request(HOST.backend_api + endpointMedications.getSideEffects, {
        method: 'GET',
        headers: authHeader()
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

export {
    getMedications,
    createMedication,
    updateMedication,
    deleteMedication,
    getSideEffects
};