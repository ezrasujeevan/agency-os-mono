import React, { useEffect, useState } from 'react'
import { Unstable_Grid2 as Grid, Skeleton, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import {
    useGetClientByIdQuery,
    useGetCompanyByIdQuery,
    useGetProjectByIdQuery,
    useGetUserByIdQuery
} from '~/store/api'
import { skipToken } from '@reduxjs/toolkit/query'
import { DeliveryCollection } from '~/components'
import { Client, Company, Project, User } from '@agency-os/class'
import moment from 'moment'

interface ProjectPageProps {}

const ProjectPage: React.FC<ProjectPageProps> = ({}: ProjectPageProps) => {
    const { projectId } = useParams()
    const {
        data: projectRes,
        isSuccess: isSuccessProject,
        isFetching: isFetchingProject
    } = useGetProjectByIdQuery(projectId ? { id: projectId } : skipToken)
    const [project, setProject] = useState<Project.Project>()
    const [User, setUser] = useState<User.User>()
    const [Client, setClient] = useState<Client.Client>()
    const [Company, setCompany] = useState<Company.Company>()
    const {
        data: userRes,
        isSuccess: isSuccessUser,
        isFetching: isFetchingUser
    } = useGetUserByIdQuery(project?.userId ? { id: project.userId } : skipToken)
    const {
        data: ClientRes,
        isSuccess: isSuccessClient,
        isFetching: isFetchingClient
    } = useGetClientByIdQuery(project?.clientId ? { id: project.clientId } : skipToken)
    const {
        data: CompanyRes,
        isSuccess: isSuccessCompany,
        isFetching: isFetchingCompany
    } = useGetCompanyByIdQuery(project?.companyId ? { id: project.companyId } : skipToken)

    useEffect(() => {
        if (isSuccessProject) {
            const { status, project }: Project.ProjectResponse = projectRes
            if (status === 200 && project) {
                setProject(project)
            }
        }
        if (isSuccessUser) {
            const { status, user }: User.UserResponseDto = userRes
            if (status === 200 && user) {
                setUser(user)
            }
        }
        if (isSuccessClient) {
            const { status, client }: Client.ClientResponseDto = ClientRes
            if (status === 200 && client) {
                setClient(client)
            }
        }
        if (isSuccessCompany) {
            const { status, company }: Company.companyResponseDto = CompanyRes
            if (status === 200 && company) {
                setCompany(company)
            }
        }
    }, [projectRes, userRes, ClientRes, CompanyRes])

    return (
        <Grid container>
            <Grid xs={12}>
                <Grid xs={12} alignContent={'center'}>
                    <Typography variant="h3">Project Detail</Typography>
                    <Typography variant="h4">
                        Name: {isFetchingProject ? <Skeleton /> : project?.name}
                    </Typography>
                    <Typography variant="h5">
                        Trial Name: {isFetchingProject ? <Skeleton /> : project?.trialName}
                    </Typography>
                    <Typography variant="h6">
                        Opportunity Date:{' '}
                        {isFetchingProject ? (
                            <Skeleton />
                        ) : (
                            moment(project?.opportunityDate).format('MMMM Do YYYY')
                        )}
                    </Typography>
                    <Typography variant="h6">
                        Project Value: {isFetchingProject ? <Skeleton /> : project?.projectValue}
                    </Typography>
                    <Typography variant="h6">
                        Start Date:{' '}
                        {isFetchingProject ? (
                            <Skeleton />
                        ) : (
                            moment(project?.startDate).format('MMMM Do YYYY')
                        )}
                    </Typography>
                    <Typography variant="h6">
                        End Date:{' '}
                        {isFetchingProject ? (
                            <Skeleton />
                        ) : project?.endDate ? (
                            moment(project?.endDate).format('MMMM Do YYYY')
                        ) : (
                            'N/A'
                        )}
                    </Typography>
                    <Typography variant="h6">
                        Status: {isFetchingProject ? <Skeleton /> : project?.status}
                    </Typography>
                    <Typography variant="h6"> Project Manger : {isFetchingUser? <Skeleton/> : `${User?.firstName} ${User?.lastName} (${User?.email}) `}</Typography>
                    <Typography variant="h6"> Brand Manger :{isFetchingClient? <Skeleton/> : `${Client?.firstName} ${Client?.lastName} (${Client?.email}) `} </Typography>
                    <Typography variant="h6"> Company : {isFetchingCompany? <Skeleton/> : `${Company?.name} (${Company?.code}) `}</Typography>
                </Grid>
            </Grid>
            <Grid xs={12}>
                <DeliveryCollection.TableComponent projectId={projectId} />
            </Grid>
        </Grid>
    )
}

export default ProjectPage
