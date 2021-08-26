import React,{useState,useEffect} from 'react'
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native'
import {COLORS,SIZES} from '../constants';
import { AntDesign } from '@expo/vector-icons';

import circularApi from '../api/baseApi';

const AllCircularScreen = ({route,navigation})=>{

    const [isLoading,setIsLoading] = useState(true);
    const [circular,setCircular] = useState([]);

    const loadCircular = async()=>{
        const {data} = await circularApi.get('/get-all-circulars');
        setCircular(data);
        setIsLoading(false);
    }

    useEffect(()=>{
        loadCircular();
    },[0])



    return(
        <View>
        <View style={{paddingVertical:6,backgroundColor:COLORS.lightBlue}}>
        <Text style={{fontSize:16,color:COLORS.white,fontWeight:'bold',marginLeft:10}}>Total {circular.length} Jobs</Text>
        </View>
        <View style={{paddingHorizontal:3}}>
            {isLoading?<ActivityIndicator size="large" color={COLORS.blue} /> :
            <FlatList
            data={circular}
            keyExtractor={item=>item._id}
            renderItem={({item})=>{
                return(
                <TouchableOpacity
                onPress={()=> navigation.push('jobDetails',{
                    id:item._id
                })}
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    margin: 5,
                    paddingVertical: SIZES.radius,
                    paddingHorizontal: 18,
                    borderRadius: 5,
                    backgroundColor: 'whitesmoke',
                    borderWidth:.5,
                    borderColor:COLORS.yellow,
                    ...styles.shadow
                }}
            >
                <View>
                    <Text
                    style={{fontWeight:'bold',fontSize:18,color:COLORS.blue}}
                    >{item.title}</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={{
                        color:COLORS.darkgray,
                        fontSize:15,
                        fontWeight:'600'
                    }}>{item.company}</Text>
                    <AntDesign style={{marginLeft:5}} name="doubleright" size={13} color={COLORS.blue} />
                    <Text style={{fontSize:13,color:COLORS.yellow}}>Details</Text>
                </View>
            </TouchableOpacity>
            )
            }}
            showsHorizontalScrollIndicator={false}
            />}
        </View>
        </View>
    )
    
}

const styles = StyleSheet.create({
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
});

export default AllCircularScreen;