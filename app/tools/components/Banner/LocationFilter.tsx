'use client'
import { useState } from 'react'
import { CiLocationOn } from 'react-icons/ci'
import { AiOutlineDown } from 'react-icons/ai'
import { Popover } from 'antd';
import type { CSSProperties } from "react";
import styles from './Banner.module.scss'

interface destinationType {
    id: number,
    value: string,
    emoji: string
}

interface regionType {
    region: string,
    destinations: destinationType[]
}

const REGIONS: regionType[] = [
    {
        region: 'Miền Bắc',
        destinations: [
            { id: 1, value: 'Hà Nội', emoji: '🏙️' },
            { id: 2, value: 'Sa Pa', emoji: '⛰️' },
            { id: 3, value: 'Hạ Long', emoji: '🚢' },
            { id: 4, value: 'Mộc Châu', emoji: '🌸' },
        ]
    },
    {
        region: 'Miền Trung',
        destinations: [
            { id: 5, value: 'Đà Nẵng', emoji: '🌉' },
            { id: 6, value: 'Hội An', emoji: '🏮' },
            { id: 7, value: 'Huế', emoji: '🏯' },
            { id: 8, value: 'Nha Trang', emoji: '🏖️' },
            { id: 9, value: 'Đà Lạt', emoji: '🌫️' },
        ]
    },
    {
        region: 'Miền Nam',
        destinations: [
            { id: 10, value: 'TP. Hồ Chí Minh', emoji: '🌆' },
            { id: 11, value: 'Phú Quốc', emoji: '🏝️' },
            { id: 12, value: 'Vũng Tàu', emoji: '🌊' },
            { id: 13, value: 'Cần Thơ', emoji: '🛶' },
        ]
    }
]

interface LocationFilterProps {
    value?: string,
    onChange?: (value: string) => void
}

function LocationFilter({ value, onChange }: LocationFilterProps) {
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const selected = value ?? '';

    const handleHoverChange = (open: boolean):void => {
        setIsOpen(open);
    };
    const onSelect = (newValue: string):void => {
        onChange?.(newValue);
        setIsOpen(false);
    }
    const rotateStyle:CSSProperties = {
        transition: `transform 0.3s`,
        transform: `translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(${isOpen ? `-180` : `0`}deg) skew(0deg, 0deg)`,
        transformStyle: `preserve-3d`,
    }
    return (
        <Popover
            content={
                <div className={styles['popoverGroups']}>
                    {REGIONS.map(group => {
                        return (
                            <div key={group.region} className={styles['optionGroup']}>
                                <p className={styles['optionGroupTitle']}>{group.region}</p>
                                {group.destinations.map(e => {
                                    return (
                                        <div
                                            key={`${e.id}`}
                                            className={`${styles['optionItem']} ${selected === e.value ? styles['optionItemActive'] : ''}`}
                                            onClick={() => onSelect(e.value)}
                                        >
                                            <p>{e.emoji} {e.value}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            }
            title=""
            placement="bottom"
            arrow={false}
            open={isOpen}
            trigger={"hover"}
            className={styles['popverFilter']}
            onOpenChange={handleHoverChange}
        >
            <div className={styles['locationFilter']} >
                <div>
                    <CiLocationOn />
                    <p className={styles['filterLabel']}>{selected || 'Điểm đến'}</p>
                    <AiOutlineDown className={styles['iconArrow']} style={rotateStyle} />
                </div>
            </div>
        </Popover>
    )
}

export default LocationFilter
