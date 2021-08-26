import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import {
    View,
    Text,
    Button
} from 'react-native'
import {COLORS,icons} from '../constants';
import favoriteApi from '../api/baseApi';

const JobNewsScreen = ()=>{

    const showList = async()=>{
      try{
        const keys = await AsyncStorage.getAllKeys();
        const ids = JSON.stringify(keys);
        const {data} = await favoriteApi.get(`/get-favorite-list/${ids}`);
        console.log(data);
      }catch(err){
        alert(err);
      }
    }
    const clearList = async()=>{
      try{
        await AsyncStorage.clear();
      }catch(err){
        alert(err);
      }
    }

    return(
      <View style={{flex:1,backgroundColor:COLORS.lightGray,justifyContent:'center',alignItems:'center'}}>
        {/* <Text onPress={()=>showList()}>Show</Text>
        <Text style={{marginTop:50}} onPress={()=>clearList()}>Clear</Text> */}

      </View>
    )
  }

export default JobNewsScreen;