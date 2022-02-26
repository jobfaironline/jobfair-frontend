import React, {useEffect, useState} from "react";
import {loadModel} from "../../utils/model_loader";
import {CompanyBoothCanvasComponent} from "../../components/AttendantJobFair/CompanyBoothCanvas.component";


export const AttendantJobFairBoothContainer = (props) => {
    const {url} = props;
    const [boothMesh, setBoothMesh] = useState(null);
    useEffect(async () => {
        const glb = await loadModel(url);
        setBoothMesh(glb.scene);
    }, []);
    if (boothMesh === null) return null;
    return (
        <CompanyBoothCanvasComponent boothMesh={boothMesh}/>
    )
}

