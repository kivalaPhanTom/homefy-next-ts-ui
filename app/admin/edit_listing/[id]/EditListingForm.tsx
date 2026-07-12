'use client'
import { useEffect, useState, memo, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { updateListing } from '@/Redux/Actions/ListingManagementAction'
import { Form } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import ListingForm from '@/app/tools/components/ListingForm/ListingForm'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/Redux/store'
import type { RootState } from '@/Redux/store';
import { handleCheckUserTokenExits } from '@/common/FunctionCommon/FunctionCommonForClientComponent'
import { setOptionAddressSearchResult } from '@/Redux/slices/ListingManagementSlice'
// import { getAddressResult, insertListing } from '../../Redux/Actions/ListingManagementAction'
import { setOpenPopupSignIn } from '@/Redux/slices/SignInSlice'
// import { handleCheckValidListHouseMates } from '../../listing_creation/validate'
import { convertTimeRawValueToTimeStamp, converTimeStampToDayJsDate } from '@/common/FunctionCommon/FunctionCommon'
import { handleErrorRTKQuery } from '@/common/FunctionCommon/FunctionCommon'
import { useGetListingDetailQuery } from '@/RTK_Query/Listing_Query'
import { setLoading } from '@/Redux/slices/LoadingSlice'
import { useLazySearchAddressResultQuery } from '@/RTK_Query/SearchAddressResult'
// import { convertSearchAddressOption } from '@/utils/SearchAddress_utils'
import Loading from '@/app/tools/components/Loading/Loading'

function checkAddFile(listFile: any[]) {
  let result = false
  for (let i = 0; i < listFile.length; i++) {
    if (listFile[i].originFileObj) {
      result = true
      break
    }
  }
  return result
}
interface EditListingFormProps {
  roomId: string;
}
function EditListingForm(props: EditListingFormProps) {
  const { roomId } = props
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const { push } = useRouter()
  const router = useRouter()
  // const { listingInfo } = useSelector((state) => state.listingManagementSlice)
  // const [options, setOptions] = useState([])
  const [fileList, setFileList] = useState<any[]>([])
  const [description, setDescription] = useState('')
  const [numberHousemates, setNumberHousemates] = useState<any[]>([])
  const [listFirnishings, setListFirnishings] = useState<string[]>([])
  const [countSubmit, setCountSubmit] = useState(0)
  const [countLoading, setLoadingState] = useState(0)
  const { isLoading } = useAppSelector((state:RootState) => state.loadingSlice)
  const [keySearch, setKeySearch] = useState('')
  // const { optionAddressSearchResult } = useSelector((state) => state.listingManagementSlice)
  const numberHouseMate = Form.useWatch('number_housemates', form)
  const { isLogin } = useAppSelector((state: RootState) => state.signInSlice)
  const { data, isFetching, error, refetch } = useGetListingDetailQuery({ roomId })
  // console.log('dataxxx:', data)
  const listingInfo = data ? data.result : null
  console.log('listingInfo:', listingInfo)
  const [trigger, result] = useLazySearchAddressResultQuery()
  const dataSearchResult = result.data || []
  console.log('dataSearchResult:', dataSearchResult)
  let options: any[] = data ? (dataSearchResult.data || []).map((item: any) => item) : []

  interface documentObject {
    uid: string;
    name: string; 
    status: string;
    url: string;
    id: string;
  }
  useEffect(() => {
    if (isFetching) {
      dispatch(setLoading(true))
    } else {
      dispatch(setLoading(false))
    }
  }, [isFetching])

  useEffect(() => {
    return () => {
      dispatch(setLoading(false))
    }
  }, [])
 
  useEffect(() => {
    if (error) {
      const lang = {}
      const isShowError = true
      handleErrorRTKQuery(data, error, refetch, isShowError, lang)
    }
  }, [error])

  useEffect(() => {
    if (listingInfo) {
      // let listHouseMates = []
      // listingInfo.housemates_info.forEach(el => {
      //   let elClone = { ...el }
      //   elClone.idfe = uuidv4()
      //   listHouseMates.push(elClone)
      // })
      const furnitures = listingInfo.furnitures
      form.setFieldsValue({
        location: listingInfo.address,
        price: listingInfo.price,

        minimum_stay: listingInfo.minimum_stay,
        num_bedroom: listingInfo.num_bedroom,
        num_bathroom: listingInfo.num_bathroom,
        room_name: listingInfo.name,
        bathroom_type: listingInfo.bathroom_type,
        bed_size: listingInfo.bed_size,
        // number_housemates: listingInfo.housemates_info ? listingInfo.housemates_info.length : 0,
        number_housemates: listingInfo.max_guests,
        listing_id: listingInfo.code,
        date_available: listingInfo.date_available ? converTimeStampToDayJsDate(listingInfo.date_available) : null
      })
      setNumberHousemates([])
      setDescription(listingInfo.description)
      setListFirnishings(furnitures)
      setCountSubmit(0)
      let document_url: documentObject[] = []
      if (listingInfo.images) {
        listingInfo.images.forEach((element: any) => {
          document_url.push({
            uid: uuidv4(),
            name: element.path,
            status: 'done',
            url: element.path,
            id: element.id
          })
        })
      }
      setFileList(document_url)
    }
  }, [JSON.stringify(listingInfo)])


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
        //   data: keySearch,
        //   lang: ''
        // }
        trigger({ data: keySearch }, true)
        // dispatch(getAddressResult(payload))
      }, 500)
      return () => clearTimeout(handleSearchApiFunction)
    }
  }, [keySearch])

  // useEffect(() => {
  //   if (optionAddressSearchResult.length > 0) {
  //     let result = []
  //     optionAddressSearchResult.forEach(el => {
  //       result.push(
  //         {
  //           label: el.name,
  //           value: el.name,
  //           detail: el
  //         }
  //       )
  //     })
  //     setOptions(result)
  //   } else {
  //     setOptions([])
  //   }
  // }, [JSON.stringify(optionAddressSearchResult)])

  const handleChangeNumberOfHousemates = (value:number|null):void => {
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

  const handleSetListFirnishings = useCallback((value:string):void => {
    let listFirnishingsClone: string[] = JSON.parse(JSON.stringify(listFirnishings))
    if (listFirnishingsClone.includes(value)) {
      listFirnishingsClone = listFirnishingsClone.filter((el: string) => el !== value)
    } else {
      listFirnishingsClone.push(value)
    }
    setListFirnishings(listFirnishingsClone)
  }, [JSON.stringify(listFirnishings)])

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
    setCountSubmit(preState => preState + 1)
    if (numberHouseMate !== null && numberHouseMate !== undefined && numberHouseMate > 0) {
      result = true
    }
    return result
  }

  const onFinish = (values: Record<string, any>): void => {
    // let location = ''
    let formDataFile: FormData | null = null
    let oldFile: string[] = []
    const manualValid = handleManualValidate()
    if (manualValid) {
      if (fileList.length > 0) {
        if (checkAddFile(fileList) === true) {
          formDataFile = new FormData()
          fileList.forEach((el: any) => {
            if (el.originFileObj) {
              formDataFile?.append('images', el.originFileObj)
            } else {
              oldFile.push(el.id)
            }
          })
        } else {
          fileList.forEach((el: any) => {
            oldFile.push(el.id)
          })
        }
      }

      // options.forEach(el => {
      //   if (el.detail.name === values.location) {
      //     location = el.value
      //     // locationObject.name = el.detail.name
      //     // locationObject.lat = el.detail.lat
      //     // locationObject.lon = el.detail.lon
      //   }
      // })
      let numberHousematesClone: any[] = JSON.parse(JSON.stringify(numberHousemates))
      numberHousematesClone.forEach((el: any) => {
        delete el.id
      })
      const data = {
        id: roomId,
        address: values.location,
        rent_per_week: values.rent_per_week,
        date_available: values.date_available ? convertTimeRawValueToTimeStamp(values.date_available) : null,
        minimum_stay: values.minimum_stay,
        num_bedroom: values.num_bedroom,
        num_bathroom: values.num_bathroom,
        room_name: values.room_name,
        bathroom_type: values.bathroom_type,
        bed_size: values.bed_size,
        room_firnishings: listFirnishings,
        description: description,
        number_housemates: values.number_housemates,
        housemates_info: numberHousematesClone,
        listing_id: values.listing_id
      }
      const payload = {
        data,
        oldFile,
        formDataFile,
        form,
        setFileList,
        setDescription,
        setNumberHousemates,
        setListFirnishings,
        lang: '',
        navigate:push
      }
      dispatch(updateListing(payload))
    }
  }
  const handleCancel = ():void => {
   
    // setOptions([])
    setFileList([])
    setDescription('')
    setNumberHousemates([])
    setListFirnishings([])
    setKeySearch('')
    setCountSubmit(0)
    form.resetFields()
    push('/admin/listing-managerment')
    
  }

  return (
    <div>{listingInfo ? (
      <ListingForm
        form={form}
        onFinish={onFinish}
        listFirnishings={listFirnishings}
        options={options}
        fileList={fileList}
        setFileList={setFileList}
        description={description ? description : ""}
        numberHousemates={numberHousemates}
        countSubmit={countSubmit}
        handleCancel={handleCancel}
        setKeySearch={setKeySearch}
        handleSetListFirnishings={handleSetListFirnishings}
        handleAddHousemates={handleAddHousemates}
        handleChangeNumberOfHousemates={handleChangeNumberOfHousemates}
        setDescription={setDescription}
        setNumberHousemates={setNumberHousemates}
        modePage='edit'
      />
    ) : ''}
      {countLoading === 0 && isLoading ? <Loading /> : <></>}
    </div>
  )
}

export default memo(EditListingForm)
