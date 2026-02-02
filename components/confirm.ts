import { Alert } from "react-native";

export function showConfirm(
  title: string,
  message: string,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
): Promise<boolean> {
  return new Promise((resolve) => {
    Alert.alert(title, message, [
      { text: cancelLabel, style: "cancel", onPress: () => resolve(false) },
      {
        text: confirmLabel,
        style: "destructive",
        onPress: () => resolve(true),
      },
    ]);
  });
}
