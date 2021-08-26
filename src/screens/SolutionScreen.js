import React from 'react';
import { 
    View,
    StyleSheet,
    Text,
    FlatList,
} from 'react-native';
import {COLORS} from '../constants';

const SolutionScreen = ({route})=>{
    const data = route.params.questions

    const renderItem = ({item})=>{
        return(
            <View>
            <View style={{
                flex: 1,
                flexDirection: 'column',
                margin: 5,
                paddingVertical: 15,
                paddingHorizontal: 18,
                borderRadius: 5,
                backgroundColor: COLORS.white,
                ...styles.shadow

            }}>
                <Text style={{fontWeight:'bold',fontSize:15,color:COLORS.black}}>{item.question}</Text>
                <View>
                <FlatList 
                data={item.options}
                keyExtractor={item=>item._id}
                renderItem={({item})=>{
                    return(
                        <View style={{flexDirection:'row',paddingVertical:5,alignItems:'center'}}>
                            <View style={{
                                backgroundColor:item.isCorrect?COLORS.darkgreen:'gray',
                                width:27,
                                height:27,
                                borderRadius:40,
                                marginRight:6,
                                justifyContent:'center'
                                }}>
                            <Text style={{
                                alignSelf:'center',
                                color:'white',
                            }}>{item.qop}</Text>
                            </View>
                            <Text style={{fontSize:15}}>{item.option}</Text>
                        </View>
                    )
                }}
                />
            </View>
            </View>
                
        </View>
        )

    }



    return(
        <View style={styles.container}>
            <FlatList
            data={data}
            keyExtractor={item=>item._id}
            renderItem={renderItem}
            numColumns={1}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLORS.lightGray2,
        paddingVertical:5
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    }
})
export default SolutionScreen;