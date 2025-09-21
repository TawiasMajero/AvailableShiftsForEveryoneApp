import React from 'react';
import { Image, Text, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Shift } from '../types/shift';
import { styles } from '../styles/styles';

type DetailsRouteProp = RouteProp<{ params: { shift: Shift } }, 'params'>;

const DetailsScreen = () => {
  const route = useRoute<DetailsRouteProp>();
  const { shift } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Компания: {shift.companyName}</Text>
      <Image source={{ uri: shift.logo }} style={styles.logo} />
      <Text style={styles.text}>Адрес: {shift.address}</Text>
      <Text style={styles.text}>Дата: {shift.dateStartByCity}</Text>
      <Text style={styles.text}>
        Время: {shift.timeStartByCity} - {shift.timeEndByCity}
      </Text>
      <Text style={styles.text}>
        Тип работы: {shift.workTypes.map(wt => wt.name).join(', ')}
      </Text>
      <Text style={styles.text}>
        Набрано/Нужно: {shift.currentWorkers}/{shift.planWorkers}
      </Text>
      <Text style={styles.text}>Оплата: {shift.priceWorker} руб.</Text>
      <Text style={styles.text}>
        Рейтинг: {shift.customerRating ?? 'Нет рейтинга'} (
        {shift.customerFeedbacksCount})
      </Text>
    </View>
  );
};

export default DetailsScreen;
