import React,{useState,useEffect,useContext} from 'react';
import { 
    View,
    StyleSheet,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Switch,
    ToastAndroid
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Context as favoriteContext } from '../context/FavoriteContext';
import favoriteApi from '../api/baseApi';
import {COLORS} from '../constants';
import { MaterialIcons } from '@expo/vector-icons';

const FavoriteScreen = ()=>{
    const { state,updateFavorite } = useContext(favoriteContext);
    const updatedKey = state.key;
    const [favorites,setFavorites] = useState([]);
    const [isLoading,setIsloading] = useState(true);
    const [showanswer,setShowanswer] = useState(false);
    const [text,setText] = useState('Empty Favorite List');
    const [showText,setShowText] = useState(false);
    const toggleSwitch = () => setShowanswer(previousState => !previousState);
    
    const loadFavorites = async()=>{
        try{
            await AsyncStorage.getItem('favoriteList',(err,result)=>{
                if(result !== null){
                    fetchFavorite(result);
                }else{
                    setShowText(true);
                }
            });
           }catch(err){
            console.log(err);
        }

    }

    const fetchFavorite = async(keys)=>{
        const {data} = await favoriteApi.get(`/get-favorite-list/${keys}`);
        setFavorites(data);
        setIsloading(false);
    }


    const showToast=()=>{
        ToastAndroid.showWithGravity(
            "Item Removed",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
    }

    const removeFavorite = async(id)=>{
        try{
            await AsyncStorage.getItem('favoriteList',(err,result)=>{
                if(result !== null){
                    const newIds = JSON.parse(result).filter(item => item !== id);
                    AsyncStorage.setItem('favoriteList',JSON.stringify(newIds));
                }
            });
        }catch(err){
            alert(err);
        }finally{
            showToast();
            updateFavorite(id);
        }
    }

    useEffect(()=>{
        if(updatedKey === undefined){
            loadFavorites();
        }else{
            loadFavorites();
        }
    },[updatedKey])

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
                <View>
                <TouchableOpacity
                style={{flexDirection:'row',justifyContent:'flex-end'}}
                onPress={()=>removeFavorite(item._id)}
                >
                <MaterialIcons name="close" size={22} color={COLORS.blue} />
                </TouchableOpacity>
                </View>
                <Text style={{fontWeight:'bold',fontSize:15,color:COLORS.black}}>{item.question}</Text>
                <View>
                <FlatList 
                data={item.options}
                keyExtractor={item=>item._id}
                renderItem={({item})=>{
                    return(
                        <View style={{flexDirection:'row',paddingVertical:5,alignItems:'center'}}>
                            <View style={{
                                backgroundColor:item.isCorrect && showanswer?COLORS.darkgreen:'gray',
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
            <Text style={{color:COLORS.darkgray,fontSize:13}}>{item.describe?item.describe:''}</Text>
            </View>
        </View>
        )

    }



    return(
        <View style={styles.container}>

            {showText?(
              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                  <Text style={{
                      fontWeight:'bold',
                      fontSize:22,
                      color:COLORS.gray
                  }}>{text}</Text>
              </View>  
            ):(
             <>
            <View style={{flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                <Text style={{fontWeight:'bold',marginRight:5}}>Answer Mode</Text>
            <Switch
                trackColor={{ false: "#767577", true: COLORS.darkgreen }}
                thumbColor={showanswer ? COLORS.lightBlue : COLORS.blue}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={showanswer}
            />
            </View>
            {isLoading?<ActivityIndicator size="large" color={COLORS.blue} />:
            <FlatList
            data={favorites}
            keyExtractor={item=>item._id}
            renderItem={renderItem}
            numColumns={1}
            />
            }
           </>
        )}
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
export default FavoriteScreen;