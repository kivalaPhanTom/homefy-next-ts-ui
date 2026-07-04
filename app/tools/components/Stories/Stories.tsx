'use client'
import StoriesSlider from './StoriesSlider'
import styles from './Stories.module.scss'
import StoriesTitle from './StoriesTitle'

function Stories() {
    return (
        <div className={styles['main']}>
            <div className={styles['container']}>
                <StoriesTitle />
                <div className={styles['slideArea']}>
                    <StoriesSlider />
                </div>
            </div>
        </div>
    )
}

export default Stories
