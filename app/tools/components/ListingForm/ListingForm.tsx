'use client'
import { memo, type ChangeEvent } from 'react'
import { useAppSelector, type RootState } from '@/Redux/store'
import { Input, Form, AutoComplete } from 'antd'
import { FiSearch } from 'react-icons/fi'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CKEditorAny: any = CKEditor as any;
import styles from './ListingForm.module.scss'
// import UploadImage from '../UploadImage/UploadImage'
import UploadImage from '../UploadFile/UploadFile';
import RoomFirnishings from './RoomFirnishings'
import BtnFooterRenterProfileComponent from '../BtnFooterRenterProfile/BtnFooterRenterProfile'
import { bathroom_type, bed_size } from '@/common/ParamsCommon/ParamsCommon'
// import { setOptionAddressSearchResult } from '../../Redux/slices/ListingManagementSlice'
// import { useSelector, useDispatch } from 'react-redux'
// import { getAddressResult, insertListing } from '../../Redux/Actions/ListingManagementAction'
// import { convertTimeRawValueToTimeStamp } from '../../common/FunctionCommon/FunctionCommon'
// import { handleCheckValidListHouseMates } from './validate'
// import { v4 as uuidv4 } from 'uuid'
// import { useNavigate } from 'react-router-dom'
// import { setOpenPopupSignIn } from '../../Redux/slices/SignInSlice'
import { handleCheckUserTokenExits } from '@/common/FunctionCommon/FunctionCommonForClientComponent'
import TextInput from '@/components/Controlls/TextInput/TextInput'
import NumberInput from '@/components/Controlls/NumberInput/NumberInput'
import DateTimeInput from '@/components/Controlls/DateTimeInput/DateTimeInput'
import SelectInput from '@/components/Controlls/SelectInput/SelectInput'
interface commonOptionObject {
    id: string,
    value: string,
    label: string
}
interface ListingFormProps {
    form: any,
    onFinish: (values: any) => void,
    listFirnishings: any[],
    options: any[],
    fileList: any[],
    setFileList: (fileList: any[]) => void,
    description: string,
    numberHousemates: any[],
    countSubmit: number,
    handleCancel: () => void,
    setKeySearch: (value: string) => void,
    handleSetListFirnishings: (funitureId: string) => void,
    handleAddHousemates: () => void,
    handleChangeNumberOfHousemates: (value: number) => void,
    setDescription: (value: string) => void,
    setNumberHousemates: (value: any[]) => void,
    modePage: "create" | "edit" 
}
function ListingForm(props: ListingFormProps) {
    const { form, onFinish, listFirnishings, options, fileList, setFileList, description, numberHousemates, countSubmit, handleCancel,
        setKeySearch, handleSetListFirnishings, handleAddHousemates, handleChangeNumberOfHousemates, setDescription,
        setNumberHousemates, modePage } = props
    const { isLoading } = useAppSelector((state: RootState) => state.loadingSlice)

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setKeySearch(e.target.value)
    }

    const handleSetDescription = (_value: unknown, editor: { getData: () => string }) => {
        const data = editor.getData()
        setDescription(data)
    }
    const bathroomTypeOptions: commonOptionObject[] = [];
    const bedSizeOptions: commonOptionObject[] = [];
    bathroom_type.forEach(e => {
        bathroomTypeOptions.push({
            id: e.code,
            value: e.code,
            label: e.name
        })
    })
    bed_size.forEach(e => {
        bedSizeOptions.push({
            id: e.code,
            value: e.code,
            label: e.name
        })
    })

    return (
        <>
            <div className={styles['addItem']}>
                <div className={styles['addItemContainer']}>
                    <p className={styles['titlePage']}>{modePage === "edit" ? "Update the" : "Create a"} listing</p>
                    <div>
                        <Form
                            onFinish={onFinish}
                            form={form}
                        >
                            {/* LISTING ID */}
                            <div className={styles['inputItem']}>
                                <p className={styles['titleSection']}>Mã phòng</p>
                                <TextInput
                                    name='listing_id'
                                    customClassname={styles['inputText']}
                                    disabled={modePage === 'edit' ? true : false}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Room ID is required'
                                        }
                                    ]}
                                />
                                {/* <Form.Item
                                    style={{
                                        marginTop: 0,
                                        marginBottom: 0,
                                    }}
                                    name='listing_id'
                                    className={styles['formItem']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Listing ID is required'
                                        }
                                    ]}
                                >
                                    <Input
                                        className={styles['inputText']}
                                        disabled={modePage === 'edit' ? true : false}
                                    />
                                </Form.Item> */}
                            </div>

                            {/* ROOM NAME */}
                            <div className={styles['inputItem']}>
                                <TextInput
                                    label={"Room name"}
                                    name='room_name'
                                    customClassname={styles['inputText']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Room name is required'
                                        }
                                    ]}
                                />
                                {/* <p className={styles['titleSection']}>Room name</p>
                                <Form.Item
                                    style={{
                                        marginTop: 0,
                                        marginBottom: 0,
                                    }}
                                    name='room_name'
                                    className={styles['formItem']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Room name is required'
                                        }
                                    ]}
                                >
                                    <Input
                                        className={styles['inputText']}
                                    />
                                </Form.Item> */}
                            </div>


                            {/*PROPERTY ADDRESS */}
                            <div className={styles['inputItem']}>
                                <p className={styles['titleSection']}>Property address</p>
                                <Form.Item
                                    style={{
                                        marginTop: 0,
                                        marginBottom: 0,
                                    }}
                                    name='location'
                                    className={styles['formItem']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Property address is required'
                                        }
                                    ]}
                                >
                                    <AutoComplete
                                        options={options}
                                        allowClear={true}
                                        className={styles[''] + ' ' + styles['div_selectInput']}
                                        disabled={false}
                                    >
                                        <Input
                                            className={styles['searchAddress'] + ' ' + styles['inputAutoComplete']}
                                            onChange={handleSearch}
                                            prefix={<FiSearch className={styles['iconInputControl']} />}
                                        />
                                    </AutoComplete>
                                </Form.Item>
                            </div>

                            {/* RENT PER WEEK */}
                            <div className={styles['inputItem']}>
                                {/* <p className={styles['titleSection']}>Rent per week</p> */}
                                <NumberInput
                                    label="Price per night"
                                    name='price'
                                    customClassName={styles['inputControl']}
                                    prefix="$"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Price per night is required'
                                        }
                                    ]}
                                />
                                {/* <Form.Item
                                    style={{
                                        marginTop: 0,
                                        marginBottom: 0,
                                    }}
                                    name='rent_per_week'
                                    className={styles['formItem']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Rent per week is required'
                                        }
                                    ]}
                                >
                                    <InputNumber
                                        prefix="$"
                                        className={styles['inputControl']}
                                        step={false}
                                    />
                                </Form.Item> */}
                            </div>

                            {/* DATE AVAILABLE  */}
                            <div className={styles['inputItem']}>
                                <DateTimeInput
                                    label="Date available"
                                    name='date_available'
                                    customClassName={styles['inputTime']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Date available  is required'
                                        }
                                    ]}
                                />
                                {/* <p className={styles['titleSection']}>Date available </p>
                                <Form.Item
                                    style={{
                                        marginTop: 0,
                                        marginBottom: 0,
                                    }}
                                    className={styles['formItem']}
                                    name='date_available'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Date available  is required'
                                        }
                                    ]}
                                >
                                    <DatePicker
                                        format={DATE_FORMAT}
                                        className={styles['inputTime']}
                                    />
                                </Form.Item> */}
                            </div>

                            {/* MINIMUM LENGTH OF STAY*/}
                            {/* <div className={styles['inputItem']}>
                                <NumberInput
                                    label="Minimum length of stay"
                                    name='minimum_stay'
                                    customClassName={styles['inputControl']}
                                    placeholder='month'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Minimum length of stay is required'
                                        }
                                    ]}
                                />
                            </div> */}

                            {/* TOTAL BEDROOMS */}
                            <div className={styles['inputItem']}>
                                <NumberInput
                                    label="Total bedrooms in the property"
                                    name='num_bedroom'
                                    customClassName={styles['inputControl']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Total bedrooms in the property is required'
                                        }
                                    ]}
                                />
                                {/* <p className={styles['titleSection']}>Total bedrooms in the property</p>
                                <Form.Item
                                    style={{
                                        marginTop: 0,
                                        marginBottom: 0,
                                    }}
                                    name='num_bedroom'
                                    className={styles['formItem']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Total bedrooms in the property is required'
                                        }
                                    ]}
                                >
                                    <InputNumber
                                        className={styles['inputControl']}
                                    />
                                </Form.Item> */}
                            </div>

                            {/* TOTAL BATHROOMS */}
                            <div className={styles['inputItem']}>
                                <NumberInput
                                    label="Total bathrooms in the property"
                                    name='num_bathroom'
                                    customClassName={styles['inputControl']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Total bathrooms in the property is required'
                                        }
                                    ]}
                                />
                                {/* <p className={styles['titleSection']}>Total bathrooms in the property</p>
                                <Form.Item
                                    style={{
                                        marginTop: 0,
                                        marginBottom: 0,
                                    }}
                                    name='num_bathroom'
                                    className={styles['formItem']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Total bathrooms in the property is required'
                                        }
                                    ]}
                                >
                                    <InputNumber
                                        className={styles['inputControl']}
                                    />
                                </Form.Item> */}
                            </div>





                            {/*  BATHROOM TYPE   */}
                            <div className={styles['inputItem']}>
                                <SelectInput
                                    label="Bathroom type"
                                    name="bathroom_type"
                                    placeholder='Select'
                                    options={bathroomTypeOptions}
                                    customClassName={styles['inputSelect']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Reference type is required'
                                        },
                                    ]}
                                />
                                {/* <p className={styles['titleSection']}>Bathroom type</p>
                                <div>
                                    <Form.Item
                                        style={{
                                            marginTop: 0,
                                            marginBottom: 0,
                                        }}
                                        name="bathroom_type"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Reference type is required'
                                            },
                                        ]}
                                    >
                                        <Select
                                            className={styles['inputSelect']}
                                            placeholder='Select'
                                        >
                                            {
                                                bathroom_type.map((el, index) => (
                                                    <Option key={index} value={el.code}>{el.name}</Option>
                                                ))
                                            }
                                        </Select>
                                    </Form.Item>
                                </div> */}
                            </div>


                            {/*  BED SIZE   */}
                            <div className={styles['inputItem']}>

                                <SelectInput
                                    label="Bed size"
                                    name="bed_size"
                                    placeholder='Select'
                                    options={bedSizeOptions}
                                    customClassName={styles['inputSelect']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Reference type is required'
                                        },
                                    ]}
                                />
                                {/* <p className={styles['titleSection']}>Bed size</p>
                                <div>
                                    <Form.Item
                                        style={{
                                            marginTop: 0,
                                            marginBottom: 0,
                                        }}
                                        name="bed_size"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Reference type is required'
                                            },
                                        ]}
                                    >
                                        <Select
                                            className={styles['inputSelect']}
                                            placeholder='Select'
                                        >
                                            {
                                                bed_size.map((el, index) => (
                                                    <Option key={index} value={el.code}>{el.name}</Option>
                                                ))
                                            }
                                        </Select>

                                    </Form.Item>
                                </div> */}
                            </div>

                            {/*  ROOM FIRNISHINGS */}
                            <div className={styles['inputItem']}>
                                <p className={styles['titleSection']}>Room firnishings</p>
                                <RoomFirnishings
                                    listFirnishings={listFirnishings}
                                    handleSetListFirnishings={handleSetListFirnishings}
                                />
                            </div>


                            {/* NUMBER OF HOUSEMATES */}
                            <div className={styles['inputItem']}>
                                <NumberInput
                                    label="Number of housemates"
                                    name='number_housemates'
                                    customClassName={styles['inputControl']}
                                    onChange={handleChangeNumberOfHousemates}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Number of housemates is required'
                                        }
                                    ]}
                                />
                            </div>

                            {/* PROPERTY AND ROOM IMAGES */}
                            <div className={styles['inputItem']}>
                                <p className={styles['titleSection']}>Property and room images</p>
                                <UploadImage
                                    fileList={fileList}
                                    setFileList={setFileList}
                                    maxCount={null}
                                    multiple={true}
                                    isDisable={false}
                                />
                            </div>

                            {/* DESCRIPTION */}
                            <div className={styles['inputItem']}>
                                <p className={styles['titleSection']}>Description</p>
                                <CKEditorAny
                                    editor={ClassicEditor}
                                    data={description ? description : ""}
                                    onReady={(editor: any) => {
                                        // You can store the "editor" and use when it is needed.
                                        console.log('Editor is ready to use!', editor);
                                    }}
                                    onChange={(event: any, editor: any) => {
                                        handleSetDescription(event, editor)
                                    }}
                                    onBlur={(event: any, editor: any) => {
                                        console.log('Blur.', editor);
                                    }}
                                    onFocus={(event: any, editor: any) => {
                                        console.log('Focus.', editor);
                                    }}
                                />
                            </div>

                            <BtnFooterRenterProfileComponent
                                handleCancel={handleCancel}
                                isDisableSubmit={handleCheckUserTokenExits() ? false : true}
                                handleSubmit={() => { }}
                                isLoading={isLoading}
                            />
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}



export default memo(ListingForm)
