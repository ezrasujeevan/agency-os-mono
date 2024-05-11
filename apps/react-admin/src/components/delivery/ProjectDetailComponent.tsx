import React, { useEffect, useState } from 'react'
import { Unstable_Grid2 as Grid, Skeleton, Typography } from '@mui/material'
import { Project, User, Client, Company } from '@agency-os/class'
import { skipToken } from '@reduxjs/toolkit/query'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '~/store'
import { useGetProjectByIdQuery, useGetUserByIdQuery, useGetClientByIdQuery, useGetCompanyByIdQuery } from '~/store/api'
import { setSnackAlertError } from '~/store/reducers'
import { projectType, userType, clientType, companyType } from '~/types/class'

interface ProjectDetailComponentProps {
    projectId: string
}

const ProjectDetailComponent: React.FC<ProjectDetailComponentProps> = ({
    projectId
}: ProjectDetailComponentProps) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [project, setProject] = useState<projectType>()
    const [User, setUser] = useState<userType>()
    const [Client, setClient] = useState<clientType>()
    const [Company, setCompany] = useState<companyType>()
    
    const {
        data: projectRes,
        isSuccess: isSuccessProject,
        isFetching: isFetchingProject
    } = useGetProjectByIdQuery(projectId ? { id: projectId } : skipToken)

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
            if (status === 200 && project && !Array.isArray(project)) {
                setProject(project)
            } else {
                dispatch(
                    setSnackAlertError({
                        title: 'Project Not Found',
                        message: `Project ID:${projectId} does not exist`
                    })
                )
                navigate(-1)
            }
        }

        if (isSuccessUser) {
            const { status, user }: User.UserResponseDto = userRes
            if (status === 200 && user && !Array.isArray(user)) {
                setUser(user)
            }
        }
        if (isSuccessClient) {
            const { status, client }: Client.ClientResponseDto = ClientRes
            if (status === 200 && client && !Array.isArray(client)) {
                setClient(client)
            }
        }
        if (isSuccessCompany) {
            const { status, company }: Company.companyResponseDto = CompanyRes
            if (status === 200 && company && !Array.isArray(company)) {
                setCompany(company)
            }
        }
    }, [projectRes, userRes, ClientRes, CompanyRes])
    return (
        <Grid container>
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
                <Typography variant="h6">
                    {' '}
                    Project Manger :{' '}
                    {!isFetchingProject ? (
                        isFetchingUser ? (
                            <Skeleton />
                        ) : (
                            `${User?.firstName} ${User?.lastName} (${User?.email}) `
                        )
                    ) : (
                        <Skeleton />
                    )}
                </Typography>
                <Typography variant="h6">
                    {' '}
                    Brand Manger :
                    {!isFetchingProject ? (
                        isFetchingClient ? (
                            <Skeleton />
                        ) : (
                            `${Client?.firstName} ${Client?.lastName} (${Client?.email}) `
                        )
                    ) : (
                        <Skeleton />
                    )}
                </Typography>
                <Typography variant="h6">
                    {' '}
                    Company :{' '}
                    {!isFetchingProject ? (
                        isFetchingCompany ? (
                            <Skeleton />
                        ) : (
                            `${Company?.name} (${Company?.code}) `
                        )
                    ) : (
                        <Skeleton />
                    )}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default ProjectDetailComponent
