'use client'
import { useState } from 'react'
import { AiOutlineDown } from 'react-icons/ai'
import { Popover } from 'antd';
import type { CSSProperties } from "react";
import styles from './Banner.module.scss'

interface optionsType {
    id: number,
    value: string,
    emoji: string
}

const OPTIONS: optionsType[] = [
    { id: 1, value: '1 khách', emoji: '👤' },
    { id: 2, value: '2 khách', emoji: '👥' },
    { id: 3, value: '3–4 khách', emoji: '👨‍👩‍👧' },
    { id: 4, value: '5+ khách', emoji: '👨‍👩‍👧‍👦' },
]

interface SizeFilterProps {
    value?: string,
    onChange?: (value: string) => void
}

function SizeFilter({ value, onChange }: SizeFilterProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const selected = value ?? '';

    const handleHoverChange = (open: boolean): void => {
        setIsOpen(open);
    };
    const onSelect = (newValue: string): void => {
        onChange?.(newValue);
        setIsOpen(false);
    }
    const rotateStyle: CSSProperties = {
        transition: `transform 0.3s`,
        transform: `translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(${isOpen ? `-180` : `0`}deg) skew(0deg, 0deg)`,
        transformStyle: `preserve-3d`,
    }
    return (
        <Popover
            content={
                <div className={styles['optionGroup']}>
                    {OPTIONS.map(e => {
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
            }
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
                    <p className={styles['filterLabel']}>{selected || 'Số khách'}</p>
                    <AiOutlineDown className={styles['iconArrow']} style={rotateStyle} />
                </div>
            </div>
        </Popover>
    )
}


export default SizeFilter
