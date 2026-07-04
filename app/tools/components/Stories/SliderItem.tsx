'use client'
import Image from 'next/image'
import styles from './Stories.module.scss'
import img1 from '@/assets/demo-room.jpeg'
interface SliderItemProps {
    index: string;
}
function SliderItem(props: SliderItemProps) {
    const { index } = props
    return (
        <div className={styles['sliderItem']}>
            <div className={styles['itemContainer']}>
                <div className={styles['divStoryImg']}>
                    <div>
                        <Image src={img1} alt='room img' className={styles['storyImg']} />
                        <div>
                            <p>Quentin & Nawel</p>
                        </div>
                    </div>


                </div>
                <div className={styles['content']}>
                    <p>We found the property through flatmates.com and everything has been really good. Happy with the room, roommates and facilities (gym, swimming pool, sauna)!</p>
                </div>
            </div>
        </div>
    )
}


export default SliderItem
