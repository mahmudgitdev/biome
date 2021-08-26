import React,{useState,useEffect} from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
//import screen
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import BcsStudyTropics from '../screens/BcsStudyTropics';
import jobNewsDetails from '../screens/JobNewsDetails';
import QuestionScreen from '../screens/QuestionScreen';
import BankCategoryScreen from '../screens/BankCategoryScreen';
import BankTropicsScreen from '../screens/BankTropicsScreen';
import AllCircularScreen from '../screens/AllCircularScreen';
import BcsTestTropics from '../screens/BcsTestTropics';
import ModelTestScreen from '../screens/ModelTestScreen';
import SolutionScreen from '../screens/SolutionScreen';
// import JobNewsScreen from '../screens/JobNewsScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import ModelTestCatScreen from '../screens/ModelTestCatScreen';
//import component
import DrawerContent from '../components/DrawerContent';
//import constant
import { COLORS,icons } from '../constants';
import { Text, View } from 'react-native';


//create navigator
const HomeStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      border: 'transparent',
    },
  };
  const HomeStackScreen = ({navigation})=>{
    return(
      <HomeStack.Navigator>
        <HomeStack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          headerShown:false,
       }}
         />
      <HomeStack.Screen 
      name="jobDetails" 
      component={jobNewsDetails} 
      options={{
        title:'Circular Details',
        headerStyle:{
          backgroundColor:COLORS.blue
        }
      }}
      />
        <HomeStack.Screen 
        name="BcsStudyTropics"  
        component={BcsStudyTropics}
        options={({route})=>({
          title: route.params.title,
          headerStyle:{
            backgroundColor:COLORS.blue,
          },
          headerTintColor:COLORS.black
        })
      }
        />
      <HomeStack.Screen 
      name="question"
      component={QuestionScreen}
      options={({route})=>({
        title: route.params.title,
        headerStyle:{
          backgroundColor:COLORS.blue
        }
      })
    }
      />

    <HomeStack.Screen 
       name="BankCategories"
       component={BankCategoryScreen} 
       options={{
         title:"Bank Job Study",
         headerStyle:{
           backgroundColor:COLORS.blue
         }
       }}
    />
        <HomeStack.Screen 
        name="BankTropicsScreen"  
        component={BankTropicsScreen}
        options={({route})=>({
          title: route.params.title,
          headerStyle:{
            backgroundColor:COLORS.blue
          }
        })
      }
        />
      <HomeStack.Screen
      name="allCircular"
      component={AllCircularScreen}
      options={{
        title:"All Job Circular",
        headerStyle:{
          backgroundColor:COLORS.blue
        }
      }}
      />
    <HomeStack.Screen
      name="ModelTest"
      component={ModelTestCatScreen}
      options={({route})=>({
        title: route.params.title,
        headerStyle:{
          backgroundColor:COLORS.blue
        }
      })
    }
    />
    <HomeStack.Screen
      name="bcstest"
      component={BcsTestTropics}
      options={({route})=>({
        title: 'Bcs Model Test',
        headerStyle:{
          backgroundColor:COLORS.blue
        }
      })
    }
    />
    <HomeStack.Screen
      name="modeltest"
      component={ModelTestScreen}
      options={({route})=>({
        title: route.params.title,
        headerStyle:{
          backgroundColor:COLORS.blue
        }
      })
    }
    />
    <HomeStack.Screen
      name="solutions"
      component={SolutionScreen}
      options={{
        title:'Test Solutions',
        headerStyle:{
          backgroundColor:COLORS.blue
        }
      }}
     
    />
      </HomeStack.Navigator>
    )
  }

  
const AppNavigation = ()=>{

  const [isLoading,setIsLoading] = useState(true);

  useEffect(()=>{
    setTimeout(()=>{
      setIsLoading(false)
    },1500)
  },[0]);

  if(isLoading){
    return <SplashScreen />
  }

    return(
      <NavigationContainer theme={theme}>
        <Drawer.Navigator drawerContent={props=><DrawerContent {...props} />}>
          <Drawer.Screen name="Home" component={HomeStackScreen} />
          <Drawer.Screen 
          name="favorite"
          component={FavoriteScreen} 
          options={{
            title:'My Favorite List',
            headerShown:true,
            headerStyle:{
              backgroundColor:COLORS.blue
            }
          }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    )
        
    
}

export default AppNavigation;