import React, {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useDispatch} from "react-redux";
import {decorateBoothAction} from "../../redux-flow/decorateBooth/decorate-booth-slice";
import {DecorateBoothContainer} from "../../containers/DecorateBooth/DecorateBooth.container";

const DecorateBoothPage = () => {
    const {companyBoothId, jobFairId} = useParams()
    const dispatch = useDispatch();
    useEffect(() => {
        return () => {
            dispatch(decorateBoothAction.reset({}));
        }
    });
    return <DecorateBoothContainer companyBoothId={companyBoothId} jobFairId={jobFairId}/>

}

export default DecorateBoothPage
