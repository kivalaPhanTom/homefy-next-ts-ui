import { useState } from 'react'
// import { Waypoint } from 'react-waypoint';
import styles from './Stories.module.scss'

function StoriesTitle() {
    const [countView, setCountView] = useState<number>(0);
    const handleWaypointEnter = ():void => {
        if (countView === 0) setCountView(1)
    };
    return (
        <></>
        // <Waypoint onEnter={handleWaypointEnter}>
        //     <div className={styles['intro']+ ' ' + styles[countView  > 0 ? 'introAnimation' : '']}>
        //         <h2 className={styles['title']}>Mysa stories</h2>
        //         <p className={styles['des']}>{`9 out of 10 of our members recommends us to a friend and keep our community growing strong :)`}</p>
        //     </div>
        // </Waypoint>
    )
}

export default StoriesTitle
