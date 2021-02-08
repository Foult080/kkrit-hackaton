import { SET_ALERT, REMOVE_ALERT } from './types';
import { v4 as uuidv4 } from 'uuid';

export const setAlert = (msg, alertType) => dispath => {
    const id = uuidv4();
    dispath({
        type: SET_ALERT,
        payload: {msg, alertType, id}
    });

    setTimeout( () => dispath({ type: REMOVE_ALERT, payload:id }), 5000);
}
