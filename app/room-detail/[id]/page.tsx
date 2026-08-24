import { cookies } from 'next/headers'
// import dynamic from 'next/dynamic'
import { initialState } from './InitModal'
import { USER_TOKEN, EXPIRED_TIME_TOKEN, REFRESH_TOKEN_IN_LOCALSTORAGE } from "@/common/ParamsCommon/ParamsCommon"
import { getDetailRoomApi } from '@/Services/NextProductServices'
// import ImgFrame from '@/app/room-detail/[id]/ImgFrame'
import styles from './RoomDetail.module.scss'
// import ImgGallery from './ImgGallery'
// import CommonInfo from './CommonInfo'
// import OtherInfo from './OtherInfo'
import RoomDetail from './RoomDetail'
import GallerySection from './GallerySection'
import Content from './Content'
import { responseGetDetailRooom } from '@/common/types/RoomTypes'

async function page(props: { params: Promise<{ id: string }> }) {
    const { params } = props
    const resolvedParams = await params
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(USER_TOKEN)
    const expired_time = cookieStore.get(EXPIRED_TIME_TOKEN)
    const refreshToken = cookieStore.get(REFRESH_TOKEN_IN_LOCALSTORAGE)
    let isRefreshToken = false
    const data = await getDetailRoomApi<responseGetDetailRooom>({
        roomId: resolvedParams.id,
        sessionToken: sessionToken?.value || '',
        expired_time: expired_time ? expired_time.value : null,
        refreshToken: refreshToken || '',
    })

    const {
        id = '',
        code = '',
        name = '',
        address = '',
        price = 0,
        date_available = null,
        num_bedroom = 0,
        num_bathroom = 0,
        bathroom_type = null,
        bed_size = '',
        description = '',
        lat = null,
        lon = null,
        status = null,
        max_guests = 1,
        furnitures = [],
        images = [],
        hasLike = false } = data ? data?.data?.result : initialState


    // const isFavorite = data ? data?.payload?.result.hasLike : false
    // console.log('isFavorite:', isFavorite)
    if (data?.options?.isRefreshToken) {
        isRefreshToken = true
    }
    const newAccessToken = data?.options?.newTokenInfo?.access_token || ""
    const newRefreshToken = data?.options?.newTokenInfo?.refresh_token || ""
    const newExpiredTime = data?.options?.newTokenInfo?.expired_time || ""
    return (
        <div className={styles["room-page"]}>
            <div className={styles["container"]}>
                {/* Gallery */}
                <GallerySection data={images} />

                {/* Content */}

                <Content
                    roomId={id}
                    code={code}
                    name={name}
                    address={address}
                    price={price}
                    description={description}
                    num_bedroom={num_bedroom}
                    num_bathroom={num_bathroom}
                    max_guests={max_guests}
                    furnitures={furnitures}
                    hasLike = {hasLike}
                />
            </div>

            {/* <div>

                <div className={styles['frameArea']}>
                    <ImgFrame
                        data={images}
                    />
                </div>
                <div className={styles['roomMoreInfo']}>
                    <div className={styles['roomMoreInfoContainer']}>
                        <div className={styles['section1']}>
                            <div>
                                <div className={styles['commonInfoSection']}>
                                    <CommonInfo
                                        title={`${code} - ${name}`}
                                        address={address}
                                        price={price}
                                        num_bedroom={num_bedroom}
                                        num_bathroom={num_bathroom}
                                        housemates_info={[]}
                                        date_available={date_available}
                                        isFavorite={isFavorite}
                                        roomId={params.id}
                                    />
                                </div>
                                <div className={styles['imgGallerySection']}>
                                    <ImgGallery data={images} />
                                </div>
                            </div>
                        </div>
                        <div className={styles['bigLine']}></div>
                        <div className={styles['section2']}>
                            <OtherInfo />
                        </div>
                    </div>
                </div>
            </div> */}
            {/* <ClientEmptyToRefreshApi
                isRefreshToken={isRefreshToken}
                newAccessToken={newAccessToken}
                newRefreshToken={newRefreshToken}
                newExpiredTime={newExpiredTime}
            /> */}
        </div>
    )
}



export default page
