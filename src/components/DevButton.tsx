import { Button } from "react-native";

import { clearStorage } from "../libs/localStorage";

export const DevButton = () => {
  const clearAndRefresh = async () => {
    await clearStorage();
    window.location.reload();
  };
  return (
    <Button
      onPress={clearAndRefresh}
      title="Dev button - Clear storage and refresh Application"
    />
  );
};
