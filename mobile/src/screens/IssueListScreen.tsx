// mobile/src/screens/IssueListScreen.tsx
import { View, RefreshControl, Text, StyleSheet } from 'react-native';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useContext } from 'react';
import { FlatList } from 'react-native';
import React from 'react';
import IssueCard from '../components/IssueCard';
import { MessageView } from '../components/MessageView';
import { userLocation } from '../types/userLocation';
import { LocationContext } from '../types/LocationContext';
import ENV from '../config/env';
import { useNavigation } from '@react-navigation/native';
import { StackParams } from '../types/StackParams';
import { StackNavigationProp } from '@react-navigation/stack';
import { globalStyles, spacing, size } from '../styles';
import LoadingScreen from './LoadingScreen';
import BottomSheet, { BottomSheetFlatList, BottomSheetView } from '@gorhom/bottom-sheet';

export default function IssueListScreen({ issues, refetch }: any) {
  const [refreshing, setRefreshing] = useState(false)
  const navigation = useNavigation<StackNavigationProp<StackParams>>();

  //get contexts from above layer(s)


  //check if any data was returned
  if (issues.length == 0) {
    return (
      <View>
        <MessageView enableRefresh={true}
          onRefresh={refetch}
          refreshing={refreshing}>
          No issues nearby
        </MessageView>
      </View>

    )
  }

  //display list
  return (
    <BottomSheetFlatList
      style={{
        ...globalStyles.container,
        marginHorizontal: spacing.md,
      }}
      contentContainerStyle={{ gap: spacing.sm }}
      data={issues}
      renderItem={({ item }: any) => <IssueCard issue={item}
        onPress={() => navigation.navigate("Issue Details", { issue: item })}
        variant='expanded' />}
      keyExtractor={(item: any) => item.id}
      refreshControl={<RefreshControl refreshing={refreshing}

        onRefresh={refetch} />}
    />
  );

}
