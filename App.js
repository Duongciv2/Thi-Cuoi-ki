import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CostListScreen from './screens/CostListScreen';
import CostDetailScreen from './screens/CostDetailScreen';
import AddCostScreen from './screens/AddCostScreen';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="CostList">
                <Stack.Screen name="CostList" component={CostListScreen} />
                <Stack.Screen name="CostDetail" component={CostDetailScreen} />
                <Stack.Screen name="AddCost" component={AddCostScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
