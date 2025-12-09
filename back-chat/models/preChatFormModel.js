import { DataTypes } from "sequelize";
import sequelize from "../config/db.js"; // your MySQL connection

const PreChatForm = sequelize.define(
  "prechat_form",
  {
    chatbot_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    info: {
      type: DataTypes.TEXT,
    },
    button_text: {
      type: DataTypes.STRING,
      defaultValue: "Start Chat",
    },
    fields: {
      type: DataTypes.JSON,
    },
  },
  {
    tableName: "prechat_forms",
    timestamps: true,
  }
);

export default PreChatForm;
