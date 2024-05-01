import { Company } from '@agency-os/class'
import { rootApiSlice } from './root.api.slice'
import { create } from 'domain'

export const companyApiSlice = rootApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCompanyById: builder.query<
            Company.companyResponseDto,
            Company.FindOneCompanyByIdRequestDto
        >({
            query: ({id}: Company.FindOneCompanyByIdRequestDto) => ({
                url: `company/${id}`,
                method: 'GET'
            })
        }),
        getCompanyByCode: builder.query<
            Company.companyResponseDto,
            Company.findOneCompanyByCodeRequestDto
        >({
            query: ({ code }: Company.findOneCompanyByCodeRequestDto) => ({
                url: `company?code=${code}`,
                method: 'GET'
            })
        }),
        getAllCompanies: builder.query<Company.companyResponseDto, void>({
            query: () => ({
                url: `company`,
                method: 'GET'
            })
        }),
        updateCompany: builder.mutation<
            Company.companyResponseDto,
            Company.UpdateCompanyRequestDto
        >({
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
        }),
        createCompany: builder.mutation<Company.Company, Company.CreateCompanyRequestDto>({
            query: (data: Company.CreateCompanyRequestDto) => ({
                url: `companies`,
                method: 'POST',
                body: data
            })
        })
    })
})
