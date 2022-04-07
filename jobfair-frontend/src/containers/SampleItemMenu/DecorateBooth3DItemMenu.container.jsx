import { ModeConstant } from '../../constants/AppConst';
import { SampleItemMenu } from '../../components/SampleItemMenu/SampleItemMenu.component';
import { decorateBoothAction } from '../../redux-flow/decorateBooth/decorate-booth-slice';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const DecorateBooth3DItemMenuContainer = () => {
  const dispatch = useDispatch();
  const { selectedSampleItem, mode } = useSelector((state) => state.decorateBooth);

  const [sampleItems, setSampleItems] = useState([]);

  useEffect(async () => {
    const response = await axios('/fakeData/fake-sample-items-data.json');
    const data = response.data;
    setSampleItems(data);
  }, []);

  const onItemClick = (id) => () => {
    if (selectedSampleItem.id === id) {
      dispatch(decorateBoothAction.setMode(ModeConstant.SELECT));
      dispatch(decorateBoothAction.setSelectedSampleItem({}));
      return;
    }
    dispatch(decorateBoothAction.setMode(ModeConstant.ADD));
    dispatch(decorateBoothAction.setSelectedSampleItem(sampleItems.filter((item) => item.id === id)[0]));
  };

  const sampleItemMenuProps = {
    items: sampleItems,
    onItemClick,
    selectedItemId: selectedSampleItem?.id
  };

  if (sampleItems.length === 0) return null;
  return (
    <div style={{ display: mode === ModeConstant.ADD ? 'block' : 'none' }}>
      <SampleItemMenu {...sampleItemMenuProps} />
    </div>
  );
};
