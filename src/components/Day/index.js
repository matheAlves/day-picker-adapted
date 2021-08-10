/**
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import styles from './styles';

/**
 * Responsible for representing a day.
 * 
 * @param    {function(void): void} onPress Function that changes the 
 * selected day after a day is selected in the selector 
 * @param    {number} month Month referring to the day
 * @param    {number} day Day
 * @param    {array: number} highlightedDays Indicates the dates that will be highlighted
 * @param    {array: string} validWeekDays Indicates the days of the
 * week that are valid (0 to 6, with 0 indicating Sunday and 6 indicating Saturday)
 * @param    {number} width Component width
 * @param    {object} colorMapping Color of days, where:
 *  - today: Current day highlight color
 *  - highlight: Highlighted day color
 *  - future: Future day color
 *  - past: Past day color
 *  - default: Default day color
 *  - text: Color of the number that represents the day
 */
export default function Day({ 
  onPress, 
  month, 
  day, 
  highlightedDays,
  validWeekDays, 
  width, 
  colorMapping 
}) {
  
  return (
    <DayButton 
      onPress={onPress} 
      month={month} 
      day={day} 
      highlightedDays={highlightedDays} 
      validWeekDays={validWeekDays}
      width={width} 
      colorMapping={colorMapping}
    >
      <Text style={buildDayTextStyle(colorMapping)}>
        {day}
      </Text>
    </DayButton>
  );
}

function DayButton({ 
  children, 
  onPress, 
  month, 
  day, 
  highlightedDays, 
  validWeekDays, 
  width, 
  colorMapping 
}) {
  return (
    <TouchableHighlight 
      onPress={onPress} 
      underlayColor='transparent' 
      style={buildDayButtonStyle(width)}
    >
      <View style={buildDayButtonAreaStyle(month, day, colorMapping, validWeekDays, highlightedDays)}>
        {children}
      </View>
    </TouchableHighlight>
  );
}

function buildDayButtonStyle(width) {
  return [
    styles.dayButton, 
    { width: width }
  ];
}

function buildDayButtonAreaStyle(month, day, colorMapping, validWeekDays, highlightedDays) {
  return [
    styles.dayItem, 
    buildButtonColor(month, day, colorMapping, validWeekDays, highlightedDays)
  ];
}

function buildDayTextStyle(colorMapping) {
  return [
    styles.dayText, 
    { color: colorMapping.text }
  ];
}


function buildButtonColor(month, day, colorMapping, validWeekDays, highlightedDays) {
  const today = getBeginOf(getCurrentTime());
  const selectedDate = getBeginOf(new Date(getCurrentYear(), month, day));
  
  let opacity = 1;
  let bgColor = colorMapping.default;
  let borderColor = null;
  let borderWidth = 0;

  if (isSelectedDateToday(selectedDate, today)) {
    borderColor = colorMapping.today;
    borderWidth = 4;
  }

  if (isSelectedDateFutureDate(selectedDate, today)) {
    bgColor = colorMapping.future;
  }

  if (isSelectedDateValid(selectedDate, validWeekDays)) {
    if (isSelectedDatePastDate(selectedDate, today)) {
      if (isSelectedDateHighlighted(selectedDate, highlightedDays)) { 
        bgColor = colorMapping.highlight;
      }
      else {
        bgColor = colorMapping.past;
      }
    }
  }
  else {
    opacity = 0.4;
  }

  return {
    backgroundColor: bgColor,
    borderWidth: borderWidth,
    borderColor: borderColor,
    opacity: opacity
  };
}

function getCurrentTime() {
  return new Date();
}

function getBeginOf(date) {
  const dateBegin = date;

  dateBegin.setHours(0);
  dateBegin.setMinutes(0);
  dateBegin.setSeconds(0);
  dateBegin.setMilliseconds(0);

  return dateBegin;
}

function getCurrentYear() {
  return getCurrentTime().getFullYear();
}

function isSelectedDateToday(selectedDate, today) {
  return (selectedDate.getTime() === today.getTime());
}

function isSelectedDateFutureDate(selectedDate, today) {
  return (selectedDate.getTime() >= today.getTime());
}

function isSelectedDateValid(selectedDate, validWeekDays) {
  return validWeekDays.includes(selectedDate.getDay());
}

function isSelectedDatePastDate(selectedDate, today) {
  return (selectedDate.getTime() <= today.getTime());
}

function isSelectedDateHighlighted(selectedDate, highlightedDays) {
  const formatedDate = getFormatedDate(selectedDate);

  return highlightedDays.includes(formatedDate);
}

function getFormatedDate(date) {
  const formatedYear = date.getFullYear().toString();
  let formatedMonth = (date.getMonth()+1).toString();
  let formatedDay = date.getDate().toString();

  if (date.getMonth()+1 < 10)
    formatedMonth = '0' + formatedMonth;

  if (date.getDate() < 10)
    formatedDay = '0' + formatedDay;

  return `${formatedYear}-${formatedMonth}-${formatedDay}`;
}
