import { InputAlphaNumeric } from "./AlphaNumeric";
import { InputCurrency } from "./Currency";
import { CustomInput } from "./Custom";
import { InputDate } from "./Date";
import { InputDateTime } from "./DateTime";
import { InputEmail } from "./Email";
import { InputNumber } from "./Number";
import { InputNumeric } from "./Numeric";
import { InputPassword } from "./Password";
import { InputTel } from "./Tel";
import { InputText } from "./Text";
import { InputTime } from "./Time";
export const Input = {
  Text: InputText,
  Date: InputDate,
  DateTime: InputDateTime,
  Time: InputTime,
  Number: InputNumber,
  Numeric: InputNumeric,
  AlphaNumeric: InputAlphaNumeric,
  Currency: InputCurrency,
  Tel: InputTel,
  Email: InputEmail,
  Custom: CustomInput,
  Password: InputPassword,
};
