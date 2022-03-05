import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import {decorateBoothAction} from "../../redux-flow/decorateBooth/decorate-booth-slice";
import {ModeConstant} from "../../constants/AppConst";
import {SampleItemMenu} from "../../components/DecorateBooth/SampleItemMenu.component";
import {FAKE_SAMPLE_ITEMS_DATA} from "../../constants/DecorateBoothConstant";

export const SampleItemMenuContainer = (props) => {
    const dispatch = useDispatch();
    const {selectedSampleItem, mode} = useSelector(state => state.decorateBooth)

    const [sampleItems, setSampleItems] = useState(FAKE_SAMPLE_ITEMS_DATA);
    const onItemClick = id => () => {
        if (selectedSampleItem.id === id){
            dispatch(decorateBoothAction.setMode(ModeConstant.SELECT));
            dispatch(decorateBoothAction.setSelectedSampleItem({}));
            return;
        }
        dispatch(decorateBoothAction.setMode(ModeConstant.ADD));
        dispatch(decorateBoothAction.setSelectedSampleItem(sampleItems.filter(item => item.id === id)[0]));
    }

    const sampleItemMenuProps = {items: sampleItems, onItemClick, selectedItemId: selectedSampleItem?.id}


    return (
        <div style={{display: mode === ModeConstant.ADD ? 'block' : 'none'}}>
            <SampleItemMenu {...sampleItemMenuProps}/>
        </div>
    )
}