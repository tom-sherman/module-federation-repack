import * as React from "react";
import { Text } from "react-native";

const Root = React.lazy(() => import("./Root"));

export default function Bootstrap() {
  return (
    <React.Suspense
      fallback={
        <Text style={{ textAlign: "center", marginTop: 40 }}>
          Loading the app...
        </Text>
      }
    >
      <Root />
    </React.Suspense>
  );
}
