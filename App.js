import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginPage } from './src/pages/LoginPage';
import TripsPage from './src/pages/TripsPage';
import PlacesPage from './src/pages/PlacesPage';
import PackingPage from './src/pages/PackingPage';
import GoalsPage from "./src/pages/GoalsPage";
import RoutesPage from "./src/pages/RoutesPage";

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
      <Stack.Screen
          name="Trips"
          component={TripsPage}
      />
      <Stack.Screen
          name="Places"
          component={PlacesPage}
      />
      <Stack.Screen
          name="Packing"
          component={PackingPage}
      />
        <Stack.Screen
          name="Goals"
          component={GoalsPage}
      />
        <Stack.Screen
          name="Routes"
          component={RoutesPage}
      />
    </Stack.Navigator>
  </NavigationContainer>);
}