import {CallAPI} from "./axiosBase";
import {ENDPOINT_BOOTH_LAYOUT, ENDPOINT_PURCHASE_BOOTH} from "../constants/EndPoint";

export const purchaseBooth = (body) => CallAPI(`${ENDPOINT_PURCHASE_BOOTH}`, 'POST', body);

export const saveDecoratedBooth = (formData) => CallAPI(`${ENDPOINT_BOOTH_LAYOUT}`, 'POST', formData, {}, {
    'content-type': 'multipart/form-data'
})
