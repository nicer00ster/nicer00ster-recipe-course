import React from 'react';
import { updateSettings } from './auth';
import Option from './components/Option';
// Helper functions.

// Functions for our Settings.js
// export const handleSubmit = (e, selected, uid) => {
//   e.preventDefault();
//   let settings = [];
//   for(const option of selected) {
//     console.log(option);
//     settings.push(option);
//   }
//   updateSettings(uid, settings);
// }

// export const toggleCheckbox = (selected, label) => {
//   if(selected.has(label)) {
//     selected.delete(label);
//   } else {
//     selected.add(label);
//   }
// }

// export const createOption = (label, selected) => (
//   <Option
//     label={label}
//     key={label}
//     selected={selected}
//   />
// )
//
// export const createOptions = filters => (
//   filters.map(createOption)
// )
