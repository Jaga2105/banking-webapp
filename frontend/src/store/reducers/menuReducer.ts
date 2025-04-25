import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface stateTypes{
    activeMenuTab:string
}
const initialState:stateTypes ={
    activeMenuTab:""
}
const menuReducer = createSlice({
    name:"menu",
    initialState,
    reducers:{
        changeActiveMenuTab(state, action:PayloadAction<string>){
            state.activeMenuTab=action.payload;
        }
    }
})
export const { changeActiveMenuTab } = menuReducer.actions
export default menuReducer.reducer;