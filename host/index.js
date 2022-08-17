import { AppRegistry, Platform } from "react-native";
import { name as appName } from "./app.json";
import { ChunkManager } from "@callstack/repack/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

__repack__.__ChunkManager = ChunkManager;
__repack__.AsyncStorage = AsyncStorage;

if (!__webpack_share_scopes__.default) {
  __webpack_init_sharing__("default");
}

const HOST = Platform.OS === 'android' ? '10.0.2.2' : 'localhost'

ChunkManager.configure({
  storage: AsyncStorage,
  forceRemoteChunkResolution: true,
  resolveRemoteChunk: async (chunkId, parentId) => {
    let url;

    switch (parentId) {
      case "app1":
        url = `http://${HOST}:9000/${chunkId}.chunk.bundle`;
        break;
      case "app2":
        url = `http://${HOST}:9001/${chunkId}.chunk.bundle`;
        break;
      case "main":
      default:
        url =
          {
            // containers
            app1: `http://${HOST}:9000/app1.container.bundle`,
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

import Bootstrap from "./bootstrap";

AppRegistry.registerComponent(appName, () => Bootstrap);
