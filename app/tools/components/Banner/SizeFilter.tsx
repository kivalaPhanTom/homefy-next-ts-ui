'use client'
import { useState } from 'react'
import { AiOutlineDown } from 'react-icons/ai'
import { Popover } from 'antd';
import type { CSSProperties } from "react";
import styles from './Banner.module.scss'

interface optionsType {
    id: Number,
    value: string
}
function SizeFilter() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleHoverChange = (open: boolean): void => {
        setIsOpen(open);
    };
    const onToggle = (): void => {
        setIsOpen(prevState => !prevState)
    }
    const options: optionsType[] = [
        {
            id: 1,
            value: "private house"
        },
        {
            id: 2,
            value: "master bedroom"
        },
        {
            id: 3,
            value: "double bedroom"
        },
        {
            id: 4,
            value: "single bedroom"
        },
    ]
    const rotateStyle: CSSProperties = {
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
            trigger={"hover"}
            open={isOpen}
            className={styles['popverFilter']}
            onOpenChange={handleHoverChange}
        >
            <div className={styles['locationFilter']}>
                <div>
                    <p className={styles['filterLabel']}> Size</p>
                    <AiOutlineDown className={styles['iconArrow']} style={rotateStyle} />
                </div>
            </div>
        </Popover>
    )
}


export default SizeFilter
