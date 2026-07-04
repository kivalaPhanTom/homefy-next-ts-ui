'use client'
import React, { useState, useRef, useEffect } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import styles from './Stories.module.scss'
import SliderItem from "./SliderItem";
import Carousel from "@itseasy21/react-elastic-carousel";

function StoriesSlider() {
    const carouselRef = useRef<any>(null);
    const [itemsToShow, setItemsToShow] = useState(4);
    let data = [1, 2, 3, 4, 5]

    const handleResize = () => {
        if (window.innerWidth <= 575) {
            setItemsToShow(1);
        } else if (window.innerWidth <= 768) {
            setItemsToShow(2);
        }
        else if (window.innerWidth <= 1024) {
            setItemsToShow(3);
        }
    };

    useEffect(() => {
        handleResize(); // Set initial itemsToShow based on window width

        window.addEventListener('resize', handleResize); // Update itemsToShow on window resize

        return () => {
            window.removeEventListener('resize', handleResize); // Clean up event listener
        };
    }, []);

    const onNextStart = (currentItem: any, nextItem: any) => {
        if (currentItem.index === nextItem.index) {
            carouselRef.current?.goTo(0);
        }
    };

    const onPrevStart = (currentItem: any, nextItem: any) => {
        if (currentItem.index === nextItem.index) {
            carouselRef.current?.goTo(data.length);
        }
    };
    return (
        <div className={styles['slider']}>
            <div>
                <div className={styles['mainSlice']}>
                    <Carousel
                        isRTL={false}
                        itemsToShow={itemsToShow}
                        disableArrowsOnEnd={false}
                        pagination={false}
                        ref={carouselRef}
                        onPrevStart={onPrevStart}
                        onNextStart={onNextStart}
                        renderArrow={({ type, onClick }) =>
                            type === 'PREV' ? (
                                <IoIosArrowBack
                                    onClick={onClick}
                                    className={styles.prevBtn}
                                />
                            ) : (
                                <IoIosArrowForward
                                    onClick={onClick}
                                    className={styles.nextBtn}
                                />
                            )
                        }
                    >
                        <SliderItem index={"1"} />
                        <SliderItem index={"2"} />
                        <SliderItem index={"3"} />
                        <SliderItem index={"4"} />
                        <SliderItem index={"5"} />
                        <SliderItem index={"6"} />
                    </Carousel>
                    {/* <Carousel
                        itemsToShow={itemsToShow}
                        disableArrowsOnEnd={false}
                        pagination={false}
                        ref={carouselRef}
                        onPrevStart={onPrevStart}
                        onNextStart={onNextStart}
                        renderArrow={({ type, onClick }) => {
                            return type === 'PREV' ? <IoIosArrowBack onClick={onClick} className={styles['prevBtn']} /> : <IoIosArrowForward onClick={onClick} className={styles['nextBtn']} />
                        }
                        }
                    >
                        <SliderItem index={"1"} />
                        <SliderItem index={"2"} />
                        <SliderItem index={"3"} />
                        <SliderItem index={"4"} />
                        <SliderItem index={"5"} />
                        <SliderItem index={"6"} />
                    </Carousel> */}
                </div>
            </div>
        </div>
    )
}



export default StoriesSlider
