import * as React from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ChunkManager } from "@callstack/repack/client";
import { ReanimatedComponent } from "./ReanimatedComponent";
import App1 from "app1/App.js";
import App2 from "app2/App.js";

async function loadComponent(scope, module) {
  // Initializes the share scope. This fills it with known provided modules from this build and all remotes
  await __webpack_init_sharing__("default");
  // Download and execute container
  // Query Reg here to resolve the semver range to a specific version and get a unique scope for that version
  await ChunkManager.loadChunk(scope, "main");

  const container = self[scope];

  // Initialize the container, it may provide shared modules
  await container.init(__webpack_share_scopes__.default);
  const factory = await container.get(module);
  const exports = factory();
  return exports;
}

function App1Wrapper() {
  return (
    <React.Suspense
      fallback={<Text style={{ textAlign: "center" }}>Loading...</Text>}
    >
      <App1 />
    </React.Suspense>
  );
}

function App2Wrapper() {
  return (
    <React.Suspense
      fallback={<Text style={{ textAlign: "center" }}>Loading...</Text>}
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
