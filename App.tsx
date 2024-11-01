import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/Login";
import HomeScreen from "./src/HomeScreen";
import { StatusBar } from "react-native";
import UserList from "./src/UserList";
import ProductListScreen from "./src/ProductListScreen";
import UserRegisterScreen from "./src/UserRegisterScreen";
import AddMovementScreen from "./src/AddMovementScreen";
import MovementScreen from "./src/MovementScreen";
import MovementsListScreen from "./src/MovementsListScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#50CC8C" />
      <Stack.Navigator initialRouteName="Home">
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
        <Stack.Screen name="UserList" component={UserList} />
        <Stack.Screen name="ProductList" component={ProductListScreen} />
        <Stack.Screen name="MovementList" component={MovementsListScreen} />
        <Stack.Screen name="UserRegister" component={UserRegisterScreen} />
        <Stack.Screen name="AddMovement" component={AddMovementScreen} />
        <Stack.Screen name="Movement" component={MovementScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
