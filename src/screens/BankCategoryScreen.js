import React,{useState} from 'react';
import { 
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity
 } from 'react-native';
import {bankCategories} from '../localdata/data';
import {COLORS,SIZES} from '../constants';
//import icon
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const BankCategoryScreen = ({navigation})=>{

    return(
        <View style={styles.container}>
            <View style={{paddingVertical:6,backgroundColor:COLORS.lightBlue}}>
            <Text style={{fontSize:17,color:COLORS.white,fontWeight:'bold',letterSpacing:6,alignSelf:'center'}}>CATEGORIES</Text>
            </View>
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                justifyContent:'flex-start',
                flexDirection:'column',
            }}
        >
            <TouchableOpacity 
            style={styles.categoryStyle}
            onPress={()=>navigation.push('BankTropicsScreen',{
                id:bankCategories[0].id,
                title:bankCategories[0].name
            })}
            >
                <View style={styles.wrapStyle}>
                <MaterialCommunityIcons name="vector-combine" size={26} color={COLORS.lightBlue} />
                <Text style={styles.textStyle}>{bankCategories[0].name}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryStyle}>
                <View style={styles.wrapStyle}>
                <FontAwesome name="bank" size={21} color={COLORS.lightBlue} />
                <Text style={styles.textStyle}>{bankCategories[1].name}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryStyle}>
                <View style={styles.wrapStyle}>
                <MaterialCommunityIcons name="bank" size={26} color={COLORS.lightBlue} />
                <Text style={styles.textStyle}>{bankCategories[2].name}</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLORS.lightGray,
        paddingVertical:0
    },
    categoryStyle:{
        flexDirection: 'column',
        margin: 5,
        paddingVertical: SIZES.radius,
        paddingHorizontal: SIZES.padding,
        borderRadius: 5,
        backgroundColor: COLORS.white,
        justifyContent:'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    },
    textStyle:{
        fontWeight:'bold',
        fontSize:16,
        color:COLORS.lightBlue,
        marginLeft:6,
    },
    wrapStyle:{
        flexDirection:'row',
        alignItems:'center'
    }
})
export default BankCategoryScreen;