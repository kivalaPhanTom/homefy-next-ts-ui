import type { FormInstance } from 'antd';
import { responseType } from '@/common/types/ResponseApi'

export interface checkRoomAvailabilityType {
    roomId: string,
    fromDate: string,
    toDate: string
}

interface imageObject {
    id: string,
    path: string,
    roomId: string,
}
export interface roomObjectType {
    id: string,
    code: string,
    name: string,
    address: string,
    price: number,
    date_available: number,
    num_bedroom: number,
    num_bathroom: number,
    bathroom_type: string,
    bed_size: string,
    lat: number,
    lon: number,
    status: string,
    max_guests: number,
    furnitures: string[]
    images: imageObject[]
    hasLike: boolean
}

export interface deleteListingPayloadType {
    data: string,
    language: string,
    callRTKquery: () => void
}

export interface uploadFileResponseType {
    data: responseType["data"] & {
        result: string[];
    };
}

export interface roomObjectToRedux {
    id?: string,
    code: string,
    name: string,
    address: string,
    price: number,
    date_available: number | null,
    num_bedroom: number,
    num_bathroom: number,
    bathroom_type: string,
    bed_size: string,
    lat?: number | null,
    lon?: number | null,
    status?: string,
    max_guests: number,
    room_firnishings: string[],
    description: string,
    new_image_paths?: string[],
    old_image_ids?: string[],
    image_paths?: string[]
}
export interface updateRoomToReduxType {
    data: roomObjectToRedux,
    oldFile?: string[],
    formDataFile: FormData | null,
    form: FormInstance<Record<string, any>>,
    setFileList: (data: any[]) => void,
    setDescription: (value: string) => void,
    setListFirnishings: React.Dispatch<React.SetStateAction<string[]>>;
    navigate: (type: string) => void
}

export interface RoomDetail {
    id: string;
    code: string;
    name: string;
    address: string;
    price: number;
    date_available: Date | null;
    num_bedroom: number;
    num_bathroom: number;
    bathroom_type: null;
    bed_size: string;
    description: string;
    lat: null;
    lon: null;
    status: null;
    max_guests: number;
    furnitures: string[];
    images: imageObject[];
    hasLike: boolean;
}
export interface responseGetDetailRooom {
    result: RoomDetail;
}
export interface likeActionType {
    room_id: String
}
export interface likeActionTypeResponse {
    data: {
        code: number,
        message: string,
    }
}