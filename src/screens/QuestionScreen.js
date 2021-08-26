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
import questionApi from '../api/baseApi';
import {COLORS, SIZES} from '../constants';
import { MaterialIcons } from '@expo/vector-icons';
import { Context as favoriteContext } from '../context/FavoriteContext';
import AsyncStorage from '@react-native-community/async-storage';
const QuestionScreen = ({route})=>{
    const { updateFavorite } = useContext(favoriteContext);
    const id = route.params.tropicsId
    const [questions,setQuestions] = useState([]);
    const [isLoading,setIsloading] = useState(true);
    const [showanswer,setShowanswer] = useState(false)

    const toggleSwitch = () => setShowanswer(previousState => !previousState);




    const loadQuestions = async()=>{
        const {data} = await questionApi.get(`/get-questions/${id}`);
        setQuestions(data);
        setIsloading(false);

    }
    const setToFavorite = async(qid)=>{
        const id = [qid];
        try{
        await AsyncStorage.getItem('favoriteList',(err,result)=>{
            if(result !== null){
                var newIds = JSON.parse(result).concat(id);
                 AsyncStorage.setItem('favoriteList',JSON.stringify(newIds));
            }else{
                 AsyncStorage.setItem('favoriteList',JSON.stringify(id));
            }
        });
        }catch(err){
            console.log(err)
        }finally{
            showToast();
            updateFavorite(qid);
        }
    }




    useEffect(()=>{
        loadQuestions();
    },[]);



    const showToast=()=>{
        ToastAndroid.showWithGravity(
            "Favorite Added",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
    }

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
                onPress={()=>setToFavorite(item._id)}
                >
                <MaterialIcons name="favorite-border" size={22} color={COLORS.blue} />
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
            data={questions}
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
export default QuestionScreen;