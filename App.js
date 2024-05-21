import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CandidateListScreen from './screens/CandidateListScreen';
import AddCandidateScreen from './screens/AddCandidateScreen';
import CandidateDetailScreen from './screens/CandidateDetailScreen';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="CandidateList">
                <Stack.Screen name="CandidateList" component={CandidateListScreen} options={{ title: 'Danh Sách Ứng Viên' }} />
                <Stack.Screen name="AddCandidate" component={AddCandidateScreen} options={{ title: 'Thêm ứng viên' }} />
                <Stack.Screen name="CandidateDetail" component={CandidateDetailScreen} options={{ title: 'Thông tin chi tiết ứng viên' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
