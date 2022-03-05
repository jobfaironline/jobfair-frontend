import {createSlice, current} from "@reduxjs/toolkit";
import {ModeConstant} from "../../constants/AppConst";

const decorateBoothSlice = createSlice({
    name: 'decorateBooth',
    initialState: {
        mode: ModeConstant.SELECT,
        selectedItemRef: undefined,
        hoverItemRef: undefined,
        selectedSampleItem: {},
        modelItems: []
    },
    reducers: {
        setMode: (state, action) => {
            const mode = action.payload;
            switch (mode) {
                case ModeConstant.ADD:
                    return {...state, selectedItemRef: undefined, mode: mode}
            }
            return {...state, mode}
        },
        setSelectedItemRef: (state, action) => {
            return {...state, selectedItemRef: action.payload}
        },
        setHoverItemRef: (state, action) => {
            return {...state, hoverItemRef: action.payload}
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
            state.selectedItemRef = undefined
            state.hoverItemRef = undefined
            state.modelItems = result
            //return {...state, selectedItemRef: undefined, hoverItemRef: undefined, modelItems: result}

        }
    }
})

export const decorateBoothAction = decorateBoothSlice.actions
export default decorateBoothSlice.reducer