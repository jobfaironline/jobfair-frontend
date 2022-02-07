import {createSlice} from "@reduxjs/toolkit";
import {USER_STORAGE} from "../../constants/AppConst";

const viewDetailSlice = createSlice({
    name: 'attendant_view_detail',
    initialState: {
        data: [],
        dataFetched: false,
        isFetching: false,
        isError: false,
        isAuthUser: !!localStorage.getItem(USER_STORAGE),
    },
    reducers: {
        fetchingViewDetail: (state, action) => {
            state = {
                ...state,
                data: [],
                isFetching: true
            }
        },
        fetchingViewDetailSuccess: (state, action) => {
            state = {
                ...state,
                isFetching: false,
                status: action.data.status
            }
        },
        fetchingViewDetailFailure: (state, action) => {
            state = {
                ...state,
                isFetching: false,
                isError: true,
                status: action.data.status
            }
        }
    }
})

export const attendantViewDetailActions = viewDetailSlice.actions;
export default viewDetailSlice.reducer;