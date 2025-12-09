// src/redux/form/actions.js

// Action Types
export const UPDATE_FORM_FIELD = "UPDATE_FORM_FIELD";
export const TOGGLE_FORM_ENABLED = "TOGGLE_FORM_ENABLED";
export const ADD_FORM_FIELD = "ADD_FORM_FIELD";
export const REMOVE_FORM_FIELD = "REMOVE_FORM_FIELD";
export const SET_FIELDS = "SET_FIELDS";

// Action Creators

// Update a field (info, buttonText, etc.)
export const updateFormField = (field, value) => ({
  type: UPDATE_FORM_FIELD,
  payload: { field, value },
});

// Toggle on/off pre-chat form
export const toggleFormEnabled = () => ({
  type: TOGGLE_FORM_ENABLED,
});

// Add new custom field
export const addFormField = (fieldData) => ({
  type: ADD_FORM_FIELD,
  payload: fieldData,
});

// Remove custom field
export const removeFormField = (id) => ({
  type: REMOVE_FORM_FIELD,
  payload: id,
});

export const setFormFields = (fields) => ({
  type: SET_FIELDS,
  payload: fields,
});
