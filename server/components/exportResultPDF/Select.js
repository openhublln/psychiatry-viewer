// const { createRoot } = ReactDOM;
// const {  useState  } = React;
// const {  TreeSelect  } = antd;
// const { SHOW_PARENT } = TreeSelect;
import React, { useState } from 'react'
import {  TreeSelect, SHOW_PARENT  } from 'antd';

const treeData = [
  {
    title: 'Select/Unselect all',
    value: '0',
    key: '0',
    children: [
      {
        title: 'Echelles liées aux consommations',
        value: '0-0',
        key: '0-0',
        children: [
          {
            title: "La sévérité du trouble d'usage de l'alcool",
            value: '0-0-0',
            key: '0-0-0',
          },
          {
            title: 'Le craving',
            value: '0-0-1',
            key: '0-0-1',
          },
          {
            title: 'Les autres consommations',
            value: '0-0-2',
            key: '0-0-2',
          },
        ],
      },
      {
        title: 'Comorbidités',
        value: '0-1',
        key: '0-1',
        children: [
          {
            title: 'Les symptômes dépressifs',
            value: '0-1-0',
            key: '0-1-0',
          },
          {
            title: 'Les symptômes anxieux',
            value: '0-1-1',
            key: '0-1-1',
          },
          {
            title: 'Les troubles du sommeil',
            value: '0-1-2',
            key: '0-1-2',
          },
        ],
      },
      {
        title: 'Modes de réaction face à un évènement',
        value: '0-2',
        key: '0-2',
        children: [
          {
            title: "L'impulsivité",
            value: '0-2-0',
            key: '0-2-0',
          },
          {
            title: 'La gestion des émotions',
            value: '0-2-1',
            key: '0-2-1',
          },
        ],
      },
      {
        title: 'Soutiens possibles',
        value: '0-3',
        key: '0-3',
        children: [
          {
            title: "Interne: L'auto-efficacité",
            value: '0-3-0',
            key: '0-3-0',
          },
          {
            title: "Interne: La motivation et préparation au changement",
            value: '0-3-1',
            key: '0-3-1',
          },
          {
            title: "Externe: Réseau social",
            value: '0-3-2',
            key: '0-3-2',
          },
          {
            title: "Externe: Alliance thérapeutique",
            value: '0-3-3',
            key: '0-3-3',
          },
        ],
      },
      {
        title: 'Cognition',
        value: '0-4',
        key: '0-4',
      },
      {
        title: 'Histoire infantile et familiale',
        value: '0-5',
        key: '0-5',
      },
      {
        title: 'Qualité de vie',
        value: '0-6',
        key: '0-6',
      },
      {
        title: 'Résumé',
        value: '0-7',
        key: '0-7',
        children: [
          {
            title: 'Les évolutions',
            value: '0-7-0',
            key: '0-7-0',
          },
          {
            title: 'Les forces et fragilités',
            value: '0-7-1',
            key: '0-7-1',
          },
        ],
      },
    ]
  },
];

const Select = () => {
  const [value, setValue] = useState([]);
  const [selectedNodes, setSelectedNodes] = useState([]);
  // const onChange = (newValue, label, extra) => {
  //   console.log('newValue', newValue);
  //   console.log('label', label);
  //   console.log('extra', extra);
  //   console.log('extra.allCheckedNodes', extra.allCheckedNodes);
  //   setValue(newValue);
  //   setSelectedNodes(extra.allCheckedNodes);
  // };

  const handleSubmit = () => {
    console.log('Submitted Value:', value);
    console.log('Submitted Selected Nodes:', selectedNodes);
    

  };

  const tProps = {
    treeData,
    value,
    onChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: 'Select visualization to export',
    style: {
      width: '100%',
    },
    // treeDefaultExpandAll: true,
    treeDefaultExpandedKeys: ['0'],
    // treeDefaultExpandedKeys: ['0', '0-0', '0-1', '0-2', '0-3', '0-4', '0-5', '0-6', '0-7'],
    maxTagCount: 3,
    allowClear: true,
  };
  return <TreeSelect {...tProps} />;
};

export default Select
// const ComponentDemo = App;