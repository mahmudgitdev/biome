import React from 'react';
import {
    View,
    Image
} from 'react-native'
import {COLORS,icons} from '../constants';

const SplashScreen = ()=>{
    return(
      <View style={{flex:1,backgroundColor:COLORS.lightGray,justifyContent:'center',alignItems:'center'}}>
        <Image 
        source={icons.biome}
        style={{
            width:180,
            height:70
        }} 
        />
      </View>
    )
  }

export default SplashScreen;