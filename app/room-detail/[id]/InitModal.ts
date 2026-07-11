interface imageObj{
    id:string;
    path:string;
    roomId: string;
}
interface RoomDetail {
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
    images: imageObj[];
    hasLike:boolean;
}
export const initialState: RoomDetail = {
    id: '',
    code: '',
    name: '',
    address: '',
    price: 0,
    date_available: null,
    num_bedroom: 0,
    num_bathroom: 0,
    bathroom_type: null,
    bed_size: '',
    description: '',
    lat: null,
    lon: null,
    status: null,
    max_guests: 1,
    furnitures: [],
    images: [],
    hasLike: false
}