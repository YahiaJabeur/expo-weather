import { clearStorage } from "@/libs/localStorage";
import { Button } from "react-native";

export const DevButton = () => {
  return (
    <Button
      onPress={clearStorage}
      title="Dev button - Clear storage and refresh Application"
    />
  );
};
