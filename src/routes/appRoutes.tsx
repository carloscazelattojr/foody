import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '@/screens/HomeScreen';
import { WelcomeScreen } from '@/screens/WelcomeScreen';
import { RecipeDetailScreen } from '@/screens/RecipeDetailScreen';



const { Screen, Navigator } = createStackNavigator();

export function AppRoutes() {
    return (
        <NavigationContainer >
            <Navigator initialRouteName='Welcome' screenOptions={{ headerShown: false }}>
                <Screen name='Home' component={HomeScreen} />
                <Screen name='Welcome' component={WelcomeScreen} />
                <Screen name='RecipeDetail' component={RecipeDetailScreen} />
            </Navigator>
        </NavigationContainer>
    );
}
