import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import generalStyles from '../../generalStyles';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const DatePicker = ({ label, date, setDate }) => {
  const [show, setShow] = useState(false);

  const onChangeDate = (selectedDate) => {
    setShow(false);
    if(selectedDate !== undefined && selectedDate !== date) {
      setDate(selectedDate);
    }
  }
  const defaultDate = new Date();
  defaultDate.setHours(0,0,0,0);
  defaultDate.setFullYear(defaultDate.getFullYear() - 20);
  
  return(
    <View>
      <Text style={generalStyles.text}>{label}</Text>
      <TouchableOpacity onPress={() => setShow(!show)}>
        <Text style={generalStyles.textInput}>{date ? date.toLocaleDateString() : 'Selectionner une date'}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        mode="date"
        isVisible={show}
        date={date ? date : defaultDate}
        locale="fr-FR"
        onConfirm={onChangeDate}
        onCancel={() => setShow(false)}
        minimumDate={new Date(1910, 0, 1)}
        maximumDate={new Date(2010, 11, 31)}
      />
    </View>
  );
}

export default DatePicker;