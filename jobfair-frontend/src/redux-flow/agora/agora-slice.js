import {createSlice} from "@reduxjs/toolkit";

const agoraSlice = createSlice({
    name: 'agora',
    initialState: {
        rtcClient: null,
        rtmClient: null,
        channelId: "",
    },
    reducers:{
        setRTMClient: (state, action) => {
            state.rtmClient = action.payload;
        },
        setRTCClient: (state, action) => {
            state.rtcClient = action.payload;
        },
        setChannelId: (state, action) => {
            state.channelId = action.payload;
        }

    }
});
export const agoraAction = agoraSlice.actions

export default agoraSlice.reducer