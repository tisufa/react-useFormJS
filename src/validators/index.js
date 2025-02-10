import { actualLengthValidator } from "./actualLengthValidator";
import { emailValidator } from "./emailValidator";
import { matchValidator } from "./matchValidator";
import { maxLengthValidator } from "./maxLengthValidator";
import { maxValidator } from "./maxValidator";
import { minLengthValidator } from "./minLengthValidator";
import { minValidator } from "./minValidator";
import { numberValidator } from "./numberValidator";
import { regexValidator } from "./regexValidator";
import { requiredValidator } from "./requiredValidator";
export const Validators = {
  required: requiredValidator,
  min: minValidator,
  max: maxValidator,
  minLength: minLengthValidator,
  actualLength: actualLengthValidator,
  maxLength: maxLengthValidator,
  number: numberValidator,
  regex: regexValidator,
  email: emailValidator,
  match: matchValidator,
};
