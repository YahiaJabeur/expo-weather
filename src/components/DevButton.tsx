import { Button } from "react-native";

import { clearStorage } from "@/libs/localStorage";

export const DevButton = () => {
  return (
    <Button
      onPress={clearStorage}
      title="Dev button - Clear storage and refresh Application"
    />
  );
};
