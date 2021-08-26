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
import { FontAwesome } from '@expo/vector-icons';

const BcsStudyTropics = ({route,navigation})=>{
    const [tropics,setTropics] = useState([]);
    const [isLoading,setIsloading] = useState(true);


    const loadTropics = async()=>{
            const {data} = await tropicApi.get('/get-bcs-tropics');
            setTropics(data);
            setIsloading(false);
    }

    const renderItem = ({item})=>{
        return(
            <TouchableOpacity onPress={()=>navigation.push('question',{
                tropicsId:item._id,
                title:item.title
            })}>
            <View style={{
                flex: 1,
                flexDirection: 'column',
                margin: 5,
                paddingVertical: 15,
                paddingHorizontal: 12,
                borderRadius: 5,
                backgroundColor: COLORS.white,
                ...styles.shadow

            }}>
                <View style={{
                    flexDirection:'row',
                    alignItems:'center'

                }}>
                <FontAwesome style={{marginRight:5}} name="book" size={24} color={COLORS.lightBlue} />
                <Text style={{fontWeight:'bold',fontSize:15,color:COLORS.lightBlue,alignItems:'center'}}>{item.title}</Text>
                </View>
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
            <Text style={{fontSize:17,color:COLORS.white,fontWeight:'bold',letterSpacing:6,alignSelf:'center'}}>PRELIMINARY</Text>
            </View>
            {isLoading?<ActivityIndicator size="large" color={COLORS.blue} />:
            <FlatList
            data={tropics}
            keyExtractor={item=>item._id}
            renderItem={renderItem}
            numColumns={1}
            />
            }
        </View>
    )

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLORS.lightGray,
        paddingVertical:0
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

export default BcsStudyTropics;