'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import ProductListingItem from '@/components/ProductListingItem/ProductListingItem'
import CreateListingButton from './CreateListingButton'
import styles from './ManageListings.module.scss'
import { handleCheckUserTokenExits } from '@/common/FunctionCommon/FunctionCommonForClientComponent'
import { setOpenPopupSignIn } from '@/Redux/slices/SignInSlice'
import { getListings } from '@/Redux/Actions/ListingManagementAction'
import LoadmoreBtn from '@/components/LoadmoreBtn/LoadmoreBtn'
import { setOpenDeleteListing } from '@/Redux/slices/ListingManagementSlice'
import DeletePopup from '@/components/DeletePopup/DeletePopup'
import { deleteListing } from '@/Redux/Actions/ListingManagementAction'
import { handleErrorRTKQuery } from '@/common/FunctionCommon/FunctionCommon'
import { setLoading } from '@/Redux/slices/LoadingSlice'
import { useLazyGetRoomsQuery } from '@/RTK_Query/GetRooms_Query'
import { setListings } from '@/Redux/slices/ListingManagementSlice'
import Loading from '@/app/tools/components/Loading/Loading'
import { DEFAULT_LIMIT, DEFAULT_OFFSET, PAGE_INDEX } from '@/common/ParamsCommon/ParamsCommon'

function ManageListings(props) {
    const dispatch = useDispatch()
    const [itemDeleted, setItemDeleted] = useState(null)
    const [countLoading, setLoadingState] = useState(0)
    const [isFirstLoading, setIsFirstLoading] = useState(false)
    const { isLogin } = useSelector((state) => state.signInSlice)
    const { listings, isShowBtnLoadmore, isOpenDeleteListing } = useSelector((state) => state.listingManagementSlice)
    const { isLoading } = useSelector((state) => state.loadingSlice)
    const [isLoadingMoreBtn, setLoadingMoreBtn] = useState(false)
    // const queryString = renderQueryString()
    const { limit, offset, pageIndex } = props
    // const limit = Number(queryString.limit) || DEFAULT_LIMIT
    // const offset = Number(queryString.offset) || DEFAULT_OFFSET
    // const pageIndex = Number(queryString.pageIndex) || PAGE_INDEX
    // console.log('queryString.offset:', queryString.offset)
    const { push } = useRouter()
    const [isReset, setIsRest] = useState(false)
    const [trigger, result] = useLazyGetRoomsQuery()
    const { data, isFetching, error } = result
    // useEffect(() => {

    // }, [countLoading])
    useEffect(() => {
        if (handleCheckUserTokenExits()) {
            handleTriggerQueryData(true)
        } else {
            dispatch(setOpenPopupSignIn(true))
        }
        return () => {
            setIsRest(true)
            dispatch(setListings([])) 
        }
    }, [isLogin])

    useEffect(() => {
        return () => {
            setLoadingState(0)
            setLoadingMoreBtn(false)
            setIsFirstLoading(false)
        }
    }, [])

    useEffect(() => {
        if (data && !error) {
            console.log('dataxxx:', data)
            const listRoom = data.result.data
            const total = data.result.count
            let filterData = {
                // limitParams: limit,
                // offsetParams: offset,
                pageIndexParams: pageIndex,
                isReset: isReset,
                listRoom,
                total
            }
            if (isReset) { //TH lần đầu tiên mới vào trang
                // let newLimit = limit
                // if (offset > 0) {
                //     try {
                //         newLimit = Number(offset) * Number(pageIndex)
                //     } catch (error) {
                //         //
                //     }
                // }
                // filterData.limitParams = newLimit
                // filterData.offsetParams = DEFAULT_OFFSET
                filterData.currentPage = 1
            } else { //TH có bấm nút loadmore để lấy dữ liệu
                setIsRest(false)
                filterData.isReset = false
            }
            console.log('YYYYYY:', filterData)
            updateDataToStore(filterData)
        }
    }, [JSON.stringify(data)])

    useEffect(() => {
        if (isFetching) {
            dispatch(setLoading(true))
            setIsFirstLoading(true)
        } else {
            dispatch(setLoading(false))
            setLoadingMoreBtn(false)
        }
        if (isFirstLoading && !isFetching) {
            setLoadingState(prev => prev + 1)
        }
    }, [isFetching])

    useEffect(() => {
        // if (error) {
        //     const lang = {}
        //     const isShowError = true
        //     const refetch = handleTriggerQueryData(false)
        //     handleErrorRTKQuery(data, error, refetch, isShowError, lang)
        // }
    }, [error])

    const handleLoadMore = () => {
        setIsRest(false)
        setLoadingState(prev => prev + 1)
        setLoadingMoreBtn(true)
        const newOffset = offset + limit
        const newPageIndex = pageIndex + 1
        let filterData = {
            limitParams: limit,
            offsetParams: newOffset,
        }
        // queryToCallAPi(filterData, true)
        // push(`?limit=${limit}&&offset=${newOffset}&&pageIndex=${newPageIndex}`, { scroll: false })
    }

    const handleTriggerQueryData = (isCache) => {
        setIsRest(true)
        let filterData = {
            currentPage:1,
            pageSize: DEFAULT_LIMIT
            // limitParams: limit,
            // offsetParams: DEFAULT_OFFSET,
        }
        if (offset !== DEFAULT_OFFSET) {
            // try {
            //     filterData.limitParams = Number(offset) * Number(pageIndex)
            // } catch (error) {
            //     console.log(error)
            // }
        }
        queryToCallAPi(filterData, isCache)
    }

    const queryToCallAPi = (filterData, isCache) => { //dangcode
        // const { limitParams, offsetParams } = filterData
        const { currentPage, pageSize } = filterData

        let payloadFilter = {
            currentPage,
           pageSize,
        }
        console.log('payloadFilter:', payloadFilter)
        trigger({ data: payloadFilter }, isCache)
    }

    const updateDataToStore = (filterData) => {
        // const { limitParams, offsetParams, pageIndexParams, isReset, listRoom = [], total = 0 } = filterData
        const { currentPage, offsetParams, pageIndexParams, isReset, listRoom = [], total = 0 } = filterData
        let payloadFilter = {
            // offset: offsetParams,
            // limit: limitParams,
            currentPage:currentPage,
            pageIndex: pageIndexParams,
        }
        console.log('payloadFilter:', payloadFilter)
        const payload = {
            data: payloadFilter,
            listRoom,
            total,
            isReset,
            language: ''
        }
        dispatch(getListings(payload))
    }
    const handleSetOpenConfirmDelete = (value) => {
        dispatch(setOpenDeleteListing(value))
        if (!value) {
            setItemDeleted(null)
        }
    }

    const handleConfirmDelete = () => {
        const payload = {
            data: itemDeleted.id,
            language: '',
            callRTKquery: () => { handleTriggerQueryData(false) }
        }
        dispatch(deleteListing(payload))
    }

    return (
        <div className={styles['manageListings']}>
            <div className={styles['manageListingsContainer']}>
                <p className={styles['titlePage']}>MANAGE LISTINGS</p>
                <div className={styles['list']}>
                    <div className={styles['listContainer'] + ' ' + styles[listings.length > 1 ? '' : 'emptyContainer']}>
                        <>
                            {
                                handleCheckUserTokenExits() ? (
                                    <>
                                        <div className={styles['item'] + ' ' + styles[listings.length > 1 ? 'flexQuantityLarge1' : '']}>
                                            <CreateListingButton />
                                        </div>
                                        {
                                            listings.map((el, index) => (
                                                <div key={index} className={styles['item'] + ' ' + styles[listings.length > 1 ? 'flexQuantityLarge1' : '']}>
                                                    <ProductListingItem
                                                        data={el}
                                                        handleSetOpenConfirmDelete={handleSetOpenConfirmDelete}
                                                        setItemDeleted={setItemDeleted}
                                                    />
                                                </div>
                                            ))
                                        }
                                        {
                                            isShowBtnLoadmore && listings.length > 0 ?
                                                <LoadmoreBtn handleLoadMore={handleLoadMore} isLoading={isLoadingMoreBtn} />
                                                : ''
                                        }
                                    </>
                                ) : (
                                    <p className={styles['emptyData']}>No data</p>
                                )
                            }
                        </>
                    </div>
                </div>
            </div>
            <DeletePopup
                isOpen={isOpenDeleteListing}
                title={'Do you want to delete this room ?'}
                subtitle=''
                setOpenPopup={handleSetOpenConfirmDelete}
                handleOk={handleConfirmDelete}
                isLoading={isLoading}
            />
            {countLoading === 0 && isLoading ? <Loading /> : <></>}
        </div>
    )
}

export default ManageListings
