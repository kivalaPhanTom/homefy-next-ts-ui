'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
// import { Waypoint } from 'react-waypoint';
import styles from './ListHomeRoom.module.scss'

function ExploreBtn() {
    const [countView, setCountView] = useState<number>(0);
    const [isClient, setIsClient] = useState<boolean>(false)

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleWaypointEnter = ():void => {
        if (countView === 0) setCountView(1)
    };

    return (
        <div>
            {isClient &&
                //  
                <div className={styles['exploreAll'] + ' ' + styles[countView > 0 ? 'exploreAllAnimation' : '']}>
                    <Link href={'/'} className={styles['linkExpore']}>
                        {/* <Waypoint onEnter={handleWaypointEnter}>
                            <div className={styles['exploreBtn']}>
                                <p> explore all</p>
                            </div>
                        </Waypoint> */}

                    </Link>
                </div>
            }
        </div>
    )
}

export default ExploreBtn
