/* HTML: <div class="loader"></div> */
import React from 'react'
import styles from "./SpinLoader.module.scss";
interface spinLoaderType{
    color?: string,
    width?: string,
}
function SpinLoader(props: spinLoaderType) {
    const { color, width= '30px' } = props
    const style = {
        // borderTopColor: color ? color : 'white',
        width: width,
    
    }
    return (
         <div style={style} className={styles.loader}></div> 
    )
}

export default SpinLoader
