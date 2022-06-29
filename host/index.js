console.log("index.js")
import { AppRegistry, Platform } from 'react-native';
import { name as appName } from './app.json';
import { ChunkManager } from '@callstack/repack/client';
__repack__.__ChunkManager = ChunkManager

if(!__webpack_share_scopes__.default) {
   __webpack_init_sharing__('default');
}

console.log('__webpack_share_scopes__', __webpack_share_scopes__);
ChunkManager.configure({
  forceRemoteChunkResolution: true,
  resolveRemoteChunk: async (chunkId, parentId) => {
    let url;

    switch (parentId) {
      case 'app1':
        url = `http://localhost:9000/${chunkId}.chunk.bundle`;
        break;
      case 'app2':
        url = `http://localhost:9001/${chunkId}.chunk.bundle`;
        break;
      case 'main':
      default:
        url =
          {
            // containers
            app1: 'http://localhost:9000/app1.container.bundle',
            app2: 'http://localhost:9001/app2.container.bundle',
          }[chunkId] ?? `http://localhost:8081/${chunkId}.chunk.bundle`;
        break;
    }

    return {
      url,
      query: {
        platform: Platform.OS,
      },
      excludeExtension: true,
    };
  },
});

import Bootstrap from './bootstrap';


AppRegistry.registerComponent(appName, () => Bootstrap);
