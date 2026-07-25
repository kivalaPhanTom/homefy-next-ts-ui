"use client";
import { useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import styles from './RoomDetail.module.scss'
import noImage from '@/assets/empty.webp'

interface imageObj {
    id: string;
    path: string;
    roomId: string;
}
interface GallerySectionProps {
    data: imageObj[]
}

function GallerySection(props: GallerySectionProps) {
    const { data } = props
    const images = useMemo(() => {
        if (data.length > 0) {
            return data.map((el) => ({ src: el.path, alt: el.id }))
        }

        return [{ src: noImage.src, alt: "empty" }]
    }, [data])

    const visibleImages = images.slice(0, 8)
    const remainingCount = Math.max(images.length - visibleImages.length, 0)
    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openPreview = (index: number) => {
        setSelectedIndex(index)
        setIsModalOpen(true)
    }

    const handleMorePhoto = () => {
        const nextIndex = selectedIndex + 1 < images.length ? selectedIndex + 1 : 0
        setSelectedIndex(nextIndex)
        setIsModalOpen(true)
    }

    const selectedImage = images[selectedIndex]?.src ?? noImage.src

    return (
        <div className="gallery">
            <div className={styles["gallery-main"]}>
                <img src={selectedImage} alt="" onClick={() => setIsModalOpen(true)} />
            </div>

            <div className={styles["gallery-thumbnails"]}>
                {visibleImages.map((img, index) => {
                    const isActive = selectedImage === img.src

                    return (
                        <div
                            key={`${img.src}-${index}`}
                            className={
                                isActive
                                    ? styles["thumbnail"] + " " + styles["active"]
                                    : styles["thumbnail"]
                            }
                            onClick={() => openPreview(index)}
                        >
                            <img src={img.src} alt={img.alt} />
                        </div>
                    )
                })}

                {remainingCount > 0 && (
                    <div
                        className={styles["thumbnail"] + " " + styles["more-photo"]}
                        onClick={handleMorePhoto}
                    >
                        +{remainingCount} ảnh
                    </div>
                )}
            </div>

            <Lightbox
                open={isModalOpen}
                close={() => setIsModalOpen(false)}
                slides={images}
                index={selectedIndex}
                on={{
                    view: ({ index }) => setSelectedIndex(index)
                }}
                controller={{ closeOnBackdropClick: true }}
            />
        </div>
    )
}

export default GallerySection
