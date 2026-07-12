'use client'
import { memo } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import { Button, Upload } from 'antd'
import styles from './UploadFile.module.scss'

interface UploadFileProps {
    fileList: any[],
    setFileList: (data: any[]) => void,
    maxCount: number | null,
    multiple: boolean,
    isDisable: boolean
}
function UploadFile(propsFile: UploadFileProps) {
    const { fileList, setFileList, maxCount, multiple, isDisable } = propsFile

    const props = {
        name: 'file',
        action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
        maxCount: maxCount ?? undefined,
        multiple: multiple,
        onChange(info: { file: { status?: string }; fileList: any[] }) {
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
        <>
            {isDisable ? (
                <Button className={styles['btnUploadFile'] + ' ' + styles['disable']} icon={<UploadOutlined />}>Upload a file</Button>
            ) : (
                <Upload {...props}>
                    <Button className={styles['btnUploadFile']} icon={<UploadOutlined />}>Upload a file</Button>
                </Upload>
            )
            }
        </>
    )
}



export default memo(UploadFile)
