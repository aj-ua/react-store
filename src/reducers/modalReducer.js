import { HANDLE_MODAL, TOGGLE_MODAL } from '../actions/types'

const initialState = {
    activeModal: {
        id: "none",
        title: "Modal",
        text: "...",
        closeButton: true,
        actionBtn: {
            "className": "btn-success",
            "text": "Yes"
        },
        action: () => console.log('modal none'),
    },
    isModalOpen: false
}

export default function modalReducers(state = initialState, action) {
    switch (action.type) {
        case HANDLE_MODAL:
            console.log('reducer HANDLE_MODAL');
            console.log('action.payload', action.payload);
            return {
                ...state,
                activeModal: action.payload
            }

        case TOGGLE_MODAL:
            console.log('reducer TOGGLE_MODAL');
            return {
                ...state,
                isModalOpen: !state.isModalOpen
            }

        default:
            return state
    }
}
