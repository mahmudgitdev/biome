import React from 'react';

import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import { Text, View, StyleSheet,Image } from 'react-native';
import {COLORS,icons,SIZES} from '../constants';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
const DrawerContent = (props)=>{
    return(
            <DrawerContentScrollView {...props}>
                    <View style={{
                        backgroundColor:COLORS.lightBlue,
                        height:140
                        }}>
                        <Image 
                        source={icons.drawericon}
                        style={{
                            width:SIZES.width/2+75,
                            height:140
                        }}
                        />
                    </View>
                    <View style={{paddingVertical:10}}>
                    <DrawerItem 
                    icon={({color,size})=>(
                      <FontAwesome name="home" size={26} color={COLORS.blue} />
                    )}
                    label={({focused,color})=><Text style={{
                        color:COLORS.blue,
                        fontWeight:'bold',
                        fontSize:15,
                    }}>Home</Text>}
                    onPress={()=>props.navigation.navigate('Home')}
                    />
                    <DrawerItem 
                    icon={({color,size})=>(
                        <MaterialIcons name="favorite" size={26} color={COLORS.blue} />
                    )}
                    label={({focused,color})=><Text style={{
                        color:COLORS.blue,
                        fontWeight:'bold',
                        fontSize:15,
                    }}>My Favorites</Text>}
                    onPress={()=>props.navigation.navigate('favorite')}
                    />
                    <DrawerItem 
                    icon={({color,size})=>(
                        <FontAwesome name="calendar" size={24} color={COLORS.blue} />
                    )}
                    label={({focused,color})=><Text style={{
                        color:COLORS.blue,
                        fontWeight:'bold',
                        fontSize:15,
                    }}>Job News</Text>}
                    onPress={()=>props.navigation.navigate('jobNews')}
                    />
                    <DrawerItem 
                    icon={({color,size})=>(
                        <FontAwesome name="history" size={24} color={COLORS.blue} />
                    )}
                    label={({focused,color})=><Text style={{
                        color:COLORS.blue,
                        fontWeight:'bold',
                        fontSize:15,
                    }}>My History</Text>}
                    onPress={()=>props.navigation.navigate('Home')}
                    />
                    </View>
            </DrawerContentScrollView>
    )
}
const styles = StyleSheet.create({
    drawerItem:{
        marginTop:125,
        paddingHorizontal:15
    }
})
export default DrawerContent;