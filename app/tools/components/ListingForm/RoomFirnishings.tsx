'use client'
import { JSX, memo } from 'react'
import IconAirConditionAdmin from "@/common/IconSvg/IconAirConditionAdmin"
import IconCarAdmin from "@/common/IconSvg/IconCarAdmin"
import IconChairAdmin from "@/common/IconSvg/IconChairAdmin"
import IconDeskAdmin from "@/common/IconSvg/IconDeskAdmin"
import IconDoorLock from "@/common/IconSvg/IconDoorLock"
import IconDrawerAdmin from "@/common/IconSvg/IconDrawerAdmin"
import IconLamp from "@/common/IconSvg/IconLamp"
import IconWardrobeAdmin from "@/common/IconSvg/IconWardrobeAdmin"
import { useGetFurnituresQuery } from '@/RTK_Query/Listing_Query'
import styles from './ListingForm.module.scss'
interface FunitureOption {
    id: string,
    name: string,
    icon: JSX.Element | null
}
type funituresFromApiType = Pick<FunitureOption, "id" | "name">;
interface RoomFirnishingsProps {
    listFirnishings: string[],
    handleSetListFirnishings: (funitureId: string) => void
}

function RoomFirnishings(props: RoomFirnishingsProps) {
    const { listFirnishings, handleSetListFirnishings } = props
    const { data, isFetching, error, refetch } = useGetFurnituresQuery(undefined)
    // const funitures: funituresFromApiType[] = data ? data.result : []
    const funitures: funituresFromApiType[] = (data as any)?.result ?? [];
    const funitureOptions: FunitureOption[] = []
    const ROOM_FUNITURES = ["Bed", "Wardrobe", "Desk", "Chair", "Bedside drawer", "Lamp", "Air conditioner", "Door lock"]

    const renderIcon = (funitureItem: funituresFromApiType) => {
        switch (funitureItem.name) {
            case 'Bed':
                return <IconCarAdmin className={styles['iconAdmin']} color={listFirnishings.includes(funitureItem.id) ? '#d47536' : null} />
            case 'Wardrobe':
                return <IconWardrobeAdmin className={styles['iconAdmin']} color={listFirnishings.includes(funitureItem.id) ? '#d47536' : null} />
            case 'Desk':
                return <IconDeskAdmin className={styles['iconAdmin']} color={listFirnishings.includes(funitureItem.id) ? '#d47536' : null} />
            case 'Chair':
                return <IconChairAdmin className={styles['iconAdmin']} color={listFirnishings.includes(funitureItem.id) ? '#d47536' : null} />
            case 'Bedside drawer':
                return <IconDrawerAdmin className={styles['iconAdmin']} color={listFirnishings.includes(funitureItem.id) ? '#d47536' : null} />
            case 'Lamp':
                return <IconLamp className={styles['iconAdmin']} color={listFirnishings.includes(funitureItem.id) ? '#d47536' : null} />
            case 'Air conditioner':
                return <IconAirConditionAdmin className={styles['iconAdmin']} color={listFirnishings.includes(funitureItem.id) ? '#d47536' : null} />
            case 'Door lock':
                return <IconDoorLock className={styles['iconAdmin']} color={listFirnishings.includes(funitureItem.id) ? '#d47536' : null} />
            default:
                return null
        }
    }

    funitures.forEach((e: funituresFromApiType) => {
        const findFuniture = ROOM_FUNITURES.find(item => item === e.name);
        if (findFuniture) {
            funitureOptions.push({
                ...e,
                icon: renderIcon(e)
            })
        }
    })

    return (
        <div className={styles['listIconRoomFirnishing']}>
            {
                funitureOptions.map((el, index) => (
                    <div key={index} className={styles['iconItem']} onClick={() => { handleSetListFirnishings(el.id) }}>
                        <div>
                            <div className={styles['divIconItem']}>
                                {el.icon}
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
