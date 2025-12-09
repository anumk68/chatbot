import express from "express";
import {
  getForm,
  updateFormFields,
  updateFormStatus,
  deleteField,
} from "../controllers/formController.js";

const router = express.Router();

router.get("/:chatbotId", getForm);
router.post("/:chatbotId/form-fields", updateFormFields);
router.patch("/:chatbotId/form-status/update", updateFormStatus);
router.post("/:chatbotId/form-status/update", updateFormStatus);
router.delete("/:chatbotId/field/:fieldId", deleteField);

export default router;
