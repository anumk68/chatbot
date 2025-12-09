import {
  UPDATE_FORM_FIELD,
  TOGGLE_FORM_ENABLED,
  ADD_FORM_FIELD,
  REMOVE_FORM_FIELD,
} from "./actions";

const initialState = {
  chatbotId: "", // 👈 will come from admin or API
  websiteURL: "", // 👈 optional for URL-based logic
  info: "Let’s chat! Fill in a few details to get started.",
  buttonText: "Start Chat",
  defaultFields: [
    { id: 1, label: "Name", placeholder: "Enter your name", required: true },
    { id: 2, label: "Email", placeholder: "Enter your email", required: true },
  ],
  extraFields: [],
  isEnabled: true,
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FORM_FIELD:
      return { ...state, [action.payload.field]: action.payload.value };

    case ADD_FORM_FIELD:
      return { ...state, extraFields: [...state.extraFields, action.payload] };

    case REMOVE_FORM_FIELD:
      return {
        ...state,
        defaultFields: state.defaultFields.filter(
          (f) => f.id !== action.payload
        ),
        extraFields: state.extraFields.filter((f) => f.id !== action.payload),
      };

    case TOGGLE_FORM_ENABLED:
      return { ...state, isEnabled: !state.isEnabled };

    //  new cases for chatbot setup
    case "SET_CHATBOT_ID":
      return { ...state, chatbotId: action.payload };

    case "SET_WEBSITE_URL":
      return { ...state, websiteURL: action.payload };

    default:
      return state;
  }
};

export default formReducer;
