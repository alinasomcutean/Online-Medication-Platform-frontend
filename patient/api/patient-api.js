import {HOST} from '../../commons/hosts';
import RestApiClient from '../../commons/api/rest-client';
import authHeader from '../../services/auth-header';

const endpoints = {
    patient: '/patient'
};

function getLoggedInPatient(param, callback) {
    let request = new Request(HOST.backend_api + endpoints.patient + "/" + param, {
        method: 'GET',
        headers: authHeader()

    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

export {
    getLoggedInPatient
}