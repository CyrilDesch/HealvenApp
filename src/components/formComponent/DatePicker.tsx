import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import generalStyles from '../../styles/generalStyles';

interface DatePickerProps {
  label: string;
  date: Date | null;
  setDate: (date: Date) => void;
  error?: string;
  disable?: boolean;
}

const DatePicker = ({ label, date, setDate, error = '', disable = false }: DatePickerProps) => {
  const [show, setShow] = useState(false);

  const onChangeDate = (selectedDate: Date) => {
    setShow(false);
    if (selectedDate !== undefined && selectedDate !== date) {
      setDate(selectedDate);
    }
  };

  const defaultDate = new Date();
  defaultDate.setHours(0, 0, 0, 0);
  defaultDate.setFullYear(defaultDate.getFullYear() - 20);

  return (
    <View>
      <Text style={generalStyles.text}>{label}</Text>
      <TouchableOpacity disabled={disable} onPress={() => setShow(!show)}>
        <Text style={[generalStyles.textInput, disable ? generalStyles.disable : null]}>
          {date ? date.toLocaleDateString() : 'Selectionner une date'}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        mode="date"
        isVisible={show}
        date={date ?? defaultDate}
        locale="fr-FR"
        onConfirm={onChangeDate}
        onCancel={() => setShow(false)}
        minimumDate={new Date(1910, 0, 1)}
        maximumDate={new Date(2010, 11, 31)}
      />
      {error !== '' ? <Text style={generalStyles.error}>{error}</Text> : null}
    </View>
  );
};

export default DatePicker;
