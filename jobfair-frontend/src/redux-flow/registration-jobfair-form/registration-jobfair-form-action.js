import {createAsyncThunk} from "@reduxjs/toolkit";
import {createDraftRegistrationAPI, submitRegistrationAPI} from "../../services/registrationJobFairService";

export const createDraftRegistration = createAsyncThunk('registrationJobfairForm/createDraftRegistration', async (body ) => {
    let result = null;
    const res = await createDraftRegistrationAPI(body)
        .then(res => {
            console.log(res.data)
            //call submit registration
            if (res.status === 200) {
                submitRegistrationAPI(res.data.companyRegistrationId)
                    .then(response => {
                        result = response.data;
                        return result;
                    })
                    .catch(error => {
                        console.log('submit registration error: ',error)
                        return null;
                    })
            }
        })
        .catch(err => {
            console.log('submit draft registration error: ', err)
        })
    return result;
})

