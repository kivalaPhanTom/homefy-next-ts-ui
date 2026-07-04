import Link from 'next/link'
import styles from './RoomItem.module.scss'
import { CiLocationOn } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import { HiOutlineHome } from "react-icons/hi2";
import { LiaBathSolid } from "react-icons/lia";
import { CiUser } from "react-icons/ci";
import { IoBedOutline } from "react-icons/io5";
import SliderImg from '@/app/tools/components/RoomItem/SliderImg';
import { formatNumber, renderTextDayMonthValue } from '@/common/FunctionCommon/FunctionCommon'
import { bathroom_type, bed_size } from '@/common/ParamsCommon/ParamsCommon'

function renderBedSizeName(code: string): string {
    let result = ''
    for (let i = 0; i < bed_size.length; i++) {
        if (code === bed_size[i].code) {
            result = bed_size[i].name
            break
        }
    }
    return result
}
interface imageObj {
    id: string;
    path: string;
}
interface dataDetail {
    id: string;
    address: string;
    bed_size: string;
    bathroom_type: string;
    date_available: string;
    images: imageObj[];
    num_bathroom: number;
    num_bedroom: number;
    price: number;
}
interface RoomItemProps {
    data: dataDetail;
}
const RoomItem = (props: RoomItemProps) => {
    const { data } = props

    return (
        <div className={styles['main']}>

            <div className={styles['container']}>
                <div className={styles['showImg']}>
                    <div className={styles['slice']}>
                        <SliderImg
                            data={data.images ? data.images : []}
                        />
                    </div>
                    <Link href={`/room-detail/${data.id}`} className={styles['linkRoomImg']}>

                    </Link>
                    <div className={styles['type']}>
                        <Link href={`/room-detail/${data.id}`} className={styles['linkRoom']}>
                            <div className={styles['typeBtn']}>
                                <p>private house</p>
                            </div>
                        </Link>

                    </div>
                </div>
                <div className={styles['detail']}>
                    <div>
                        <Link href={`/room-detail/${data.id}`} className={styles['roomElement']}>
                            <div className={styles['first']}>
                                <p>$<span className={styles['price']}>{formatNumber(data.price)}</span> / <span className={styles['price']}>Week</span></p>
                                <p className={styles['typeRoom']}>{data.bed_size ? renderBedSizeName(data.bed_size) : ''} bed</p>
                                <div className={styles['divAddress']}>
                                    <CiLocationOn className={styles['locationIcon']} />
                                    <p>{data.address}</p>
                                </div>
                            </div>
                            <div className={styles['line']}></div>
                            <div className={styles['second']}>
                                <div className={styles['flexItem']}>
                                    <CiCalendar className={styles['iconItem']} />
                                    <p className={styles['itemLabel']}>{data.date_available ? <>available <span>{renderTextDayMonthValue(data.date_available)}</span></> : 'Not available now'}  </p>
                                </div>
                                <div className={styles['flexItem']}>
                                    <HiOutlineHome className={styles['iconItem']} />
                                    <p className={styles['itemLabel']}>private house</p>
                                </div>
                                <div className={styles['flexItem']}>
                                    <LiaBathSolid className={styles['iconItem']} />
                                    <p className={styles['itemLabel']}>Private (outside bedroom)</p>
                                </div>
                                <div className={styles['flexItem']}>
                                    <CiUser className={styles['iconItem']} />
                                    <p className={styles['itemLabel']}>sleeps max 2</p>
                                </div>
                            </div>
                            <div className={styles['line']}></div>
                            <div className={styles['third']}>
                                <p className={styles['theHouse']}>The house:</p>
                                <div className={styles['houseInfo']}>
                                    <div className={styles['flexItem']}>
                                        <IoBedOutline className={styles['iconItem']} />
                                        <p className={styles['itemLabel']}>{formatNumber(data.num_bedroom)} bedroom</p>
                                    </div>
                                    <div className={styles['flexItem']}>
                                        <LiaBathSolid className={styles['iconItem']} />
                                        <p className={styles['itemLabel']}>{formatNumber(data.num_bathroom)} bathroom</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default RoomItem;
