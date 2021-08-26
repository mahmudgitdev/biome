import React,{useState,useEffect} from 'react';
import{
    Text,
    View,
    StyleSheet,
    FlatList,
    ActivityIndicator
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import tropicApi from '../api/baseApi';
import { COLORS,SIZES } from '../constants';

const BcsTestTropics = ({route,navigation})=>{
    const [tropics,setTropics] = useState([]);
    const [isLoading,setIsloading] = useState(true);


    const loadTropics = async()=>{
            const {data} = await tropicApi.get('/get-bcs-tropics');
            setTropics(data);
            setIsloading(false);
    }

    const renderItem = ({item})=>{
        return(
            <TouchableOpacity 
                onPress={()=>navigation.push('modeltest',{
                tropicsId:item._id,
                title:item.title
                })}
                style={{
                    justifyContent:'center',
                    alignItems:'center',
                }}
            >
            <View style={{
                margin: 5,
                width:SIZES.width-100,
                minHeight:55,
                justifyContent:'center',
                alignItems:'center',
                borderRadius: 5,
                paddingHorizontal:15,
                backgroundColor: COLORS.lightBlue,
                borderWidth:2.5,
                borderColor:COLORS.blue,
                ...styles.shadow

            }}>
                <Text style={{
                    fontWeight:'bold',
                    fontSize:18,
                    color:COLORS.primary,
                    }}>{item.title}</Text>
            </View>
            </TouchableOpacity>
        )
    }

    useEffect(() => {
        loadTropics()
    }, [0])





    return(
        <View style={styles.container}>
            <View style={{paddingVertical:6,backgroundColor:COLORS.lightBlue}}>
            <Text style={{fontSize:17,color:COLORS.primary,fontWeight:'bold',letterSpacing:3,alignSelf:'center'}}>PRELIMINARY MODEL TEST</Text>
            </View>
            {isLoading?<ActivityIndicator size="large" color={COLORS.blue} />:
            <View style={{paddingBottom:50,marginTop:8}}>
            <FlatList
            data={tropics}
            keyExtractor={item=>item._id}
            renderItem={renderItem}
            />
            </View>
            }
        </View>
    )

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLORS.lightGray,
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

export default BcsTestTropics;