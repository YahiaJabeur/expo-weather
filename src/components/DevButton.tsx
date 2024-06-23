import * as Updates from "expo-updates";
import { Button } from "react-native";

import { clearStorage } from "@/libs/localStorage";

export const DevButton = () => {
  const resetApp = () => {
    clearStorage();
    Updates.reloadAsync();
  };

  return (
    <Button
      onPress={resetApp}
      title="Dev button - Clear storage and refresh Application"
    />
  );
};
