//mobile/src/screens/MapViewScreen.tsx
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useContext, useRef, useState } from 'react';
import { View, Text, DimensionValue } from 'react-native';
import { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { StackParams } from '../types/StackParams';
import { LocationContext } from '../types/LocationContext';
import { userLocation } from '../types/userLocation';
import Pin from '../components/Pin';
import { colors, palette, size, typography } from '../styles';
import { StyleSheet } from 'react-native'
import MapView from "react-native-maps"
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import IssueListScreen from './IssueListScreen';
import { UpArrowIcon } from '../components/Icons';
import CalloutPopup from '../components/CalloutPopup';
import { Issue } from '@civickit/shared';

export default function MapViewScreen({ issues, refetch }: any) {
    const navigation = useNavigation<StackNavigationProp<StackParams>>();
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = ["10%", "30%", "80%"]
    const [bottomSheetPos, setBottomSheetPos] = useState<DimensionValue>("10%");
    const [isCalloutVisible, setIsCalloutVisible] = useState(true)
    const [currentIssue, setCurrentIssue] = useState<Issue | undefined>(undefined)

    //get contexts from above layer(s)
    const location = useContext(LocationContext) as unknown as userLocation

    const onMarkerPress = (issue: Issue) => {
        setCurrentIssue(issue)
    }

    //currently causing too many re-renders
    if (isCalloutVisible && bottomSheetPos == snapPoints[2]) {
        setIsCalloutVisible(false)
    } else if (!isCalloutVisible && currentIssue != undefined) {
        setIsCalloutVisible(true)
    }
    //need callout popup, sits ontop of bottomsheet
    //disapears when bottomsheet is fully open
    //appears when pin is clicked
    //fade in and up to view

    const styles = StyleSheet.create({
        callout: {
            position: "absolute",
            bottom: bottomSheetPos,
        },
        calloutText: {
            fontSize: typography.sizeMd,
            color: colors.textPrimary
        },
    })

    return (
        <View style={{ flex: 1 }}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={{ flex: 1 }}
                initialRegion={location ? {
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                } : undefined}
                showsUserLocation
            >
                {issues.map((issue: any) =>
                    <Marker
                        key={issue.id}
                        coordinate={{ latitude: issue.latitude, longitude: issue.longitude }}
                        style={{}}
                        onPress={() => { onMarkerPress(issue) }}
                    >
                        <Pin issue={issue} />
                    </Marker>

                )}
            </MapView>

            <CalloutPopup style={[styles.callout,
            isCalloutVisible ? { display: undefined } : { display: "none" }
            ]} />

            <BottomSheet
                ref={bottomSheetRef}
                snapPoints={snapPoints}
                enableDynamicSizing={false}
                enableContentPanningGesture={false}
                handleStyle={{
                    backgroundColor: colors.background,
                    height: size.xl
                }}
                backgroundStyle={{
                    backgroundColor: colors.background
                }}
                handleIndicatorStyle={{
                    backgroundColor: palette.ckDarkGray
                }}
                backdropComponent={(props: any) => (
                    <BottomSheetBackdrop
                        {...props}
                        disappearsOnIndex={1}
                        appearsOnIndex={2}
                        enableTouchThrough={true}
                        pressBehavior={"collapse"}
                    />
                )}
                overDragResistanceFactor={0.5}
                enableOverDrag={false}
                onChange={(index: number) => { setBottomSheetPos(snapPoints[index]) }}
            >
                <IssueListScreen issues={issues} refetch={refetch} />
            </BottomSheet>
        </View>
    );
};

