'use client'
import { Input, Form } from "antd";
import styleCommon from '../controller.module.scss'
interface TextInputProps {
    label?: string;
    name: string;
    rules?: any[];
    disabled?: boolean;
    placeholder?: string;
    allowClear?: boolean;
    prefix?: React.ReactNode;
    customClassname?: string;
}
const TextInput = (props: TextInputProps) => {
    const { label, name, rules = [], disabled = false, placeholder = "", allowClear = true, prefix = null, customClassname } = props;
    return (
        <>
            {label && <p className={styleCommon["titleSection"]}>{label}</p>}
            <Form.Item
                style={{
                    marginTop: 0,
                    marginBottom: 0,
                }}
                name={name}
                className={styleCommon["formItem"]}
                rules={rules}
            >
                <Input
                    className={customClassname ? customClassname :styleCommon["inputControl"]}
                    disabled={disabled}
                    placeholder={placeholder}
                    allowClear={allowClear}
                    prefix={prefix}
                />
            </Form.Item>
        </>
    )
}

export default TextInput
