'use client'
import { Form, Select } from "antd";
import styles from "./SelectInput.module.scss";
import styleCommon from "../controller.module.scss";
const Option = Select.Option;

interface SelectInputProps {
  label?: string;
  placeholder?: string;
  name: string;
  rules?: any[];
  options?: any[];
  allowClear?: boolean;
  disabled?: boolean;
  onChange?: (value: any) => void;
  customClassName?: string;
}
function SelectInput(props: SelectInputProps) {
  const {
    label,
    placeholder,
    name,
    rules,
    options = [],
    allowClear = true,
    disabled = false,
    onChange = null,
    customClassName = ""
  } = props;
  return (
    <>
      {label && <p className={styleCommon["titleSection"]}>{label}</p>}
      <Form.Item
        style={{
          marginTop: 0,
          marginBottom: 0,
        }}
        name={name}
        rules={rules}
      >
        <Select
          className={customClassName ? customClassName : styles["selectInput"] + " " + styles["div_selectInput"]}
          placeholder={placeholder}
          allowClear={allowClear}
          disabled={disabled}
          onChange={onChange ? onChange : () => { }}
        >
          {options.map((e) => (
            <Option key={e.id} value={e.value}>
              {e.label}
            </Option>
          ))}

          {/* <Option value={'manager'}>Manager</Option>
                    <Option value={'accountant'}>Accountant</Option>
                    <Option value={'other'}>Other</Option> */}
        </Select>
      </Form.Item>
    </>
  );
}

export default SelectInput;
