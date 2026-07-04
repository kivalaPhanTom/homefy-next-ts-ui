'use client'
import type { InputNumberProps } from "antd";
import { InputNumber, Form } from "antd";
import styleCommon from '../controller.module.scss'
import styles from "./NumberInput.module.scss"

interface NumberInputProps {
    label?: string;
    name: string;
    rules?: any[];
    disabled?: boolean;
    placeholder?: string;
    prefix?: string;
    isDigits?: boolean;
    isNoFormat?: boolean;
    customClassName?: string;
    onChange?: (value: any) => void;
}

const NumberInput = (props: NumberInputProps) => {
    const { label, name, rules = [], disabled = false, placeholder = "", prefix = "", isDigits = false, isNoFormat = false, customClassName = "", onChange = null } = props;
    const handlePressMinus = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const regex = isDigits ? /^\d*\.?\d*$/ : new RegExp('[0-9]');
        const key = String.fromCharCode(!e.charCode ? e.which : e.charCode)
        if (isDigits) {
            const value = e.currentTarget.value;
            // const { value } = e.target;
            if (key === '.' && value && value.toString().includes('.')) e.preventDefault();
        }
        if (!regex.test(key)) {
            e.preventDefault()
            return false;
        }
    }
    const handlerFormatter: InputNumberProps["formatter"] = (value: any): string => {
        if (isNoFormat) return value;
        if (isDigits) {
            return value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''
        } else {
            return value ? `${parseInt(value, 10).toLocaleString('en-US')}` : ''
        }
    };

    const handlerParser: InputNumberProps["parser"] = (value:any): number | string => {
        if (isNoFormat) return value ? Number(value) : 0;
        if (isDigits) {
            const parsedValue = value.toString().replace(/[^0-9.]/g, '');
            return parseFloat(parsedValue);
        } else {
            return value ? parseInt(value.replace(/\D/g, ''), 10) : ""
        }
    }
    return (
        <>
            {label && <p className={styleCommon['titleSection']}>{label}</p>}
            <Form.Item
                name={name}
                rules={rules}
                style={{
                    marginTop: 0,
                    marginBottom: 0,
                }}
            >
                <InputNumber
                    className={customClassName ? customClassName : styles["inputControl"]}
                    prefix={prefix}
                    onKeyPress={handlePressMinus}
                    disabled={disabled}
                    placeholder={placeholder}
                    formatter={handlerFormatter}
                    parser={handlerParser}
                    onChange={onChange ? onChange : () => { }}
                />
            </Form.Item>
        </>
    );
};


export default NumberInput;
