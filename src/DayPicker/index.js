/**
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import React, { useState, useRef, useLayoutEffect } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import styles from './styles';
import Day from '../components/Day';

const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);
const DAY_WIDTH = Math.round(SCREEN_WIDTH / 9);
const OFFSET_WIDTH = Math.round((SCREEN_WIDTH - DAY_WIDTH) / 2);

/**
 * Day selector.
 * 
 * @param    {number} selectedMonth Month referring to the days of the selector
 * @param    {number} selectedDay Day that will be centered in the selector
 * @param    {function(void): void} setSelectedDay function that changes the 
 * selected day after a day is selected in the selector  
 * @param    {array: number} [highlightedDays=[]] Indicates the dates that will be highlighted
 * @param    {array: string} [validWeekDays=[0, 1, 2, 3, 4, 5, 6]] Indicates the days of the
 * week that are valid (0 to 6, with 0 indicating Sunday and 6 indicating Saturday)
 * @param    {object} [colorMapping={today: '#e51284', highlight: '#3cb371', future: '#233287', past: '#ff8055', default: '#777', text: 'white'}] 
 * Color of days, where:
 *  - today: Current day highlight color
 *  - highlight: Highlighted day color
 *  - future: Future day color
 *  - past: Past day color
 *  - default: Default day color
 *  - text: Color of the number that represents the day
 */
 export default function DayPicker ({ 
  selectedMonth, 
  selectedDay, 
  setSelectedDay, 
  highlightedDays=[], 
  validWeekDays=[0, 1, 2, 3, 4, 5, 6], 
  colorMapping={today: '#e51284', highlight: '#3cb371', future: '#233287', past: '#ff8055', default: '#777', text: 'white'}
}) {
  const [days, setDays] = useState([]);
  const dayRef = useRef();

  const handleScrollEnd = (event) => {
    const position = getHorizontalPositionOfEvent(event);

    setSelectedDay(getDayAt(position));
  }

  const handleSelectDay = (day) => {
    scrollToDay(day);
    setSelectedDay(day);
  }

  const updatePicker = () => {
    // Needed to give Scrollview time to load
    setTimeout(
      () => updateScrollView(), 
      100
    );
  }
  
  const updateScrollView = () => {
    if (selectedMonth == new Date().getMonth())
      scrollToDay(selectedDay);
    else
      scrollToDay(1);
  }

  const scrollToDay = (day) => {
    dayRef.current.scrollTo({
      x: (day - 1) * DAY_WIDTH, // -1 because day starts with 1,
      y: 0,
      animated: true
    });
  }

  useLayoutEffect(() => {
    setDays(getDaysOfMonth(selectedMonth));
    updatePicker();
  }, [selectedMonth]);

  return (
    <ScrollView
      horizontal={true}
      ref={dayRef}
      showsHorizontalScrollIndicator={false}
      decelerationRate='fast'
      snapToInterval={DAY_WIDTH}
      contentContainerStyle={{ paddingLeft: OFFSET_WIDTH, paddingRight: OFFSET_WIDTH }}
      onMomentumScrollEnd={handleScrollEnd}
      style={styles.area}
    >
      {days.map((day, index) => (
        <Day
          key={index}
          day={day}
          month={selectedMonth}
          highlightedDays={highlightedDays}
          validWeekDays={validWeekDays}
          onPress={() => handleSelectDay(day)}
          colorMapping={colorMapping}
          width={DAY_WIDTH}
        />
      ))}
    </ScrollView>
  );
}

function getHorizontalPositionOfEvent(event) {
  return event.nativeEvent.contentOffset.x;
}

function getDayAt(position) {
  // +1 because day 1 must begin at position 1
  return Math.round(position / DAY_WIDTH + 1);
}

function getDaysOfMonth(month) {
  const days = [];

  for (let i = 1; i <= getTotalDaysOfMonth(month); i++) {
    days.push(i);
  }
  
  return days;
}

function getTotalDaysOfMonth(month) {
  return getLastDateOfMonth(month).getDate();
}

function getLastDateOfMonth(month) {
  return new Date(getCurrentYear(), (month + 1), 0);
}

function getCurrentYear() {
  return new Date().getFullYear();
}

