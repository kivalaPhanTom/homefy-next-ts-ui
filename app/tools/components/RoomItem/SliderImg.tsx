'use client'
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image'
import Link from 'next/link'
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from './RoomItem.module.scss'
import img1 from '@/assets/demo-room.jpeg'
import img2 from '@/assets/demo-room2.jpg'
import img3 from '@/assets/demo-room3.jpg'
import noImage from '@/assets/empty.webp'

interface dataObbj {
    id: string;
    path: string;
}
interface SliderImgProps {
    data: dataObbj[];
}

function SliderImg(props: SliderImgProps) {
    const { data } = props
  
    return (
        <Carousel
            renderIndicator={() => null}
            showStatus={false}
            showIndicators={false}
            infiniteLoop
            showArrows={data.length > 1}
            renderArrowNext={(clickHandler) => {
                if (data.length > 1) {
                    return (
                        <div className={styles.next}>
                            <IoIosArrowForward
                                onClick={clickHandler}
                                className={styles.iconSlide}
                            />
                        </div>
                    );
                }

                return null;
            }}
            renderArrowPrev={(clickHandler) => {
                if (data.length > 1) {
                    return (
                        <div className={styles.prev}>
                            <IoIosArrowBack
                                onClick={clickHandler}
                                className={styles.iconSlide}
                            />
                        </div>
                    );
                }

                return null;
            }}
        >
            {data.length > 0
                ? data.map((e) => {
                    const imageSrc = e.path && e.path.trim() ? e.path : noImage;

                    return (
                        <div key={e.id} className={styles.carouselItem}>
                            <Image
                                src={imageSrc}
                                alt="room img"
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                unoptimized
                                className={styles.roomimg}
                            />
                        </div>
                    );
                })
                : [
                    <div key="empty" className={styles.carouselItem}>
                        <Image
                            src={noImage}
                            alt="room img"
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            unoptimized
                            className={styles.roomimg}
                        />
                    </div>,
                ]}
        </Carousel>
    )
}

export default SliderImg
