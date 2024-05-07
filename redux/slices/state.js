import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    reload: null
}
 
export const stateSlice = createSlice({
    name: 'state',
    initialState,
    reducers: {
        setReload: (state, action) => {
            state.reload = action.payload
        }
    }
})

export const { setReload } = stateSlice.actions

export default stateSlice.reducer