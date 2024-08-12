import React from 'react';
import {TextInput} from 'react-native';
import {darkGreen} from './Constants';

const Field = props => {
  return (
    <TextInput
      {...props}
      style={{borderRadius: 100, color: darkGreen, paddingHorizontal: 15, width: '55%', backgroundColor: 'rgb(220,220, 220)', marginVertical: 10,height:"9%"}}
      placeholderTextColor={darkGreen}></TextInput>
  );
};

export default Field;