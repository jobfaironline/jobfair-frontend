import {createSlice, current} from "@reduxjs/toolkit";
import {ModeConstant} from "../../constants/AppConst";

const decorateBoothSlice = createSlice({
    name: 'decorateBooth',
    initialState: {
        mode: ModeConstant.SELECT,
        selectedItem: undefined,
        selectedSampleItem: {},
        modelItems: [],
        hoverItem: undefined,
    },
    reducers: {
        setMode: (state, action) => {
            const mode = action.payload;
            switch (mode) {
                case ModeConstant.ADD:
                    return {...state, selectedItem: undefined, mode: mode}
            }
            return {...state, mode}
        },
        setSelectedItem: (state, action) => {
            return {...state, selectedItem: action.payload}
        },
        setHoverItem: (state, action) => {
            return {...state, hoverItem: action.payload}
        },
        setSelectedSampleItem: (state, action) => {
            return {...state, selectedSampleItem: action.payload}
        },
        setModelItems: (state, action) => {
            return {...state, modelItems: action.payload}
        },
        addModelItem: (state, action) => {
            state.modelItems.push(action.payload)
        },
        deleteModelItem: (state, action) => {
            const uuid = action.payload
            const result = state.modelItems.filter(itemMesh => itemMesh.uuid !== uuid);
            return {...state, selectedItem: undefined, hoverItem: undefined, modelItems: result}
        }
    }
})

export const decorateBoothAction = decorateBoothSlice.actions
export default decorateBoothSlice.reducer