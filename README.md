![](https://github.com/wniemiec-component-reactnative/day-picker/blob/master/docs/img/logo/logo.jpg)

<h1 align='center'>Day picker</h1>
<p align='center'>Day selector.</p>
<p align="center">
	<a href="https://github.com/wniemiec-component-reactnative/day-picker/actions/workflows/windows.yml"><img src="https://github.com/wniemiec-component-reactnative/day-picker/actions/workflows/windows.yml/badge.svg" alt=""></a>
	<a href="https://github.com/wniemiec-component-reactnative/day-picker/actions/workflows/macos.yml"><img src="https://github.com/wniemiec-component-reactnative/day-picker/actions/workflows/macos.yml/badge.svg" alt=""></a>
	<a href="https://github.com/wniemiec-component-reactnative/day-picker/actions/workflows/ubuntu.yml"><img src="https://github.com/wniemiec-component-reactnative/day-picker/actions/workflows/ubuntu.yml/badge.svg" alt=""></a>
	<a href="https://reactnative.dev/"><img src="https://img.shields.io/badge/React Native-0.60+-D0008F.svg" alt="React Native compatibility"></a>
	<a href="https://github.com/wniemiec-component-reactnative/day-picker/releases"><img src="https://img.shields.io/github/v/release/wniemiec-component-reactnative/day-picker" alt="Release"></a>
	<a href="https://github.com/wniemiec-component-reactnative/day-picker/blob/master/LICENSE"><img src="https://img.shields.io/github/license/wniemiec-component-reactnative/day-picker" alt="License"></a>
</p>
<hr />

## ❇ Introduction
React Native component that allows you to choose a day, in addition to being able to highlight certain days, as well as define which days of the week are valid or not.

## 🖼 Gallery

<div style="display: flex; flex-direction: row; justify-content: center; align-items: center; flex-wrap: wrap"
<img height=400 src="https://raw.githubusercontent.com/wniemiec-component-reactnative/day-picker/master/docs/img/screens/img1.png" alt="image 1" />

<img height=400 src="https://raw.githubusercontent.com/wniemiec-component-reactnative/day-picker/master/docs/img/screens/img2.png" alt="image 2" />

<img height=400 src="https://raw.githubusercontent.com/wniemiec-component-reactnative/day-picker/master/docs/img/screens/img3.png" alt="image 3" />

## ❓ How to use
1. Install the component
```
$ npm install --save @wniemiec-component-reactnative/day-picker
```

2. Import the component
```
import DayPicker from '@wniemiec-component-reactnative/day-picker';
```

3. Use it
```
[...]

import React, { useState } from 'react';
import { View } from 'react-native';

[...]

const now = new Date();
const [selectedDay, setSelectedDay]  = useState(now.getDate());
let thisYear = now.getFullYear();
let thisMonth = now.getMonth() + 1;
let thisDay = now.getDate();

if (thisMonth < 10)
  thisMonth = '0' + thisMonth;

if (thisDay < 10)
  thisDay = '0' + thisDay;

let dayFormated = `${thisYear}-${thisMonth}-${thisDay}`;

[...]

<View style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  <DayPicker
	selectedMonth={now.getMonth()}
	selectedDay={selectedDay}
	setSelectedDay={setSelectedDay}
	highlightedDays={[dayFormated]}
	validWeekDays={[0, 1, 2, 3, 4, 6]}
  />
</View>
[...]
```

## 📖 Documentation
|        Property        |Type|Description|Default|
|----------------|-------------------------------|-----------------------------|--------|
|selectedMonth |`number`|Month referring to the days of the selector | - |
|selectedDay |`number`|Day that will be centered in the selector | - |
|setSelectedDay |`function(void): void`|Function that changes the selected day after a day is selected in the selector | - |
|highlightedDays |`array: number`|Indicates the dates that will be highlighted | `[]` |
|validWeekDays |`array: string`|Indicates the days of the week that are valid (0 to 6, with 0 indicating Sunday and 6 indicating Saturday) |`[0, 1, 2, 3, 4, 5, 6]`|
|colorMapping |`object`|Color of days, where:
  - today: Current day highlight color
  - highlight: Highlighted day color
  - future: Future day color
  - past: Past day color
  - default: Default day color
  - text: Color of the number that represents the day  
  
|`{today: '#e51284', highlight: '#3cb371', future: '#233287', past: '#ff8055', default: '#777', text: 'white'}`|

## 🚩 Changelog
Details about each version are documented in the [releases section](https://github.com/wniemiec-component-reactnative/day-picker/releases).

## 🤝 Contribute!
See the documentation on how you can contribute to the project [here](https://github.com/wniemiec-component-reactnative/day-picker/blob/master/CONTRIBUTING.md).

## 📁 Files

### /
|        Name        |Type|Description|
|----------------|-------------------------------|-----------------------------|
|docs |`Directory`|Documentation files|
|src     |`Directory`| Source files|
