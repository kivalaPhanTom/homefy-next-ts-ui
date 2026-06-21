export const DATE_FORMAT = "DD/MM/YYYY";
export const MONTH_FORMAT = "MM/YYYY";
export const DEFAULT_LIMIT = 16
export const DEFAULT_OFFSET = 0
export const PAGE_INDEX = 1
export const LANGUAGE_CODE_DEFAULT = 'EN'
interface menuObject {
    name:string,
    link: string
}
export const RENTER_PROFILE_MENU: menuObject[] = [
    {
        name: 'Personal details',
        link: '/personal-details'
    },
    {
        name: 'About me',
        link: '/about-me'
    },
    {
        name: 'Address history',
        link: '/address-history'
    },
    {
        name: 'Employment',
        link: '/employment'
    },
    {
        name: 'Income',
        link: '/income'
    },
    {
        name: 'Identity documents',
        link: '/identity-documents'
    },
    {
        name: 'Emergency contact',
        link: '/emergency-contact'
    },
    {
        name: 'Household',
        link: '/household'
    },
]
export const USER_ROLE = {
    normalUser:'user',
    admin:'admin'
}

export const USER_NAME_IN_LOCALSTORAGE = 'homefyUserName'
export const ADDRESS_SEARCH_IN_LOCALSTORAGE = 'homefyAddresSearch'
export const TOKEN_IN_LOCALSTORAGE = 'homefyUserToken'
export const REFRESH_TOKEN_IN_LOCALSTORAGE = 'homefyUserRefreshToken'

interface commonObject {
    code:string,
    name:string
}
export const genderOptions: commonObject[] = [
    {
        code: 'female',
        name: 'Female'
    },
    {
        code: 'male',
        name: 'Male'
    },
    {
        code: 'other',
        name: 'Other'
    }
]
export const ocupationOptions: commonObject[] = [
    {
        code: 'student',
        name: 'Student'
    },
    {
        code: 'professional',
        name: 'Professional'
    }
]
export const bathroom_type: commonObject[] = [
    {
        code: 'shared',
        name: 'Shared'
    },
    {
        code: 'own',
        name: 'Own'
    },
    {
        code: 'ensuite',
        name: 'Ensuite'
    }
]
export const bed_size: commonObject[] = [
    {
        code: 'single',
        name: 'Single'
    },
    {
        code: 'king_single',
        name: 'King single'
    },
    {
        code: 'double',
        name: 'Double'
    },
    {
        code: 'queen',
        name: 'Queen'
    },
    {
        code: 'king',
        name: 'King'
    }
]
export const CACHE_TIME = 500
export const NEXT_URL = '/'
export const USER_TOKEN ="homefyUserToken"
export const REFRESH_TOKEN ="homefyUserRefreshToken"
export const EXPIRED_TIME_TOKEN ="tokenExpiredTime"
export const STATUS_CODE={
    SUCCESS: 200,
    DATA_EXISTED:1007
}