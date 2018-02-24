import { FETCH_CONFIG_SUCCESS } from './constants';

const initState = {
    locale: 'en',
    propertyStatusList: [],
    propertyTypes: [],
    documentTypes: [],
    aspects: [],
    bedRooms: [],
    bathRooms: [],
    carParks: [],
    projectStatusList: [],
    projectStatusListFilter: [],
    userStatusList: [],
    priceListStatus: [],
    sellRequestStatus: [],
    userTypeList: [],
    fullUserTypeList: [],
    propertyStatusSeller: [],
    howDidBuyerRegistration: [],
    purchaseReason: [],
    residentStatus: [],
    language: [],
    areYou: [],
    whatAreYouLockingFor: [],
    whatAttracted: [],
    propertySentStatusList: [],
    phoneType: [],
    statusPackage: [],
    unitTime: []
};

export default function(state = initState, action) {
    switch (action.type) {
        case FETCH_CONFIG_SUCCESS:
            return { ...state, ...action.payload };

        default:
            return state;
    }
}
