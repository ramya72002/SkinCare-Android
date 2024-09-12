import React from 'react';
import { TextInput } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { darkGreen } from './Constants';

const Field = (props) => {
  return (
    <TextInput
      {...props}
      style={{
        borderRadius: moderateScale(50), // Scalable border radius
        color: darkGreen,
        paddingHorizontal: scale(15),    // Scalable horizontal padding
        width: '95%',                    // Scalable width as percentage
        backgroundColor: 'rgb(220,220,220)',
        marginVertical: verticalScale(10), // Scalable vertical margin
        height: verticalScale(45),         // Scalable height (9% in a scalable way)
      }}
      placeholderTextColor={darkGreen}
    />
  );
};

export default Field;
