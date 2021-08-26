import React,{useState,useEffect} from 'react';
import{
Text,
View,
StyleSheet,
ActivityIndicator
} from 'react-native';
import {COLORS,SIZES} from '../constants';
import jobNewsApi from '../api/baseApi';
import { FlatList } from 'react-native-gesture-handler';
import HTML from "react-native-render-html";
import { format } from "date-fns";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
const jobNewsDetails = ({route,navigation})=>{

  const {id} = route.params;
  const [loading,setLoading] = useState(true);
  const [singleCircular,setSingleCircular] = useState({});


    const loadSingleCircular = async ()=>{
        const {data} = await jobNewsApi.get(`/get-single-circular/${id}`);
        setSingleCircular(data);
        setLoading(false);
    }
    useEffect(() => {
      loadSingleCircular();
    }, [0])


    const renderItem = ({item})=>{

        return(
            <View style={styles.jobInfoStyle}>
                <View style={{paddingBottom:SIZES.height/3}}>
                <Text style={{
                    fontWeight:'600',
                    fontSize:24,
                    color:COLORS.blue
                }}
                    >Job information</Text>
                <View style={{
                    paddingVertical:10
                }}>
                <Text style={{fontWeight:'bold',fontSize:15}}>Responsibilities : </Text>
                <HTML 
                source={{ html: item.responsibilities?item.responsibilities:'<h3>N/A</h3>' }} 
                contentWidth={SIZES.width} 
                />
                </View>
                <View>
                <Text style={{fontWeight:'bold',fontSize:16}}>Educational Requirement : </Text>
                <HTML 
                source={{ html: item.edurequirement?item.edurequirement:'<h3>N/A</h3>' }} 
                contentWidth={SIZES.width}
                 />
                </View>
                <View>
                <Text style={{fontWeight:'bold',fontSize:16}}>Experience Requirement : </Text>
                <HTML 
                source={{ html: item.exprequirement?item.exprequirement:'<h3>N/A</h3>' }} 
                contentWidth={SIZES.width}
                 />
                </View>
                <View>
                <Text style={{fontWeight:'bold',fontSize:16}}>Additional Requirement : </Text>
                <HTML 
                source={{ html: item.additionalrequirement?item.additionalrequirement:'<h3>N/A</h3>' }} 
                contentWidth={SIZES.width}
                 />
                </View>
                <Text style={{fontWeight:'bold',fontSize:16}}>Job Nature : {item.employmentstatus}</Text>
               
                <View>
                <Text style={{fontWeight:'bold',fontSize:16}}>Compensation and Other Benefits : </Text>
                <HTML 
                source={{ html: item.benefits?item.benefits:'<h4>N/A</h4>' }}
                contentWidth={SIZES.width}
                 />
                </View>
                <View>
                <Text style={{fontWeight:'bold',fontSize:16}}>Company Information : </Text>
                <HTML 
                source={{ html: item.companyInformation?item.companyInformation:'<h4>N/A</h4>' }}
                contentWidth={SIZES.width}
                 />
                </View>
                </View>
            </View>

        )
    }







    return(
        <View style={styles.container}>
            {loading?<ActivityIndicator 
            style={{justifyContent:'center',alignSelf:'center',flex:1}} 
            size="large" color={COLORS.blue} 
            /> : <View>
                    <View 
                    style={{
                        minHeight:210,
                        backgroundColor:COLORS.lightBlue,
                    }}
                    >
                    <View style={{padding:14}}>
                    <Text style={{fontSize:20,fontWeight:'bold',color:COLORS.primary}}>{singleCircular.title}</Text>
                    <Text style={{fontSize:16,fontWeight:'bold',color:COLORS.primary,paddingVertical:3}}>{singleCircular.company}</Text>
                    </View>
                    <View style={{
                        flexDirection:'row',
                        justifyContent:'space-between',
                        alignItems:'center'}}>
                    <View style={{
                        paddingHorizontal:40,
                        paddingVertical:10,
                        flexDirection:'column',
                    }}>
                    <View style={{flexDirection:'column'}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                    <FontAwesome name="users" size={16} color={COLORS.primary} />
                    <Text style={{fontSize:16,fontWeight:'bold',color:COLORS.primary,marginLeft:3}}>Vacancies</Text>
                    </View>
                    <Text style={{
                        fontWeight:'700',
                        color:COLORS.primary,
                        fontSize:12,
                    }}>{singleCircular.vacancy?singleCircular.vacancy:'Not specific'}</Text>
                    </View>

                    <View style={{flexDirection:'column',paddingVertical:15}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                    <FontAwesome name="calendar" size={16} color={COLORS.primary} />
                    <Text style={{fontSize:16,fontWeight:'bold',color:COLORS.primary,marginLeft:3}}>Deadline</Text>
                    </View>
                    <Text style={{
                        fontWeight:'700',
                        color:COLORS.peach,
                        fontSize:12,
                    }}>{format(new Date(singleCircular.deadline), "MMMM do, yyyy")}</Text>
                    </View>
                    </View>

                    <View style={{
                        paddingHorizontal:40,
                        paddingVertical:10,
                        flexDirection:'column',
                    }}>
                    <View style={{flexDirection:'column'}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Ionicons name="md-location-outline" size={20} color={COLORS.primary} />
                    <Text style={{fontSize:16,fontWeight:'bold',color:COLORS.primary,marginLeft:3}}>Location</Text>
                    </View>
                    <Text style={{
                        fontWeight:'700',
                        color:COLORS.primary,
                        fontSize:12
                    }}>{singleCircular.location?singleCircular.location:'Not specific'}</Text>
                    </View>

                    <View style={{flexDirection:'column',paddingVertical:15}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                    <MaterialCommunityIcons name="currency-bdt" size={20} color={COLORS.primary} />
                    <Text style={{fontSize:16,fontWeight:'bold',color:COLORS.primary,marginLeft:3}}>Salary</Text>
                    </View>
                    <Text style={{
                        fontWeight:'700',
                        color:COLORS.primary,
                        fontSize:12
                    }}>{singleCircular.salary?singleCircular.salary:'Negotiable'}</Text>
                    </View>

                    </View>
                    </View>

                    </View>
                    <FlatList 
                    data={singleCircular.details}
                    keyExtractor={item=>item._id}
                    renderItem={renderItem}
                    />
            </View>}
        </View>
    )

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLORS.lightGray,
    },
    jobInfoStyle:{
        backgroundColor:COLORS.lightGray,
        paddingHorizontal:8,
        paddingVertical:10
    }

})

export default jobNewsDetails;