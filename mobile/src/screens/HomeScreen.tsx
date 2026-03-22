import { useContext, useState } from "react";
import LoadingScreen from "./LoadingScreen";
import MapViewScreen from "./MapViewScreen";
import { LocationContext } from "../types/LocationContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { userLocation } from "../types/userLocation";
import ENV from '../config/env';
import { MessageView } from "../components/MessageView";
import { View, Text, StyleSheet } from 'react-native';
import { BrokenIcon, CategoryIcon, ExclamationPointIcon, LightBulbIcon, RefreshIcon, SprayPaintIcon, StatusIcon, TrafficConeIcon, TrafficLightIcon, TrashIcon, UpArrowIcon, WarningIcon } from '../components/Icons';
import { borderRadius, colors, globalStyles, palette, size, spacing, typography } from '../styles';
import { IssueCategoryArray } from "../types/IssueCategoryArray";
import { IssueStatusArray } from "../types/IssueStatusArray";
import FilterCheckList from "../components/FilterCheckList";
import IconButton from "../components/IconButton";

//mobile/src/screens/HomeScreen.tsx
export default function HomeScreen() {
    const [refreshing, setRefreshing] = useState(false)
    const [visibleCategories, setVisibleCategories] = useState(IssueCategoryArray)
    const [visibleStatuses, setVisibleStatuses] = useState(IssueStatusArray)
    const [isListOpen, setIsListOpen] = useState(false)

    //get contexts from above layer(s)
    const queryClient = useQueryClient()
    const location = useContext(LocationContext) as unknown as userLocation

    //fetch issues from database 
    var { data, isLoading, error, refetch } = useQuery({
        queryKey: ['issues', 'nearby'],
        queryFn: async () => {
            console.log("url: ", ENV.apiUrl)
            const response = await fetch(
                ENV.apiUrl + '/issues/nearby?lat=' +
                location.latitude + '&lng=' + location.longitude + '&radius=5000'
            );
            console.log("fetch", response)
            if (!response.ok) throw new Error('Failed to fetch');
            return response.json();
        }
    }, queryClient);

    //check if still loading
    if (isLoading) {
        return (
            <LoadingScreen />
        )
    }

    //check if error has been thrown
    if (error != undefined) {
        return (
            <MessageView enableRefresh={true}
                onRefresh={refetch}
                refreshing={refreshing}>
                {String(error)}
            </MessageView>
        )
    }

    if (location.latitude == undefined ||
        location.longitude == undefined) {
        return (
            <MessageView enableRefresh={true}
                onRefresh={refetch}
                refreshing={refreshing}>
                Error: Please Reload
            </MessageView>
        )
    }

    return (
        <View style={{ flex: 1 }}>

            <MapViewScreen
                issues={data.issues}
                refetch={refetch}
                setIsListOpen={setIsListOpen}
            />

            <View style={styles.overlay}>

                <View style={styles.buttonCol}>
                    <FilterCheckList
                        data={IssueCategoryArray}
                        buttonStyle={styles.button}
                        setSelectedValues={setVisibleCategories}
                    >
                        <CategoryIcon size={size.xxl} style={{ alignSelf: "center" }} />
                    </FilterCheckList>

                    <FilterCheckList
                        data={IssueStatusArray}
                        buttonStyle={styles.button}
                        setSelectedValues={setVisibleStatuses}
                    >
                        <StatusIcon size={size.xxl} style={{ alignSelf: "center" }} />
                    </FilterCheckList>

                    <IconButton onPress={refetch}
                        style={[styles.button,
                        isListOpen ? { position: "absolute", bottom: spacing.lg } : {}
                        ]}>
                        <RefreshIcon size={size.xxl} style={{ alignSelf: "center" }} />
                    </IconButton>
                </View>

                <View style={styles.iconChart}>
                    <View style={styles.iconRow}>
                        <View style={[styles.textContainer,
                        (visibleCategories.length != 7) ? { display: "none" } : { display: undefined }
                        ]}>
                            <CategoryIcon size={typography.sizeLg} color={colors.textContrast} />
                            <Text style={styles.text}>All</Text>
                        </View>

                        <View style={[styles.iconContainer,
                        (visibleCategories.length != 7 && visibleCategories.includes("Pothole")) ? { display: undefined } : { display: "none" }
                        ]}>
                            <TrafficConeIcon size={typography.sizeLg} color={colors.textPrimary} />
                        </View>

                        <View style={[styles.iconContainer,
                        (visibleCategories.length != 7 && visibleCategories.includes("Streetlight")) ? { display: undefined } : { display: "none" }
                        ]}>
                            <LightBulbIcon size={typography.sizeLg} color={colors.textPrimary} />
                        </View>

                        <View style={[styles.iconContainer,
                        (visibleCategories.length != 7 && visibleCategories.includes("Graffiti")) ? { display: undefined } : { display: "none" }
                        ]}>
                            <SprayPaintIcon size={typography.sizeLg} color={colors.textPrimary} />
                        </View>

                        <View style={[styles.iconContainer,
                        (visibleCategories.length != 7 && visibleCategories.includes("Illegal Dumping")) ? { display: undefined } : { display: "none" }
                        ]}>
                            <TrashIcon size={typography.sizeLg} color={colors.textPrimary} />
                        </View>

                        <View style={[styles.iconContainer,
                        (visibleCategories.length != 7 && visibleCategories.includes("Broken Sidewalk")) ? { display: undefined } : { display: "none" }
                        ]}>
                            <BrokenIcon size={typography.sizeLg} color={colors.textPrimary} />
                        </View>

                        <View style={[styles.iconContainer,
                        (visibleCategories.length != 7 && visibleCategories.includes("Traffic Signal")) ? { display: undefined } : { display: "none" }
                        ]}>
                            <TrafficLightIcon size={typography.sizeLg} color={colors.textPrimary} />
                        </View>

                        <View style={[styles.iconContainer,
                        (visibleCategories.length != 7 && visibleCategories.includes("Other")) ? { display: undefined } : { display: "none" }
                        ]}>
                            <ExclamationPointIcon size={typography.sizeLg} color={colors.textPrimary} />
                        </View>

                    </View>

                    <View style={{ ...styles.iconRow, flexWrap: "wrap", rowGap: spacing.xs }}>
                        <View style={[styles.textContainer,
                        { backgroundColor: palette.ckDark },
                        (visibleStatuses.length != 6) ? { display: "none" } : { display: undefined }
                        ]}>
                            <StatusIcon size={typography.sizeLg} color={colors.textContrast} />
                            <Text style={styles.text}>All</Text>
                        </View>

                        <View style={[styles.textContainer,
                        { backgroundColor: colors.statusReported },
                        (visibleStatuses.length != 6 && visibleStatuses.includes("Reported")) ? { display: undefined } : { display: "none" }
                        ]}>
                            <Text style={{ ...styles.statusText }}>R</Text>
                        </View>

                        <View style={[styles.textContainer,
                        { backgroundColor: colors.statusAcknowledged },
                        (visibleStatuses.length != 6 && visibleStatuses.includes("Acknowledged")) ? { display: undefined } : { display: "none" }
                        ]}>
                            <Text style={{ ...styles.statusText }}>A</Text>
                        </View>

                        <View style={[styles.textContainer,
                        { backgroundColor: colors.statusInProgress },
                        (visibleStatuses.length != 6 && visibleStatuses.includes("In Progress")) ? { display: undefined } : { display: "none" }
                        ]}>
                            <Text style={{ ...styles.statusText, color: colors.textPrimary }}>IP</Text>
                        </View>

                        <View style={[styles.textContainer,
                        { backgroundColor: colors.statusResolved },
                        (visibleStatuses.length != 6 && visibleStatuses.includes("Resolved")) ? { display: undefined } : { display: "none" }
                        ]}>
                            <Text style={{ ...styles.statusText }}>R</Text>
                        </View>

                        <View style={[styles.textContainer,
                        { backgroundColor: colors.statusCommunityResolved },
                        (visibleStatuses.length != 6 && visibleStatuses.includes("Community Resolved")) ? { display: undefined } : { display: "none" }
                        ]}>
                            <Text style={{ ...styles.statusText, color: colors.textPrimary }}>CR</Text>
                        </View>

                        <View style={[styles.textContainer,
                        { backgroundColor: colors.statusClosed },
                        (visibleStatuses.length != 6 && visibleStatuses.includes("Closed")) ? { display: undefined } : { display: "none" }
                        ]}>
                            <Text style={{ ...styles.statusText, color: colors.textPrimary }}>C</Text>
                        </View>

                    </View>
                </View>

            </View>

            <View style={[styles.textContainer,
            {
                position: "absolute",
                bottom: spacing.xxxl + spacing.sm
            },
            (visibleStatuses.length == 0 || visibleCategories.length == 0) ? { display: undefined } : { display: "none" }
            ]}>
                <WarningIcon size={typography.sizeLg} color={colors.textContrast} />
                <Text style={styles.text}>All Issues Hidden</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        width: "auto",
        ...globalStyles.shadow,
        backgroundColor: colors.background,
        color: colors.textPrimary,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    callout: {
        height: "auto",
        backgroundColor: colors.background
    },
    calloutText: {
        fontSize: typography.sizeMd,
        color: colors.textPrimary
    },
    textContainer: {
        backgroundColor: palette.ckDark,
        padding: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: borderRadius.full,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        ...globalStyles.shadow,
        flexDirection: "row",
        width: "auto",
        columnGap: spacing.xs,
    },
    iconContainer: {
        width: size.xl,
        backgroundColor: palette.ckYellow,
        padding: spacing.sm,
        borderRadius: borderRadius.full,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        ...globalStyles.shadow,
        flexDirection: "row",
        columnGap: spacing.xs
    },
    text: {
        fontSize: typography.sizeLg,
        fontWeight: typography.weightBold,
        color: colors.textContrast,
    },
    statusText: {
        fontSize: typography.sizeSm,
        fontWeight: typography.weightBold,
        color: colors.textContrast,
    },
    overlay: {
        position: "absolute",
        flexDirection: "row",
        justifyContent: "flex-start",
        height: "100%"
    },
    buttonCol: {
        width: "auto",
        margin: spacing.sm,
        rowGap: spacing.sm
    },
    iconChart: {
        margin: spacing.sm,
        rowGap: spacing.sm,
        width: "75%"
    },
    iconRow: {
        flexDirection: "row",
        width: "90%",
        columnGap: spacing.sm,
        marginRight: spacing.sm,
    }

})