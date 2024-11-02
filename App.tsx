import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/Login";
import HomeScreen from "./src/HomeScreen";
import { StatusBar } from "react-native";
import UserList from "./src/UserList";
import ProductListScreen from "./src/ProductListScreen";
import UserRegisterScreen from "./src/UserRegisterScreen";
import MovementRegisterScreen from "./src/MovementRegisterScreen";
import DriverMovementsList from "./src/DriverMovementsList";
import MovementsList from "./src/MovementsList";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#50CC8C" />
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="UserList" component={UserList} options={{ headerShown: false }}/>
        <Stack.Screen name="ProductList" component={ProductListScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="MovementsList" component={MovementsList} options={{ headerShown: false }}/>
        <Stack.Screen name="UserRegister" component={UserRegisterScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="DriverMovementsList"component={DriverMovementsList} options={{ headerShown: false }}/>
        <Stack.Screen name="MovementRegisterScreen" component={MovementRegisterScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
