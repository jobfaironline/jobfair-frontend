import {createAsyncThunk} from "@reduxjs/toolkit";
import {createDraftRegistrationAPI, submitRegistrationAPI} from "../../services/registrationJobFairService";

export const createDraftRegistration = createAsyncThunk('registrationJobfairForm/createDraftRegistration', async (body ) => {
    const res = await createDraftRegistrationAPI(body)
    const response = await submitRegistrationAPI(res.data.companyRegistrationId);
    return response;
})

