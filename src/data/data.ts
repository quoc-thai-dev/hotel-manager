interface RoomPrice {
    gia_goc: number;
    gia_dt: number;
    gia_ct: number;
    gia_29: number;
}
export const roomData = {
    "601": {
        "gia_goc": 1690000,
        "gia_dt": 1390000,
        "gia_ct": 1490000,
        "gia_29": 2490000,
        "gia_t9": 1183000
    },
    "501": {
        "gia_goc": 1390000,
        "gia_dt": 1090000,
        "gia_ct": 1190000,
        "gia_29": 1990000,
        "gia_t9": 973000 
    },
    "donview": {
        "gia_goc": 690000,
        "gia_dt": 550000,
        "gia_ct": 600000,
        "gia_29": 990000,
        "gia_t9": 483000 
    },
    "2tc": {
        "gia_goc": 590000,
        "gia_dt": 450000,
        "gia_ct": 500000,
        "gia_29": 790000,
        "gia_t9": 665000  
    },
    "401": {
        "gia_goc": 1690000,
        "gia_dt": 1390000,
        "gia_ct": 1490000,
        "gia_29": 2490000,
        "gia_t9": 1183000 
    },
    "4tc": {
        "gia_goc": 950000,
        "gia_dt": 750000,
        "gia_ct": 850000,
        "gia_29": 1390000,
        "gia_t9": 1183000 
    },
    "gd": {
        "gia_goc": 1290000,
        "gia_dt": 1090000,
        "gia_ct": 1190000,
        "gia_29": 903000 
    },
    "": {
        "gia_goc": 0,
        "gia_dt": 0,
        "gia_ct": 0,
        "gia_29": 0
    },
} as const
export type RoomKey = keyof typeof roomData;
export type RoomDataType = Record<RoomKey, RoomPrice>;