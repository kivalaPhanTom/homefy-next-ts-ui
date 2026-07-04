'use client'
import { Input, Form } from "antd";
import styleCommon from "../controller.module.scss";
interface EmailInputProps {
    label?: string;
    name: string;
    rules?: any[];
    disabled?: boolean;
    placeholder?: string;
    prefix?: React.ReactNode;
}
const EmailInput = (props: EmailInputProps) => {
    const { name = "", rules = [], disabled = false, label, prefix = null, placeholder = "" } = props;

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
                rules={[
                    {
                        type: "email",
                        message: "The input is not valid E-mail!",
                    },
                    ...rules
                ]}
            >
                <Input
                    className={styleCommon["inputControl"]}
                    disabled={disabled}
                    prefix={prefix}
                    placeholder={placeholder}
                />
            </Form.Item>
        </>
    );
}

export default EmailInput
