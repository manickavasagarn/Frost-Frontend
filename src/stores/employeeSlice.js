import { createSlice } from '@reduxjs/toolkit'
import axios from "axios"
export const employeeSlice = createSlice({
    name:"employees",
    initialState:{
        employees:[],
    },
    reducers:{
        setEmployees: (state,action) =>{
            state.employees = action.payload;
        },      
    }
});

export const fetchAllEmployees = () => async (dispatch,getState) => {
    try{
       // Get the current state
       
        // console.log( getState().employees.employees, "inside");
        const {data} = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/allUsers`)
        dispatch(employeeSlice.actions.setEmployees(data))
    }
    catch(error){
        dispatch(employeeSlice.actions.setEmployees([]))
    }
}

export const {setEmployees} = employeeSlice.actions;
export const selectEmployees = (state) => state.employees.employees;
export default employeeSlice.reducer;