import * as React from 'react';
console.log("bootstrap.js");

const Root = React.lazy(() => import('./Root'));

export default function Bootstrap() {
  return <React.Suspense fallback={null}>
    <Root />
  </React.Suspense>
}
