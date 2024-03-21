import { configureStore } from "@reduxjs/toolkit";

import employeeReducer from "../stores/employeeSlice";

export const store = configureStore({
  reducer: {
    employees: employeeReducer,
  },
});
