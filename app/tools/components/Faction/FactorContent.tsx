import { useState } from 'react'
// import { Waypoint } from 'react-waypoint';
import styles from './Faction.module.scss'

function FactorContent() {
    const [countView, setCountView] = useState(0);
    const handleWaypointEnter = ():void => {
        if (countView === 0) setCountView(1)
    };
    return (
        <></>
        // <Waypoint onEnter={handleWaypointEnter}>
        //     <div className={styles['factorContent'] + ' ' + styles[countView  > 0 ? 'factorContentAnimation' : '']}>
        //         <h2 className={styles['titleFactor']}>Your next home in Sydney</h2>
        //         <p className={styles['titleDes']}>Moving cities, busy life, looking to make new friends... Whatever your reason is, renting in a new city should be easy and exciting, and that's why we found The Mysa House.</p>
        //     </div>
        // </Waypoint>

    )
}

export default FactorContent
