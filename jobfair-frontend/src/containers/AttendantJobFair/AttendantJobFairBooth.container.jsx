import React, {useEffect, useState} from "react";
import {loadModel} from "../../utils/glbModelUtil";
import {CompanyBoothCanvasComponent} from "../../components/AttendantJobFair/CompanyBoothCanvas.component";
import {getCompanyBoothLatestLayout} from "../../services/companyBoothService";


export const AttendantJobFairBoothContainer = (props) => {
    const {companyBoothId} = props;
    const [boothMesh, setBoothMesh] = useState(null);
    useEffect(async () => {
        const response = await getCompanyBoothLatestLayout(companyBoothId);
        const url = response.data.url;
        const glb = await loadModel(url);
        setBoothMesh(glb.scene);
    }, []);
    if (boothMesh === null) return null;
    return (
        <CompanyBoothCanvasComponent boothMesh={boothMesh}/>
    )
}

