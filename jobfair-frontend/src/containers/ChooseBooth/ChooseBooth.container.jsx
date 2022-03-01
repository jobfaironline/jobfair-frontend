import React, {useEffect, useState} from "react";
import {loadModel} from "../../utils/glbModelUtil";
import {ChooseBoothCanvas} from "../../components/ChooseBooth/ChooseBoothCanvas.component";

export const ChooseBoothPageContainer = (props) => {
    const {jobFairId} = props;
    const url = "./map.glb"
    const [glbMesh, setGlbMesh] = useState();

    useEffect(async () => {
        const glb = await loadModel(url);
        setGlbMesh(glb.scene);
    }, [])

    if (glbMesh === undefined) return null;
    return <ChooseBoothCanvas mesh={glbMesh}/>
}