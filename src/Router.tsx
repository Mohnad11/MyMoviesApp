import {createStackNavigator, TransitionPresets} from "@react-navigation/stack";
import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import SplashScreen from "./Screens/SplashScreen";
import WelcomeScreen from "./Screens/WelcomeScreen";
import PopularMoviesList from "./Screens/PopularMoviesList";
import MovieScreen from "./Screens/MovieScreen";
import FavoriteMoviesList from "./Screens/FavoriteMoviesList";
import {TouchableOpacity} from "react-native";
import HeaderBackButton from "./Components/HeaderBackButton";

function setHeader(navigation:any, route:any,title:string) {

    return ({headerStyle: {
            backgroundColor: '#356BE5',shadowColor:'#3b3b3b',shadowOpacity:0.3,shadowRadius:7,shadowOffset:{width:0,height:3}
        },
        headerTintColor: 'white',
        title:title,
        headerTitleStyle:{
            fontFamily:'Grandstander-SemiBold'
        },
        headerLeft:()=><HeaderBackButton navigation={navigation}/>,
        ...TransitionPresets.ScaleFromCenterAndroid
    })
}
function Router(){
    const Stack = createStackNavigator();
    return(
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown:false}} />
                    <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown:false,gestureEnabled:false}} />
                    <Stack.Screen name="PopularMoviesList" component={PopularMoviesList}  options={({ navigation, route })=>setHeader(navigation,route,"Popular Movies")}   />
                    <Stack.Screen name="MovieScreen" component={MovieScreen}   options={({ navigation, route })=>setHeader(navigation,route,"Popular Movies")} />
                    <Stack.Screen name="FavoriteMoviesList" component={FavoriteMoviesList}  options={({ navigation, route })=>setHeader(navigation,route,"Favorite Movies")}  />
                </Stack.Navigator>
            </NavigationContainer>
    )
}
export default Router
//FavoriteMoviesList
