import * as React from "react";

const Root = React.lazy(() => import("./Root"));

export default function Bootstrap() {
  return (
    <React.Suspense fallback={null}>
      <Root />
    </React.Suspense>
  );
}
