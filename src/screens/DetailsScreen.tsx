import React from 'react';
import { Image, Text, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Shift } from '../types/shift';

type DetailsRouteProp = RouteProp<{ params: { shift: Shift } }, 'params'>;

const DetailsScreen = () => {
  const route = useRoute<DetailsRouteProp>();
  const { shift } = route.params;

  return (
    <View>
      <Image source={{ uri: shift.logo }} />
      <Text>Компания: {shift.companyName}</Text>
      <Text>Адрес: {shift.address}</Text>
      <Text>Дата: {shift.dateStartByCity}</Text>
      <Text>
        Время: {shift.timeStartByCity} - {shift.timeEndByCity}
      </Text>
      <Text>Тип работы: {shift.workTypes.map(wt => wt.name).join(', ')}</Text>
      <Text>
        Набрано/Нужно: {shift.currentWorkers}/{shift.planWorkers}
      </Text>
      <Text>Оплата: {shift.priceWorker} руб.</Text>
      <Text>
        Рейтинг: {shift.customerRating ?? 'Нет рейтинга'} (
        {shift.customerFeedbacksCount})
      </Text>
    </View>
  );
};

export default DetailsScreen;
