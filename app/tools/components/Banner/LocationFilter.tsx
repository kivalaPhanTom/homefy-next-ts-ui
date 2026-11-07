'use client'
import { useState } from 'react'
import { CiLocationOn } from 'react-icons/ci'
import { AiOutlineDown } from 'react-icons/ai'
import { Popover } from 'antd';
import type { CSSProperties } from "react";
import styles from './Banner.module.scss'

import { REGIONS } from '@/common/destinations'

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
