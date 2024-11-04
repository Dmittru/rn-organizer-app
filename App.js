import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginPage } from './src/pages/LoginPage';

const Stack = createStackNavigator();
export default function App() {
  return (<NavigationContainer>
    <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#6a87a5'
          },
          headerTintColor: '#f3f3f3',
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: 'bold'
          }
        }}
    >
      <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{
            headerShown: false,
          }}
      />
      {/* <Stack.Screen
          name="UserDesc"
          component={UserDesc}
      /> */}
    </Stack.Navigator>
  </NavigationContainer>);
}