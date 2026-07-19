'use client'
import { Input, Form } from "antd";
import styleCommon from '../controller.module.scss'
const { TextArea } = Input;
const TextAreaInput = (props:any) => {
    const { label, name, rules = [], disabled = false, placeholder = "", allowClear = true, prefix = null, customClassname, rowNumber } = props;
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
                <TextArea
                    className={customClassname ? customClassname :styleCommon["inputControl"]}
                    disabled={disabled}
                    placeholder={placeholder}
                    allowClear={allowClear}
                    prefix={prefix}
                    rows={rowNumber? rowNumber : 4}
                />
            </Form.Item>
        </>
    )
}

export default TextAreaInput
