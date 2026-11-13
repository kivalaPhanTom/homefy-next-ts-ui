'use client'
import { memo } from 'react'
import IconAirConditionAdmin from "@/common/IconSvg/IconAirConditionAdmin"
import IconCarAdmin from "@/common/IconSvg/IconCarAdmin"
import IconChairAdmin from "@/common/IconSvg/IconChairAdmin"
import IconDeskAdmin from "@/common/IconSvg/IconDeskAdmin"
import IconDoorLock from "@/common/IconSvg/IconDoorLock"
import IconDrawerAdmin from "@/common/IconSvg/IconDrawerAdmin"
import IconLamp from "@/common/IconSvg/IconLamp"
import IconWardrobeAdmin from "@/common/IconSvg/IconWardrobeAdmin"
import { useGetFurnituresQuery, type FurnitureOption } from '@/RTK_Query/Listing_Query'
import styles from './ListingForm.module.scss'
interface RoomFirnishingsProps {
    listFirnishings: string[],
    handleSetListFirnishings: (funitureId: string) => void
}

function RoomFirnishings(props: RoomFirnishingsProps) {
    const { listFirnishings, handleSetListFirnishings } = props
    const { data } = useGetFurnituresQuery(undefined)
    const furnitures = data?.result ?? []

    const renderIcon = (funitureItem: FurnitureOption) => {
        switch (funitureItem.name.normalize('NFC').trim().toLowerCase()) {
            case 'bed':
            case 'giường':
                return <IconCarAdmin className={styles['iconAdmin']} color={listFirnishings.includes(funitureItem.id) ? '#d47536' : null} />
            case 'wardrobe':
            case 'tủ quần áo':
                return <IconWardrobeAdmin className={styles['iconAdmin']} color={listFirnishings.includes(funitureItem.id) ? '#d47536' : null} />
            case 'desk':
            case 'bàn':
                return <IconDeskAdmin className={styles['iconAdmin']} color={listFirnishings.includes(funitureItem.id) ? '#d47536' : null} />
            case 'chair':
            case 'ghế':
                return <IconChairAdmin className={styles['iconAdmin']} color={listFirnishings.includes(funitureItem.id) ? '#d47536' : null} />
            case 'bedside drawer':
            case 'ngăn kéo':
            case 'ngắn kéo':
                return <IconDrawerAdmin className={styles['iconAdmin']} color={listFirnishings.includes(funitureItem.id) ? '#d47536' : null} />
            case 'lamp':
            case 'đèn':
                return <IconLamp className={styles['iconAdmin']} color={listFirnishings.includes(funitureItem.id) ? '#d47536' : null} />
            case 'air conditioner':
            case 'máy lạnh':
            case 'điều hòa':
                return <IconAirConditionAdmin className={styles['iconAdmin']} color={listFirnishings.includes(funitureItem.id) ? '#d47536' : null} />
            case 'door lock':
            case 'khóa cửa':
                return <IconDoorLock className={styles['iconAdmin']} color={listFirnishings.includes(funitureItem.id) ? '#d47536' : null} />
            default:
                return null
        }
    }


    return (
        <div className={styles['listIconRoomFirnishing']}>
            {
                furnitures.map((el) => (
                    <div key={el.id} className={styles['iconItem']} onClick={() => { handleSetListFirnishings(el.id) }}>
                        <div>
                            <div className={styles['divIconItem']}>
                                {renderIcon(el)}
                            </div>
                            <div>
                                <p className={styles['iconItemTitle'] + ' ' + styles[listFirnishings.includes(el.id) ? 'selectedName' : '']}>{el.name}</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default memo(RoomFirnishings)
