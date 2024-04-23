import { Company } from '@agency-os/class'
import { rootApiSlice } from './root.api.slice'

export const companyApiSlice = rootApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCompanyById: builder.query<Company.Company, Company.FindOneCompanyRequestDto>({
            query: (id: Company.FindOneCompanyRequestDto) => ({
                url: `company/${id}`,
                method: 'GET'
            })
        }),
        getAllCompanies: builder.query<Company.Company[], void>({
            query: () => ({
                url: `company`,
                method: 'GET'
            })
        }),
        updateCompany: builder.mutation<Company.Company, Company.UpdateCompanyRequestDto>({
            query: (data: Company.UpdateCompanyRequestDto) => ({
                url: `companies/${data.id}`,
                method: 'PATCH',
                body: data
            })
        }),
        deleteCompany: builder.mutation<Company.Company, string>({
            query: (id: string) => ({
                url: `companies/${id}`,
                method: 'DELETE'
            })
        })
    })
})
