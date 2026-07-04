'use client'
import { useState, useEffect } from 'react'
import { Input, Form } from 'antd'
import styleCommon from '../controller.module.scss'
interface PasswordInputProps {
    label?: string;
    name: string;
    rules?: any[];
    disabled?: boolean;
    placeholder?: string;
    allowClear?: boolean;
    prefix?: React.ReactNode;
}
function PasswordInput(props: PasswordInputProps) {
    const { label, name, rules = [], disabled = false, placeholder = "", allowClear = true, prefix = null } = props;
    const [passwordVisible, setPasswordVisible] = useState(false)

    useEffect(() => {
        setPasswordVisible(false)
    }, [])

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
                <Input.Password
                    className={styleCommon['inputControl']}
                    visibilityToggle={{
                        visible: passwordVisible,
                        onVisibleChange: setPasswordVisible,
                    }}
                    placeholder={placeholder}
                    allowClear={allowClear}
                    prefix={prefix}
                    disabled={disabled}
                />
            </Form.Item>
        </>
    )
}


export default PasswordInput
