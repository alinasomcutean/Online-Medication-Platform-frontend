import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from './login/login';
import Doctor from './doctor/doctor';
import PatientsContainer from './doctor/patient/patients-container.js';
import MedicationPlansContainer from './doctor/patient/medicationplans/medication-plans-container';
import CaregiverContainer from './doctor/caregiver/caregiver-container';
import Patient from './patient/patient';
import AddMedPlanContainer from './doctor/patient/medicationplans/add-med-plan-container';
import MedicationContainer from './doctor/medication/medication-container';
import PatientListContainer from './doctor/caregiver/list-of-patients/patient-list-container';
import Caregiver from './caregiver/caregiver';
import CaregiverNotification from './caregiver/caregiver-notifications';
import Unauthorized from './commons/errorhandling/unauthorized-error';

class App extends React.Component {


    render() {

        return (
            <div >
            <Router>
                <div>
                    <Switch>
                        <Route
                            exact
                            path='/'
                            render={() => <Login/>}
                        />
                        <Route
                            exact
                            path='/doctor'
                            render={() => <Doctor/>}
                        />
                        <Route
                            path='/patients'
                            render={ () => <PatientsContainer/>}
                        />
                        <Route
                            path='/patient/medicationPlans'
                            render={ () => <MedicationPlansContainer/>}
                        />
                        <Route
                            exact path='/caregivers'
                            render={ () => <CaregiverContainer/>}
                        />
                        <Route
                            path='/patient'
                            render={ () => <Patient/>}
                        />
                        <Route
                            path='/addMedicationPlan'
                            render={ () => <AddMedPlanContainer/>}
                        />
                        <Route
                            exact path='/medications'
                            render={ () => <MedicationContainer/>}
                        />
                        <Route
                            path='/caregiver/patients'
                            render={ () => <PatientListContainer/>}
                        />
                        <Route
                            path='/caregiver'
                            render={ () => <Caregiver/>}
                        />
                        <Route
                            path='/websocket-chat'
                            render={ () => <CaregiverNotification/>}
                        />
                        <Route
                            exact
                            path='/error/unauthorized'
                            render={ () => <Unauthorized/>}
                        />
                    </Switch>
                </div>
            </Router>
            </div>
        )
    };
}

export default App
