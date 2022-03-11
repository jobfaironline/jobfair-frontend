import React, {useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {useDispatch} from "react-redux";
import {decorateBoothAction} from "../../redux-flow/decorateBooth/decorate-booth-slice";
import {DecorateBoothContainer} from "../../containers/DecorateBooth/DecorateBooth.container";
import {PageHeader} from "antd";

const DecorateBoothPage = () => {
  const {companyBoothId, jobFairId} = useParams()
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    return () => {
      dispatch(decorateBoothAction.reset({}));
    }
  });
  return (
    <div className={"page"}>
      <PageHeader
        className="site-page-header"
        onBack={() => history.goBack()}
        title="Back"
        subTitle=""
      />
      <DecorateBoothContainer companyBoothId={companyBoothId} jobFairId={jobFairId}/>
    </div>
  )
}

export default DecorateBoothPage
