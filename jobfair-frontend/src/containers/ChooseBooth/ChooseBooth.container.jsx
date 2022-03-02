import React, {useEffect, useState} from "react";
import {loadModel} from "../../utils/glbModelUtil";
import {ChooseBoothCanvas} from "../../components/ChooseBooth/ChooseBoothCanvas.component";
import {getLayoutAndAvailableSlotByJobFairId} from "../../services/layoutService";

export const ChooseBoothPageContainer = (props) => {
    const {jobFairId} = props;
    const [state, setState] = useState({
        glbMesh: undefined,
        boothData: []
    });

    useEffect(async () => {
        const data = await getLayoutAndAvailableSlotByJobFairId(jobFairId).then(response => response.data)
        const url = data.url;

        const glb = await loadModel(url);
        const boothData = {};
        for (const boothInfo of data.booths) {
            const {id, name, price, status} = boothInfo;
            boothData[name] = {
                id: id,
                price: price,
                status: status,
            }
        }

        setState(prevState => {
            return {...prevState, glbMesh: glb.scene, boothData: boothData}
        });
    }, [])

    if (state.glbMesh === undefined || state.boothData.length === 0) return null;
    return <ChooseBoothCanvas mesh={state.glbMesh} boothData={state.boothData} jobFairId={jobFairId}/>
}