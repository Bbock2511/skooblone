import * as Notifications from "expo-notifications";
import { ToastAndroid } from "react-native";

const requestPermissions = async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    if (finalStatus !== "granted") {
        ToastAndroid.showWithGravity(
            "Precisamos de sua permissão para exibir notificações",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
        );
        return false;
    }

    return true;
};

export default requestPermissions;