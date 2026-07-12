'use client'
import { useEffect, useState, memo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { Form } from 'antd'
import type { RootState } from '@/Redux/store';
import { setOpenPopupSignIn } from '@/Redux/slices/SignInSlice'
import { handleCheckUserTokenExits } from '@/common/FunctionCommon/FunctionCommonForClientComponent'
import { setOptionAddressSearchResult } from '@/Redux/slices/ListingManagementSlice'
import { insertListing } from '@/Redux/Actions/ListingManagementAction'
import { v4 as uuidv4 } from 'uuid'
import { convertTimeRawValueToTimeStamp } from '@/common/FunctionCommon/FunctionCommon'
// import { handleCheckValidListHouseMates } from './validate'
import ListingForm from '@/app/tools/components/ListingForm/ListingForm'
import { useLazySearchAddressResultQuery } from '@/RTK_Query/SearchAddressResult'
// import { convertSearchAddressOption } from '@/utils/SearchAddress_utils'

function CreateListingForm() {
    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const { push } = useRouter()
    // const { optionAddressSearchResult } = useSelector((state) => state.listingManagementSlice)
    // const [options, setOptions] = useState([])
    const [fileList, setFileList] = useState<any[]>([])
    const [description, setDescription] = useState('')
    const [numberHousemates, setNumberHousemates] = useState<any[]>([])
    const [listFirnishings, setListFirnishings] = useState<string[]>([])
    const [keySearch, setKeySearch] = useState('')
    const [countSubmit, setCountSubmit] = useState(0)
    const numberHouseMate = Form.useWatch('number_housemates', form)
    const { isLogin } = useSelector((state: RootState) => state.signInSlice)
    const [trigger, result] = useLazySearchAddressResultQuery()
    const { data } = result
    let options: any[] = data ? (data.result || []).map((item: any) => item) : []

    useEffect(() => {
        if (!handleCheckUserTokenExits()) {
            dispatch(setOpenPopupSignIn(true))
        }
    }, [isLogin])

    useEffect(() => {
        if (keySearch.trim() === '') {
            dispatch(setOptionAddressSearchResult([]))
        } else {
            const handleSearchApiFunction = setTimeout(() => {
                // const payload = {
                //     data: keySearch,
                //     lang: ''
                // }
                trigger({ data: keySearch }, true)
                // dispatch(getAddressResult(payload))
            }, 500)
            return () => clearTimeout(handleSearchApiFunction)
        }

    }, [keySearch])

    // useEffect(() => {
    //     if (optionAddressSearchResult.length > 0) {
    //         let result = []
    //         optionAddressSearchResult.forEach(el => {
    //             result.push(
    //                 {
    //                     label: el.name,
    //                     value: el.name,
    //                     detail: el
    //                 }
    //             )
    //         })
    //         setOptions(result)
    //     } else {
    //         setOptions([])
    //     }
    // }, [JSON.stringify(optionAddressSearchResult)])

    const handleChangeNumberOfHousemates = (value: number | null): void => {
        let numberHousematesClone = JSON.parse(JSON.stringify(numberHousemates))
        if (value) {
            if (value > numberHousematesClone.length) {
                let distanceNumber = Number(value) - numberHousematesClone.length
                let initHouseMates = []
                for (let i = 0; i < distanceNumber; i++) {
                    initHouseMates.push({
                        idfe: uuidv4(),
                        gender: null,
                        age: null,
                        occupation: null
                    })
                }
                setNumberHousemates([...numberHousematesClone, ...initHouseMates])
            } else {
                const initHouseMates = numberHousematesClone.slice(0, Number(value))
                setNumberHousemates(initHouseMates)
            }
        } else {
            setNumberHousemates([])
        }
    }

    // const handleSearch = (e) => {
    //     setKeySearch(e.target.value)
    // }
    const handleSetListFirnishings = useCallback((value:string):void => {
        let listFirnishingsClone: string[] = JSON.parse(JSON.stringify(listFirnishings))
        if (listFirnishingsClone.includes(value)) {
            listFirnishingsClone = listFirnishingsClone.filter((el: string) => el !== value)
        } else {
            listFirnishingsClone.push(value)
        }
        setListFirnishings(listFirnishingsClone)
    }, [JSON.stringify(listFirnishings)])

    // const handleSetDescription = (value, editor) => {
    //     const data = editor.getData()
    //     setDescription(data)
    // }

    const handleAddHousemates = () => {
        let numberHousematesClone = JSON.parse(JSON.stringify(numberHousemates))
        numberHousematesClone.push({
            idfe: uuidv4(),
            gender: null,
            age: null,
            occupation: null
        })
        setNumberHousemates(numberHousematesClone)
        form.setFieldsValue({
            number_housemates: numberHousematesClone.length,
        })
    }
    const handleManualValidate = ():boolean => {
        let result = true
        // setCountSubmit(preState => preState + 1)
        // if (numberHouseMate !== null && numberHouseMate !== undefined && numberHouseMate > 0) {
        //     const checkValidHousemates = handleCheckValidListHouseMates(numberHousemates)
        //     if (checkValidHousemates === false) {
        //         result = false
        //     }

        // }
        return result
    }

    const onFinish = (values: Record<string, any>) => {
        // let location = ''
        let formDataFile: FormData | null = null
        console.log('valuesxxxx:', values)
        const manualValid = handleManualValidate()
        let lat = null
        let lon = null

        console.log('manualValid:', manualValid)
        if (manualValid) {
            if (fileList.length > 0) {
                formDataFile = new FormData()
                fileList.forEach((el: any) => {
                    if (el.originFileObj) {
                        formDataFile?.append('images', el.originFileObj)
                    }
                })
            }

            options.forEach((el: any) => {
                if (el.detail.display_name === values.location) {
                    lat = parseFloat(el.detail.lat)
                    lon = parseFloat(el.detail.lon)
                }
            })
            let numberHousematesClone: any[] = JSON.parse(JSON.stringify(numberHousemates))
            numberHousematesClone.forEach((el: any) => {
                delete el.id
            })
            const data = {
                address: values.location,
                code: values.listing_id,
                price: values.price,
                date_available: values.date_available ? convertTimeRawValueToTimeStamp(values.date_available) : null,
                minimum_stay: values.minimum_stay,
                num_bedroom: values.num_bedroom,
                num_bathroom: values.num_bathroom,
                name: values.room_name,
                bathroom_type: values.bathroom_type,
                bed_size: values.bed_size,
                // room_firnishings: listFirnishings,
                room_firnishings: listFirnishings,
                description: description,
                max_guests: values.number_housemates,//temp
                status: "AVAILABLE", //temp,
                lat,
                lon,

                // housemates_info: numberHousematesClone
            }
            const payload = {
                data,
                formDataFile,
                form,
                setFileList,
                setDescription,
                setNumberHousemates,
                setListFirnishings,
                lang: '',
                navigate: push
            }
            console.log('payloadxxxxL', payload)
            dispatch(insertListing(payload))
        }
    }
    const handleCancel = () => {
        form.resetFields()
        // setOptions([])
        setFileList([])
        setDescription('')
        setNumberHousemates([])
        setListFirnishings([])
        setKeySearch('')
        setCountSubmit(0)
        push('/admin/listing-managerment')
    }

    return (
        <ListingForm
            form={form}
            onFinish={onFinish}
            listFirnishings={listFirnishings}
            options={options}
            fileList={fileList}
            setFileList={setFileList}
            description={description}
            numberHousemates={numberHousemates}
            countSubmit={countSubmit}
            handleCancel={handleCancel}
            setKeySearch={setKeySearch}
            handleSetListFirnishings={handleSetListFirnishings}
            handleAddHousemates={handleAddHousemates}
            handleChangeNumberOfHousemates={handleChangeNumberOfHousemates}
            setDescription={setDescription}
            setNumberHousemates={setNumberHousemates}
            modePage='create'
        />
    )
}


export default memo(CreateListingForm)
