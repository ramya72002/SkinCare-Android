import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default function Btn({ bgColor, btnLabel, textColor, Press }) {
  return (
    <TouchableOpacity
      onPress={Press}
      style={{
        backgroundColor: bgColor,
        borderRadius: moderateScale(40),      // Scalable border radius
        alignItems: 'center',
        width: scale(250),                    // Scalable width
        paddingVertical: verticalScale(10),   // Scalable vertical padding
        marginVertical: verticalScale(0),    // Scalable vertical margin
      }}>
      <Text
        style={{
          color: textColor,
          fontSize: moderateScale(22),        // Scalable font size
          fontWeight: 'bold',
        }}>
        {btnLabel}
      </Text>
    </TouchableOpacity>
  );
}
