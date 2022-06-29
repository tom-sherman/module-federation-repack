import * as React from 'react';
import { ChunkManager } from '@callstack/repack/client';
console.log("bootstrap.js");

const Root = React.lazy(() => {
  console.log('loading app1')
  return ChunkManager.loadChunk('app1', 'main').then(() => {
    console.log('loaded app1', self.app1)
    __repack__.app1 = self.app1;
    // return ChunkManager.loadChunk('app2', 'main');
  }).then(() => {
    console.log('loaded app2')
    return import('./Root')
  })
});

export default function Bootstrap() {
  return <React.Suspense fallback={null}>
    <Root />
  </React.Suspense>
}
