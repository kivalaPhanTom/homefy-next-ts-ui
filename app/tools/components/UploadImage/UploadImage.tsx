'use client'
import { memo } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import { Button, Upload, message } from 'antd'
import styles from './UploadImage.module.scss'

interface UploadImageProps {
    fileList: any[],
    setFileList: (data: any[]) => void,
    maxCount: number,
    multiple: boolean,
    title: string
}
function UploadImage(propsFile: UploadImageProps) {
    const { fileList, setFileList, maxCount, multiple, title } = propsFile
    const props = {
        name: 'file',
        action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
        maxCount: maxCount,
        multiple: multiple,
        beforeUpload(file:any){
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
            if (!isJpgOrPng) {
                message.error('You can only upload JPG/PNG file!')
            }
            return isJpgOrPng 
        },
        onChange(info:any) {
            if (info.file.status === 'error') {
                info.file.status = "done"
            }
            // if (info.file.status !== 'uploading') {
            //     // console.log(info.file, info.fileList);
            // }
            // if (info.file.status === 'done') {
            //     // message.success(`${info.file.name} file uploaded successfully`)
            // } else if (info.file.status === 'error') {
            //     info.file.status = "done"
            //     // console.log('info.fileList:', info.fileList)
            //     // message.success(`${info.file.name} file uploaded successfully`)
            //     // message.error(`${info.file.name} file upload failed.`);
            // }
            setFileList(info.fileList)
        },
        fileList: fileList
    }
    return (
        <Upload {...props}>
            <Button className={styles['btnUploadFile']} icon={<UploadOutlined />}>{title}</Button>
        </Upload>
    )
}



export default memo(UploadImage)
