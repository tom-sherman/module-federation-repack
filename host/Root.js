import * as React from 'react';
import { Text, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ChunkManager } from '@callstack/repack/client';
import { ReanimatedComponent } from './ReanimatedComponent';


const HOST = Platform.OS === 'android' ? '10.0.2.2' : 'localhost'

ChunkManager.configure({
  forceRemoteChunkResolution: true,
  storage: AsyncStorage,
  resolveRemoteChunk: async (chunkId, parentId) => {
    let url;

    switch (parentId) {
      case 'app1':
        url = `http://${HOST}:3000/${chunkId}.chunk.bundle`;
        break;
      case 'app2':
        url = `http://${HOST}:9001/${chunkId}.chunk.bundle`;
        break;
      case 'main':
      default:
        url =
          {
            // containers
            app1: `http://${HOST}:3000/app1.container.bundle`,
            app2: `http://${HOST}:9001/app2.container.bundle`,
          }[chunkId] ?? `http://${HOST}:8081/${chunkId}.chunk.bundle`;
        break;
    }
    console.log('resolveRemoteChunk', {
      chunkId, parentId, url
    })
    return {
      url,
      query: {
        platform: Platform.OS,
      },
      excludeExtension: true,
    };
  },
});

async function loadComponent(scope, module) {
  // Initializes the share scope. This fills it with known provided modules from this build and all remotes
  await __webpack_init_sharing__('default');
  // Download and execute container
  await ChunkManager.loadChunk(scope, 'main');

  const container = self[scope];

  // Initialize the container, it may provide shared modules
  await container.init(__webpack_share_scopes__.default);
  const factory = await container.get(module);
  const exports = factory();
  return exports;
}

const App1 = React.lazy(() => loadComponent('app1', './App.js'));

const App2 = React.lazy(() => loadComponent('app2', './App.js'));

function App1Wrapper() {
  return (
    <React.Suspense
      fallback={<Text style={{ textAlign: 'center' }}>Loading...</Text>}
    >
      <App1 />
    </React.Suspense>
  );
}

function App2Wrapper() {
  return (
    <React.Suspense
      fallback={<Text style={{ textAlign: 'center' }}>Loading...</Text>}
    >
      <App2 />
    </React.Suspense>
  );
}

const Tab = createBottomTabNavigator();

export function Root() {
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
