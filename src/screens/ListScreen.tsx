import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { FlatList, Text, View, TouchableOpacity } from 'react-native';
import { shiftStore } from '../store/ShiftStore';
import { getLocation } from '../services/GeolocationService';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

const ListScreen = observer(() => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    async function load() {
      try {
        const { lat, lon } = await getLocation();
        await shiftStore.fetchShifts(lat, lon);
      } catch (err) {
        shiftStore.error = 'Ошибка геолокации';
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
          <View>
            <Text>
              {item.companyName} -{' '}
              {item.workTypes.map(wt => wt.name).join(', ')}
            </Text>
            <Text>
              {item.dateStartByCity} {item.timeStartByCity} -{' '}
              {item.timeEndByCity}
            </Text>
            <Text>Оплата: {item.priceWorker} руб.</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
});

export default ListScreen;
