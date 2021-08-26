import React,{ useState, useRef,useEffect } from 'react';
import 
{   
    Image, 
    SafeAreaView, 
    Text, 
    View,
    TouchableOpacity,
    FlatList,
    Animated,
    StyleSheet,
    ActivityIndicator,
    ScrollView
} from 'react-native';
//import icons
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import {icons,COLORS,SIZES} from '../constants';
import { AntDesign } from '@expo/vector-icons';
import {categories} from '../localdata/data';
//import api
import jobNewsApi from '../api/baseApi';
import { format } from "date-fns";


const HomeScreen = ({ navigation }) =>{


    const categoryListHeightAnimationValue = useRef(new Animated.Value(200)).current;

    const [showMoreToggle, setShowMoreToggle] = useState(false)
    const [isLoadingCircular,setIsLoadingCircular] = useState(true);
    const [jobNews,setJobNews] = useState(['']);


    const loadJobNews = async()=>{
        const {data} = await jobNewsApi.get('/get-all-circular');

        setJobNews(data);
        setIsLoadingCircular(false);
    }

    useEffect(() => {
        loadJobNews();
    }, [0])

    //render header component
    const renderHeader=()=>{
        return(
            <View style={{
                flexDirection:'row',
                justifyContent:'space-between',
                paddingHorizontal:8,
                paddingVertical:25,
                alignItems:'center',
                

                }}>
                <View style={{alignSelf:'center',justifyContent:'center'}}>
                <Ionicons 
                style={{paddingLeft:0,alignSelf:'center'}}
                name="ios-menu"
                 size={40}
                 color={COLORS.blue}
                  onPress={()=>{navigation.openDrawer()}}
                   />
                </View>
                <View>
                <Image 
                source={icons.biome}
                style={{
                    width:145,
                    height:65,
                    resizeMode:'contain',
                    alignSelf:'center'
                }}
                />
                </View>
                
                <View>
                <Feather name="more-vertical" size={24} color={COLORS.blue} />
                </View>
            </View>
        )
    }

    //render News component
    const renderNews = ()=>{
        return(
        <View style={{paddingHorizontal:8,paddingBottom:15}}>
            <View style={{
                flexDirection:'row',
                paddingHorizontal:5,
                alignItems:'center',
                paddingBottom:10
                }}>
            <AntDesign name="calendar" size={28} color={COLORS.blue} />
            <Text style={{
                fontWeight:'bold',
                fontSize:22,
                marginLeft:5,
                color:COLORS.black
                }}>Job Circular</Text>
            </View>
            {isLoadingCircular?<ActivityIndicator size="large" color={COLORS.blue} /> :
            <FlatList
            data={jobNews}
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
                    backgroundColor: COLORS.white,
                    borderWidth:.5,
                    borderColor:COLORS.lightBlue,
                    ...styles.shadow
                }}
            >
                <View>
                    <Text
                    style={{fontWeight:'bold',fontSize:18,color:COLORS.primary}}
                    >{item.title}</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={{
                        color:COLORS.blue,
                        fontSize:15,
                        fontWeight:'600'
                    }}>Company : {item.company}</Text>
                    <AntDesign style={{marginLeft:5}} name="doubleright" size={13} color={COLORS.blue} />
                    <Text style={{fontSize:13,color:COLORS.yellow}}>Details</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{fontSize:12,color:COLORS.gray}}>Publish: {format(new Date(item.publish), "MMMM do, yyyy")}</Text>
                    
                </View>
            </TouchableOpacity>
            )
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            />}
        <View style={{flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
            <TouchableOpacity onPress={()=>navigation.push('allCircular')}>
            <Text style={{fontWeight:'bold',color:COLORS.darkgreen}}>See all</Text>
            </TouchableOpacity>
            <AntDesign style={{marginLeft:5}} name="doubleright" size={12} color={COLORS.darkgreen} />
        </View>
        </View>
        )
    }

    const renderCategories=()=>{
        return <View style={{ paddingHorizontal: SIZES.padding }}>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',paddingBottom:10}}>
            <FontAwesome5 name="book" size={26} color={COLORS.blue} />
            <Text style={{
                fontWeight:'bold',
                fontSize:20,
                marginLeft:5,
                color:COLORS.black
                }}>Study Categories</Text>
            </View>
            <Animated.View style={{ height: categoryListHeightAnimationValue }}>
                <ScrollView
                horizontal={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    justifyContent:'flex-start',
                    flexDirection:'row',
                    flexWrap:'wrap'
                }}
                >
                <TouchableOpacity
                    onPress={() =>navigation.push('BcsStudyTropics',{
                        title:categories[0].name
                    })}
                    style={styles.viewStyle}
                >
                    <Image
                        source={categories[0].icon}
                        style={styles.imageStyle}
                    />
                <Text style={styles.textStyle}>{categories[0].name}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() =>navigation.push('BankCategories')}
                    style={styles.viewStyle}
                >
                    <Image
                        source={categories[1].icon}
                        style={styles.imageStyle}
                    />
                <Text style={styles.textStyle}>{categories[1].name}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() =>navigation.push('StudyTropics',{
                        title:categories[2].name,
                        id:categories[2].id
                    })}
                    style={styles.viewStyle}
                >
                    <Image
                        source={categories[2].icon}
                        style={styles.imageStyle}
                    />
                <Text style={styles.textStyle}>{categories[2].name}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() =>navigation.push('ModelTest',{
                        title:categories[3].name,
                        id:categories[3].id
                    })}
                    style={styles.viewStyle}
                >
                    <Image
                        source={categories[3].icon}
                        style={styles.imageStyle}
                    />
                <Text style={styles.textStyle}>{categories[3].name}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() =>navigation.push('StudyTropics',{
                        title:categories[4].name,
                        id:categories[4].id
                    })}
                    style={styles.viewStyle}
                >
                    <Image
                        source={categories[4].icon}
                        style={styles.imageStyle}
                    />
                <Text style={styles.textStyle}>{categories[4].name}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() =>navigation.push('StudyTropics',{
                        title:categories[5].name,
                        id:categories[5].id
                    })}
                    style={styles.viewStyle}
                >
                    <Image
                        source={categories[5].icon}
                        style={styles.imageStyle}
                    />
                <Text style={styles.textStyle}>{categories[5].name}</Text>
                </TouchableOpacity>



                </ScrollView>

                
            </Animated.View>

            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    marginVertical: SIZES.base,
                    justifyContent: 'center'
                }}
                onPress={() => {
                    if (showMoreToggle) {
                        Animated.timing(categoryListHeightAnimationValue, {
                            toValue: 200,
                            duration: 500,
                            useNativeDriver: false
                        }).start()
                    } else {
                        Animated.timing(categoryListHeightAnimationValue, {
                            toValue: 310,
                            duration: 500,
                            useNativeDriver: false
                        }).start()
                    }

                    setShowMoreToggle(!showMoreToggle)
                }}
            >   
                <View style={{flexDirection:'column',alignItems:'center'}}>
                <Text>{showMoreToggle ? "LESS" : "MORE"}</Text>
                {showMoreToggle ? <AntDesign name="arrowup" size={18} color="black" /> : <AntDesign name="arrowdown" size={18} color="black" />}
                </View>
            </TouchableOpacity>
        </View>
   }


    return(
        <SafeAreaView style={styles.container}>
        {renderHeader()}
        {renderNews()}
        {renderCategories()}
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:COLORS.lightGray,
        flex:1
    },
    viewStyle:{
        width:SIZES.width/2-34,
        flexDirection: 'column',
        margin: 5,
        paddingVertical: SIZES.radius,
        paddingHorizontal: SIZES.padding,
        borderRadius: 5,
        backgroundColor: COLORS.white,
        justifyContent:'center',
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
        marginLeft: SIZES.base,
        color: COLORS.primary,
        alignSelf:'center',
        justifyContent:'center',
        fontSize:15,
        fontWeight:'bold',
        marginTop:6 
    },
    imageStyle:{
        width: 40,
        height: 40
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
export default HomeScreen;