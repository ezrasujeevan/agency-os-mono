import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { companyApiSlice } from "../api/company.api.slice";
import { Company } from "@agency-os/class";

interface companyState {
    id:string;
    name:string;
    code:string;
}

const initialState: companyState = {
    id:'',
    name:'',
    code:'' 
}

export const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addMatcher(companyApiSlice.endpoints.getCompanyById.matchFulfilled, (state, action: PayloadAction<Company.Company>) => {
            state = { ...state, ...action.payload }
        })
        builder.addMatcher(companyApiSlice.endpoints.getAllCompanies.matchFulfilled, (state, action: PayloadAction<Company.Company[]>) => {
            state = { ...state, ...action.payload }
        })
        builder.addMatcher(companyApiSlice.endpoints.updateCompany.matchFulfilled, (state, action: PayloadAction<Company.Company>) => {
            state = { ...state, ...action.payload }
        })
        builder.addMatcher(companyApiSlice.endpoints.deleteCompany.matchFulfilled, (state) => {
            state = initialState
        })
    }
})