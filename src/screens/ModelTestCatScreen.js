import React from 'react';
import{
    Text,
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image
} from 'react-native';
import {modelTestCategories} from '../localdata/data';
import {SIZES,icons,COLORS} from '../constants';

const ModelTestCatScreen = ({navigation})=>{
    return(
        <View style={styles.container}>
            <View style={{paddingVertical:6,backgroundColor:COLORS.lightBlue}}>
            <Text style={{fontSize:17,color:COLORS.primary,fontWeight:'bold',letterSpacing:6,alignSelf:'center'}}>CATEGORIES</Text>
            </View>
            <View style={{paddingVertical:15}}>
                <ScrollView
                horizontal={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    justifyContent:'flex-start',
                    flexDirection:'column',
                    flexWrap:'wrap'
                }}
                >
                <TouchableOpacity
                    onPress={() =>navigation.push('bcstest')}
                    style={styles.viewStyle}
                >
                    <Image
                        source={modelTestCategories[0].icon}
                        style={styles.imageStyle}
                    />
                <Text style={styles.textStyle}>{modelTestCategories[0].name}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() =>navigation.push('BankCategories')}
                    style={styles.viewStyle}
                >
                    <Image
                        source={modelTestCategories[1].icon}
                        style={styles.imageStyle}
                    />
                <Text style={styles.textStyle}>{modelTestCategories[1].name}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() =>navigation.push('StudyTropics',{
                        title:modelTestCategories[2].name,
                        id:modelTestCategories[2].id
                    })}
                    style={styles.viewStyle}
                >
                    <Image
                        source={modelTestCategories[2].icon}
                        style={styles.imageStyle}
                    />
                <Text style={styles.textStyle}>{modelTestCategories[2].name}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() =>navigation.push('ModelTest',{
                        title:modelTestCategories[3].name,
                        id:modelTestCategories[3].id
                    })}
                    style={styles.viewStyle}
                >
                    <Image
                        source={modelTestCategories[3].icon}
                        style={styles.imageStyle}
                    />
                <Text style={styles.textStyle}>{modelTestCategories[3].name}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() =>navigation.push('StudyTropics',{
                        title:modelTestCategories[4].name,
                        id:modelTestCategories[4].id
                    })}
                    style={styles.viewStyle}
                >
                    <Image
                        source={modelTestCategories[4].icon}
                        style={styles.imageStyle}
                    />
                <Text style={styles.textStyle}>{modelTestCategories[4].name}</Text>
                </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:COLORS.lightGray,
        flex:1
    },
    viewStyle:{
        width:SIZES.width-10,
        flexDirection: 'row',
        margin: 5,
        paddingVertical: SIZES.radius,
        paddingHorizontal:18,
        borderRadius: 5,
        borderWidth:1,
        borderColor:COLORS.lightBlue,
        backgroundColor: COLORS.white,
        alignItems:'center',
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
        marginLeft: 15,
        color: COLORS.primary,
        alignItems:'center',
        justifyContent:'center',
        fontSize:18,
        fontWeight:'bold',
    },
    imageStyle:{
        width: 48,
        height: 48
    },
})
export default ModelTestCatScreen;