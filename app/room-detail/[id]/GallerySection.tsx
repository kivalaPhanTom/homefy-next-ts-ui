"use client";
import { useState } from "react";
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
    const images: string[] = data.length > 0 ? data.map(el => el.path) : [noImage.src]
    const [selectedImage, setSelectedImage] = useState<string>(images[0] ?? '');
    return (
        <div className="gallery">
            <div className={styles["gallery-main"]}>
                <img src={selectedImage} alt="" />
            </div>

            <div className={styles["gallery-thumbnails"]}>
                {images.map((img, index) => (
                    <div
                        key={`${img}-${index}`}
                        className={
                            selectedImage === img
                                ? styles["thumbnail"] + " " + styles["active"]
                                : styles["thumbnail"]
                        }
                        onClick={() => setSelectedImage(img)}
                    >
                        <img src={img} alt="" />
                    </div>
                ))}

                <div className={styles["thumbnail"] + " " + styles["more-photo"]}>
                    +8 ảnh
                </div>
            </div>
        </div>
    )
}

export default GallerySection
