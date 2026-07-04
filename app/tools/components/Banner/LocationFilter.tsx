'use client'
import { useState } from 'react'
import { CiLocationOn } from 'react-icons/ci'
import { AiOutlineDown } from 'react-icons/ai'
import { Popover } from 'antd';
import type { CSSProperties } from "react";
import styles from './Banner.module.scss'

interface optionsType {
    id: Number,
    value: string
}

function LocationFilter() {
   const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleHoverChange = (open: boolean):void => {
        setIsOpen(open);
    };
    const onToggle = ():void  => {
        setIsOpen(prevState => !prevState)
    }
    const options: optionsType[] = [
        {
            id: 1,
            value: "Parramatta"
        },
        {
            id: 2,
            value: "Northern Beaches"
        },
        {
            id: 3,
            value: "Airport area"
        },
        {
            id: 4,
            value: "Waterloo & Zetland"
        },
        {
            id: 5,
            value: "Eastern Suburbs"
        },
        {
            id: 6,
            value: "Olympic Park"
        }
    ]
    const rotateStyle:CSSProperties = {
        transition: `transform 0.3s`,
        transform: `translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(${isOpen ? `-180` : `0`}deg) skew(0deg, 0deg)`,
        transformStyle: `preserve-3d`,
    }
    return (
        <Popover
            content={<div>
                {options.map(e => {
                    return <div key={`${e.id}`} className={styles['optionItem']}>
                        <p>{e.value}</p>
                    </div>
                })}
            </div>}
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
                    <p className={styles['filterLabel']}> Location</p>
                    <AiOutlineDown className={styles['iconArrow']} style={rotateStyle} />
                </div>
            </div>
        </Popover>
    )
}

export default LocationFilter
