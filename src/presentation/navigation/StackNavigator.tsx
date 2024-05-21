import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { LoadingScreen } from '../screens/loading/LoadingScreen';
import { MapsScreen } from '../screens/maps/MapsScreen';
import { PermissionScreen } from '../screens/permissions/PermissionScreen';

export type RootStackParams = {
    LoadingScreen: undefined,
    MapsScreen: undefined,
    PermissionScreen: undefined
  }
  
const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator 
    initialRouteName='PermissionScreen'
    screenOptions={{
      headerShown: false,
      cardStyle: {
        backgroundColor: 'white'
      }
    }}>
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
      <Stack.Screen name="MapsScreen" component={MapsScreen} />
      <Stack.Screen name="PermissionScreen" component={PermissionScreen} />
    </Stack.Navigator>
  )
}