import { StaticScreenProps, useNavigation } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import { colors, globalStyles, spacing, typography } from "../styles";
import { LoopingLogoGif } from "../components/Logos";
import React from "react";
import Svg, { G, Circle, Text, TextPath, TSpan } from 'react-native-svg';

export default function LoadingScreen() {
    // <Text style={styles.text}>"Aut viam inveniam aut faciam"</Text>
    // <Text style={styles.text}>"I will either find a way or make one"</Text>
    return (
        <View style={styles.container}>
            <LoadingScreen />
            <Svg height="100%" width="100%" viewBox="0 0 100 100">
                <G id="circle">
                    <Circle
                        r={100}
                        x={150}
                        y={150}
                        fill="none"
                        stroke="none"
                        strokeWidth={0}
                        transform="rotate(-150)"
                    />
                </G>
                <Text fill="#000" fontSize="14">
                    <Text fill={colors.primary} fontSize={typography.sizeLg}>
                        <TextPath href="#circle">
                            <TSpan dy={0}>
                                "Aut viam inveniam aut faciam"
                            </TSpan>
                        </TextPath>
                    </Text>
                </Text>
            </Svg>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        ...globalStyles.container,
        justifyContent: `flex-start`,
        alignItems: 'center',
        paddingBlockStart: spacing.xxxl * 2
    },
    text: {
        ...globalStyles.heading1,
        color: colors.textSecondary,
        marginVertical: spacing.sm
    },
});