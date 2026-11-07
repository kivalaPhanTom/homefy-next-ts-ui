interface destinationType {
    id: number,
    value: string,
    emoji: string
}

interface regionType {
    region: string,
    destinations: destinationType[]
}

export const REGIONS: regionType[] = [
    {
        region: 'Miền Bắc',
        destinations: [
            { id: 1, value: 'Hà Nội', emoji: '🏙️' },
            { id: 2, value: 'Sa Pa', emoji: '⛰️' },
            { id: 3, value: 'Hạ Long', emoji: '🚢' },
            { id: 4, value: 'Mộc Châu', emoji: '🌸' },
        ]
    },
    {
        region: 'Miền Trung',
        destinations: [
            { id: 5, value: 'Đà Nẵng', emoji: '🌉' },
            { id: 6, value: 'Hội An', emoji: '🏮' },
            { id: 7, value: 'Huế', emoji: '🏯' },
            { id: 8, value: 'Nha Trang', emoji: '🏖️' },
            { id: 9, value: 'Đà Lạt', emoji: '🌫️' },
        ]
    },
    {
        region: 'Miền Nam',
        destinations: [
            { id: 10, value: 'TP. Hồ Chí Minh', emoji: '🌆' },
            { id: 11, value: 'Phú Quốc', emoji: '🏝️' },
            { id: 12, value: 'Vũng Tàu', emoji: '🌊' },
            { id: 13, value: 'Cần Thơ', emoji: '🛶' },
        ]
    }
]

