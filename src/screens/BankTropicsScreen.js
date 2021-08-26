import React ,{useState,useEffect} from 'react'
import { 
    View,
    StyleSheet,
    FlatList,
    Alert,
    ActivityIndicator,
    Text,
    TouchableOpacity
} from 'react-native';
import bankTropicsApi from '../api/baseApi';
import {COLORS} from '../constants';
const BankTropicsScreen = ({route,navigation})=>{
    const id = route.params.id;
    const [isLoading,setIsloading] = useState(true);
    const [tropics,setTropics] = useState([]);

    const loadTropics = async()=>{
        if(id==1){
            const {data} = await bankTropicsApi.get('/get-combine-bank-tropics');
            setTropics(data);
            setIsloading(false);
        }else if(id==2){
            Alert.alert("coming soon......");
        }else if(id==3){
            Alert.alert("coming soon......");
        }
    }


    const renderItem = ({item})=>{
        return(
            <View>
            <TouchableOpacity onPress={()=>navigation.push('question',{
                tropicsId:item._id,
                title:item.title
            })}>
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
                <Text style={{fontWeight:'bold',fontSize:14,color:COLORS.lightBlue}}>{item.title}</Text>
                
            </View>
            </TouchableOpacity>
            </View>
        )
    }

    useEffect(()=>{
        loadTropics();
    },[0])
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
export default BankTropicsScreen;