import { Pie } from '@ant-design/plots';
import { Typography } from 'antd';
import React from 'react';

const { Title } = Typography;

export const GenericPieChart = ({ data, config, title = '' }) => {
  const internalConfig = {
    appendPadding: 10,
    data,
    autoFit: true,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '0',
      autoRotate: false,
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 20,
        textAlign: 'center'
      }
    },
    interactions: [
      {
        type: 'element-active'
      }
    ],
    legend: {
      layout: 'horizontal',
      position: 'bottom',
      itemName: { style: { fontSize: 14 } },
      itemSpacing: 0
    },

    ...config
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Pie {...internalConfig} />
      <Title level={2}>{title}</Title>
    </div>
  );
};
