'use client'
import { Form, DatePicker } from "antd";
import type { DatePickerProps } from "antd";
import { DATE_FORMAT } from '@/common/ParamsCommon/ParamsCommon'
import { MONTH_FORMAT } from '@/common/ParamsCommon/ParamsCommon'
import styleCommon from "../controller.module.scss";
import styles from "./DateTimeInput.module.scss";

interface DateTimeInputProps {
  label?: string;
  rules?: any[];
  name: string;
  type?: DatePickerProps["picker"];
  disabled?: boolean;
  allowClear?: boolean;
  customClassName?: string;
}
function DateTimeInput(props: DateTimeInputProps) {
  const { label, rules, name, type = "date", disabled = false, allowClear = true, customClassName = "" } = props;
  let format = DATE_FORMAT
  switch (type) {
    case "month":
      format = MONTH_FORMAT
      break;

    default:
      break;
  }

  return (
    <>
      {label && <p className={styleCommon['titleSection']}>{label}</p>}
      <Form.Item
        style={{
          marginTop: 0,
          marginBottom: 0,
        }}
        name={name}
        rules={rules}
      >
        <DatePicker
          format={format}
          className={customClassName ? customClassName : styles['inputControl']}
          picker={type}
          disabled={disabled}
          allowClear={allowClear}
        />
      </Form.Item>
    </>
  )
}

export default DateTimeInput
