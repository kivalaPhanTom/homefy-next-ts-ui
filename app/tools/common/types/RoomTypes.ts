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