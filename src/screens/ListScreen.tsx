import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { FlatList, Text, View, TouchableOpacity } from 'react-native';
import { shiftStore } from '../store/ShiftStore';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { styles } from '../styles/styles';
import { getLocation } from '../services/GeolocationService';

const ListScreen = observer(() => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    async function load() {
      try {
        const { lat, lon } = await getLocation();
        await shiftStore.fetchShifts(lat, lon);
      } catch (err) {
        shiftStore.error = err as string;
      }
    }
    load();
  }, []);

  return (
    <FlatList
      data={shiftStore.shifts}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Details', { shift: item })}
        >
          <View style={styles.shiftItem}>
            <Text style={styles.title}>
              {item.companyName} -{' '}
              {item.workTypes.map(wt => wt.name).join(', ')}
            </Text>
            <Text style={styles.text}>
              {item.dateStartByCity} {item.timeStartByCity} -{' '}
              {item.timeEndByCity}
            </Text>
            <Text style={styles.text}>Оплата: {item.priceWorker} руб.</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
});

export default ListScreen;
