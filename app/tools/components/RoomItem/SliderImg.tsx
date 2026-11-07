'use client'

import { useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import Image from 'next/image'
import Link from 'next/link'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import styles from './RoomItem.module.scss'
import noImage from '@/assets/empty.webp'

interface RoomImage {
    id: string
    path: string
}

interface SliderImgProps {
    data: RoomImage[]
    href?: string
    alt?: string
}

function RoomPhoto({ path, alt }: { path: string; alt: string }) {
    const source = typeof path === 'string' ? path.trim() : ''
    const [failedSource, setFailedSource] = useState<string | null>(null)
    const hasSource = Boolean(source) && failedSource !== source

    return (
        <Image
            src={hasSource ? source : noImage}
            alt={hasSource ? alt : 'Chưa có ảnh phòng'}
            fill
            sizes='(max-width: 768px) 100vw, 33vw'
            unoptimized
            className={styles.roomimg}
            onError={hasSource ? () => setFailedSource(source) : undefined}
        />
    )
}

function SliderImg({ data, href, alt = 'Ảnh phòng' }: SliderImgProps) {
    const images = data.length > 0 ? data : [{ id: 'empty', path: '' }]

    return (
        <div className={styles.photoSlider}>
            <Carousel
                showStatus={false}
                showIndicators={false}
                showThumbs={false}
                infiniteLoop
                showArrows={images.length > 1}
                labels={{ leftArrow: 'Ảnh trước', rightArrow: 'Ảnh tiếp theo', item: 'Ảnh phòng' }}
                renderArrowNext={(clickHandler) => images.length > 1 ? (
                    <button type='button' className={styles.next} aria-label='Ảnh tiếp theo' onClick={clickHandler}>
                        <IoIosArrowForward className={styles.iconSlide} />
                    </button>
                ) : null}
                renderArrowPrev={(clickHandler) => images.length > 1 ? (
                    <button type='button' className={styles.prev} aria-label='Ảnh trước' onClick={clickHandler}>
                        <IoIosArrowBack className={styles.iconSlide} />
                    </button>
                ) : null}
            >
                {images.map((image, index) => (
                    <div key={image.id} className={styles.carouselItem}>
                        {href ? (
                            <Link href={href} className={styles.photoLink} aria-label={alt}>
                                <RoomPhoto path={image.path} alt={`${alt} - ảnh ${index + 1}`} />
                            </Link>
                        ) : (
                            <RoomPhoto path={image.path} alt={`${alt} - ảnh ${index + 1}`} />
                        )}
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default SliderImg
