import {attendantViewDetailActions} from "./view-detail-slice";


export const AttendantViewDetailHandler = (attendantId) => {
    return (dispatch) => {
        dispatch(attendantViewDetailActions.fetchingViewDetailSuccess(data))
    }
}