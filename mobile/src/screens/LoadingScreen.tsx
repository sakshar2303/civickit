import { StaticScreenProps } from "@react-navigation/native";
import { MessageView } from "../components/MessageView";
import { ErrorIcon } from "../components/Icons";
import { View, Text, StyleSheet } from "react-native";
import { colors, globalStyles, size, spacing, typography } from "../styles";
import { Logo, LogoPlusText } from "../components/Logos";

export default function ErrorScreen() {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>"Aut viam inveniam aut faciam"</Text>
            <Text style={styles.text}>"I will either find a way or make one"</Text>
            <LogoPlusText />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        ...globalStyles.container,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: typography.sizeMd,
        color: colors.textSecondary,
        marginBottom: spacing.md
    },
});