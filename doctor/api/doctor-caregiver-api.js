import {HOST} from '../../commons/hosts';
import RestApiClient from '../../commons/api/rest-client';
import authHeader from '../../services/auth-header';
import token from '../../services/token';

const endpointCaregivers = {
    getCaregivers: '/caregivers',
    createCaregiver: '/caregiver/create',
    deleteCaregiver: '/caregiver/delete',
    updateCaregiver: '/caregiver/update',
    getPatientsForCaregiver: '/caregiver/patients'
}

function getCaregivers(callback) {
    let request = new Request(HOST.backend_api + endpointCaregivers.getCaregivers, {
        method: 'GET',
        headers: authHeader()
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function createCaregiver(user, callback) {
    let request = new Request(HOST.backend_api + endpointCaregivers.createCaregiver, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token()
        },
        body: JSON.stringify(user)
    });
    console.log(request.url);
    console.log("user", user);
    RestApiClient.performRequest(request, callback);
}

function deleteCaregiver(param, callback) {
    let request = new Request(HOST.backend_api + endpointCaregivers.deleteCaregiver + "/" + param, {
            method: 'DELETE',
            headers: authHeader()
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function updateCaregiver(user, callback) {
    let request = new Request(HOST.backend_api + endpointCaregivers.updateCaregiver, {
        method: 'PUT',
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

function getPatientsForCaregiver(param, callback) {
    let request = new Request(HOST.backend_api + endpointCaregivers.getPatientsForCaregiver + "/" + param, {
        method: 'GET',
        headers: authHeader()
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

export {
    getCaregivers,
        createCaregiver,
        deleteCaregiver,
        updateCaregiver,

    getPatientsForCaregiver
}