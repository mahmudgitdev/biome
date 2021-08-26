import React,{useState,useEffect,useContext} from 'react';
import { 
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    ImageBackground,
    Button
} from 'react-native';
import questionApi from '../api/baseApi';
import {COLORS,icons,SIZES} from '../constants';
import { Ionicons } from '@expo/vector-icons';

const ModelTestScreen = ({route,navigation})=>{
    const id = route.params.tropicsId
    const [questions,setQuestions] = useState([]);
    const [isLoading,setIsloading] = useState(true);
    const [score,setScore] =  useState(0);
    const [currentQuestion,setCurrentQuestion] = useState(0);
    const [colorA,setColorA] = useState('gray');
    const [colorB,setColorB] = useState('gray');
    const [colorC,setColorC] = useState('gray');
    const [colorD,setColorD] = useState('gray');
    const [isShowScore, setShowScore] = useState(false);
    const [scoreText,setScoreText] = useState('');


    const loadQuestions = async()=>{
        const {data} = await questionApi.get(`/get-questions/${id}`);
        setQuestions(data);
        setIsloading(false);

    }

    const handleAnswer = (isCorrect,qop)=>{
        if(qop == 'A'){
            setColorA(COLORS.darkgreen);
        }else if(qop == 'B'){
            setColorB(COLORS.darkgreen);
        }else if(qop == 'C'){
            setColorC(COLORS.darkgreen);
        }else if(qop == 'D'){
            setColorD(COLORS.darkgreen);
        }
        if(isCorrect){
            setScore(score+1);
        }
        const nextQuestion = currentQuestion +1;

        if(nextQuestion < questions.length){
            setTimeout(()=>{
                setCurrentQuestion(nextQuestion);
                setColorA('gray');
                setColorB('gray');
                setColorC('gray');
                setColorD('gray');
            },300)
        }else{
            if(score == questions.length || score == questions.length-1 || score == questions.length-2 || score == questions.length-3 ){
                setScoreText('Outstanding!! Impressive!!');
            }else if(score == questions.length -4 || score == questions.length-5 || score == questions.length-6){
                setScoreText('Excellent!! Great!!');
            }else if(score >= questions.length/2){
                setScoreText('Below Satisfactory');
            }else if (score < questions.length/2) {
                setScoreText('Average!!');
            }
            else if(score <= 0){
                setScoreText('Opps! Please Study First');
            }
            setShowScore(true);
        }

    }

    useEffect(()=>{
        loadQuestions();
    },[]);

    return(
        <View style={styles.container}>
        {isShowScore?(
            <ImageBackground 
            source={icons.resultbg}
            style={{
                flex:1,
                resizeMode: "cover",
                justifyContent: "center",
                width:SIZES.width,
                height:SIZES.height
                
            }}
            >
                <View style={{
                    width:SIZES.width/2+100,
                    alignSelf:'center',
                    borderRadius:10,
                    }}>
                   <View style={{flexDirection:'column',justifyContent:'center',alignSelf:'center',paddingVertical:15}}>
                    <Text style={{fontSize:22,fontWeight:'bold',color:COLORS.yellow,paddingBottom:10}}>{scoreText}</Text>
                     <Text style={{fontWeight:'bold',fontSize:25,textAlign:'center',color:COLORS.lightGray}}>Score</Text>
                     <Text style={{fontWeight:'bold',fontSize:30,textAlign:'center',color:COLORS.darkgreen}}>{score}</Text>
                     <Text style={{fontWeight:'bold',fontSize:25,textAlign:'center',color:COLORS.lightGray}}>Out of {questions.length}</Text>
                   </View>
                   <View style={{flexDirection:'row',justifyContent:'space-evenly',paddingVertical:10}}>
                       <View style={{flexDirection:'row',alignItems:'center'}}>
                       <Ionicons style={{marginRight:5}} name="radio-button-on" size={24} color={COLORS.darkgreen} />
                       <Text style={{fontWeight:'bold',color:COLORS.darkgreen}}>Currect: {score}</Text>
                       </View>
                       <View style={{flexDirection:'row',alignItems:'center'}}>
                       <Ionicons style={{marginRight:5}} name="radio-button-on" size={24} color={COLORS.peach} />
                       <Text style={{fontWeight:'bold',color:COLORS.peach}}>Wrong: {questions.length - score}</Text>
                       </View>
                       
                   </View>
                </View>
                <View style={{justifyContent:'center',alignSelf:'center',marginTop:5}}>
                    <TouchableOpacity
                    onPress={()=>navigation.push('solutions',{
                        questions:questions
                    })}
                    style={{
                        width:150,
                        backgroundColor:COLORS.darkgreen,
                        borderRadius:8,
                        padding:8
                    }}
                    >
                        <Text style={{color:COLORS.lightGray,fontWeight:'bold',fontSize:18,alignSelf:'center',letterSpacing:1}}>SOLUTIONS</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        ):(
        <>
        {isLoading?(
            <View>
                <ActivityIndicator size="large" color={COLORS.blue} />
            </View>
        ):(
        <>
        <View style={{paddingVertical:6,backgroundColor:COLORS.lightBlue}}>
            <Text style={{
                fontWeight:'bold',
                fontSize:15,
                alignSelf:'center',
                padding:5,
                color:COLORS.primary
            }}>Time Remaining : 20min</Text>
        </View>

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
            <View style={{paddingVertical:10}}>
                <Text style={{
                    fontWeight:'bold',
                    fontSize:22,
                    color:COLORS.blue
                }}>Question {currentQuestion + 1}/{questions.length}</Text>
            </View>
            <Text style={{fontWeight:'bold',fontSize:20,color:COLORS.primary}}>{questions[currentQuestion].question}</Text>
                <View style={{
                    padding:15
                }}>
                <TouchableOpacity
                    onPress={()=>handleAnswer(questions[currentQuestion].options[0].isCorrect,questions[currentQuestion].options[0].qop)}
                     style={{
                        flexDirection:'row',
                        paddingVertical:8,
                        alignItems:'center',
                        }}>
                        <View style={{
                            backgroundColor:colorA,
                            width:33,
                            height:33,
                            borderRadius:40,
                            marginRight:10,
                            justifyContent:'center'
                            }}>
                        
                        <Text 
                        style={{
                            alignSelf:'center',
                            color:'white',
                            fontSize:16,
                            fontWeight:'bold'
                        }}>{questions[currentQuestion].options[0].qop}</Text>
                        </View>
                        <Text 
                        style={{
                            fontSize:20,
                            fontWeight:'600',
                            color:COLORS.primary
                            }}>{questions[currentQuestion].options[0].option}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>handleAnswer(questions[currentQuestion].options[1].isCorrect,questions[currentQuestion].options[1].qop)}
                     style={{
                        flexDirection:'row',
                        paddingVertical:8,
                        alignItems:'center',
                        }}>
                        <View style={{
                            backgroundColor:colorB,
                            width:33,
                            height:33,
                            borderRadius:40,
                            marginRight:10,
                            justifyContent:'center'
                            }}>
                        
                        <Text 
                        style={{
                            alignSelf:'center',
                            color:'white',
                            fontSize:16,
                            fontWeight:'bold'
                        }}>{questions[currentQuestion].options[1].qop}</Text>
                        </View>
                        <Text 
                        style={{
                            fontSize:20,
                            fontWeight:'600',
                            color:COLORS.primary
                            }}>{questions[currentQuestion].options[1].option}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>handleAnswer(questions[currentQuestion].options[2].isCorrect,questions[currentQuestion].options[2].qop)}
                     style={{
                        flexDirection:'row',
                        paddingVertical:8,
                        alignItems:'center',
                        }}>
                        <View style={{
                            backgroundColor:colorC,
                            width:33,
                            height:33,
                            borderRadius:40,
                            marginRight:10,
                            justifyContent:'center'
                            }}>
                        
                        <Text 
                        style={{
                            alignSelf:'center',
                            color:'white',
                            fontSize:16,
                            fontWeight:'bold'
                        }}>{questions[currentQuestion].options[2].qop}</Text>
                        </View>
                        <Text 
                        style={{
                            fontSize:20,
                            fontWeight:'600',
                            color:COLORS.primary
                            }}>{questions[currentQuestion].options[2].option}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>handleAnswer(questions[currentQuestion].options[3].isCorrect,questions[currentQuestion].options[3].qop)}
                     style={{
                        flexDirection:'row',
                        paddingVertical:8,
                        alignItems:'center',
                        }}>
                        <View style={{
                            backgroundColor:colorD,
                            width:33,
                            height:33,
                            borderRadius:40,
                            marginRight:10,
                            justifyContent:'center'
                            }}>
                        
                        <Text 
                        style={{
                            alignSelf:'center',
                            color:'white',
                            fontSize:16,
                            fontWeight:'bold'
                        }}>{questions[currentQuestion].options[3].qop}</Text>
                        </View>
                        <Text 
                        style={{
                            fontSize:20,
                            fontWeight:'600',
                            color:COLORS.primary
                            }}>{questions[currentQuestion].options[3].option}</Text>
                </TouchableOpacity>

                </View>
                    
            </View>
            </>
        )}
          </>
        )}
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLORS.lightGray2,
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
export default ModelTestScreen;