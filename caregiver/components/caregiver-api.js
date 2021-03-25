import {HOST} from '../../commons/hosts';
import RestApiClient from '../../commons/api/rest-client';
import authHeader from '../../services/auth-header';

const endpointPatients = {
    getPatientsForCaregiver: '/caregiver/patients',
};

function getPatientsForCaregiver(param, callback) {
    let request = new Request(HOST.backend_api + endpointPatients.getPatientsForCaregiver + '/' + param, {
        method: 'GET',
        headers: authHeader()
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

export {
    getPatientsForCaregiver
};