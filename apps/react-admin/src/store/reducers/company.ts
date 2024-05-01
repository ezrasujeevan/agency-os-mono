import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { companyApiSlice } from '../api/company.api.slice'
import { Company } from '@agency-os/class'

const initialState: Partial<Company.Company> = {
    id: '',
    name: '',
    code: ''
}

export const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            companyApiSlice.endpoints.getCompanyById.matchFulfilled,
            (state, action: PayloadAction<Company.companyResponseDto>) => {
                const { status, company } = action.payload
                if (status === 200 && company && !Array.isArray(company)) {
                    state = company
                }
            }
        )
        builder.addMatcher(
            companyApiSlice.endpoints.getCompanyByCode.matchFulfilled,
            (state, action: PayloadAction<Company.companyResponseDto>) => {
                const { status, company } = action.payload
                if (status === 200 && company && !Array.isArray(company)) {
                    state = company
                }
            }
        )
        builder.addMatcher(
            companyApiSlice.endpoints.updateCompany.matchFulfilled,
            (state, action: PayloadAction<Company.companyResponseDto>) => {
                const { status, company } = action.payload
                if (status === 200 && company && !Array.isArray(company)) {
                    state = company
                }
            }
        )
        builder.addMatcher(
            companyApiSlice.endpoints.createCompany.matchFulfilled,
            (state, action: PayloadAction<Company.companyResponseDto>) => {
                const { status, company } = action.payload
                if (status === 200 && company && !Array.isArray(company)) {
                    state = company
                }
            }
        )
        builder.addMatcher(
            companyApiSlice.endpoints.deleteCompany.matchFulfilled,
            (state, action: PayloadAction<Company.companyResponseDto>) => {
                const { status,  } = action.payload
                if (status === 204 ) {
                    state = initialState
                }
            }
        )
    }
})
