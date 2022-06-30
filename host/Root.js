import * as React from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ReanimatedComponent } from "./ReanimatedComponent";
const App1 = React.lazy(() => import("app1/App.js"));
const App2 = React.lazy(() => import("app2/App.js"));

function App1Wrapper() {
  return (
    <React.Suspense
      fallback={<Text style={{ textAlign: "center" }}>Loading app1...</Text>}
    >
      <App1 />
    </React.Suspense>
  );
}

function App2Wrapper() {
  return (
    <React.Suspense
      fallback={<Text style={{ textAlign: "center" }}>Loading app2...</Text>}
    >
      <App2 />
    </React.Suspense>
  );
}

const Tab = createBottomTabNavigator();

export default function Root() {
  return (
    <NavigationContainer>
      <ReanimatedComponent backgroundColor="red" />
      <Tab.Navigator initialRouteName="App1">
        <Tab.Screen name="App1" component={App1Wrapper} />
        <Tab.Screen name="App2" component={App2Wrapper} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
