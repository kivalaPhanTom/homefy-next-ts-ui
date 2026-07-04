'use client'
import { Form, AutoComplete, Input } from "antd";
import { FiSearch } from 'react-icons/fi'
import styleCommon from "../controller.module.scss";
import styles from "./AddressInput.module.scss"

interface AddressInputProps {
    options: any[];
    label?: string;
    disabled?: boolean;
    handleSearch?: React.ChangeEventHandler<HTMLInputElement>;
    name: string;
    rules?: any[];
    allowClear?: boolean;
    placeholder?: string;
}
function AddressInput(props: AddressInputProps) {
    const { options, label, disabled = false, handleSearch, name, rules, allowClear = false, placeholder } = props;
    return (
        <>
            {label && <p className={styleCommon['titleSection']}>Address</p>}
            <Form.Item
                name={name}
                rules={rules}
                className={styles["addressForm"]}
            >
                <AutoComplete
                    options={options}
                    // onSearch={handleSearch}
                    allowClear={allowClear}
                    className={styles['selectInput'] + ' ' + styles['div_selectInput']}
                    disabled={disabled}
                >
                    <Input
                        className={styles['searchAddress']}
                        placeholder={placeholder ? "Search for your address" : ""}
                        onChange={handleSearch}
                        prefix={<FiSearch className={styles['iconInputControl']} />}
                    />
                </AutoComplete>
            </Form.Item>
        </>
    )
}

export default AddressInput
