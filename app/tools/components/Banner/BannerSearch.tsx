'use client'
import { useState } from 'react'
import Link from 'next/link'
import styles from './Banner.module.scss'
import LocationFilter from './LocationFilter'
import SizeFilter from './SizeFilter'

const GUESTS_PARAM_MAP: Record<string, string> = {
    '1 khách': '1',
    '2 khách': '2',
    '3–4 khách': '3',
    '5+ khách': '5',
}

function BannerSearch() {
    const [destination, setDestination] = useState<string>('')
    const [guests, setGuests] = useState<string>('')

    const buildSearchHref = (): string => {
        const params = new URLSearchParams()
        if (destination) params.set('city', destination)
        if (guests) params.set('guests', GUESTS_PARAM_MAP[guests] ?? guests)
        const query = params.toString()
        return query ? `/search?${query}` : '/search'
    }

    return (
        <div className={styles['action']}>
            <div className={styles['filterLeft']}>
                <div className={styles['locationFilter']}>
                    <LocationFilter value={destination} onChange={setDestination} />
                </div>
                <div className={styles['sizeFilter']}>
                    <SizeFilter value={guests} onChange={setGuests} />
                </div>
            </div>
            <div className={styles['filterRight']}>
                <div>
                    <div className={styles['allPropertiesBtn']}>
                        <Link href={buildSearchHref()} className={styles['allPropertiesBtnLink']}>
                            Tìm phòng
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BannerSearch
