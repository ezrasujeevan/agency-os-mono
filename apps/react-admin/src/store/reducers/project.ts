import { Project } from '@agency-os/class'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { projectApiSlice } from '../api'
import { HttpStatusCode } from 'axios'

const initialState: Partial<Project.Project> = {
    id: '',
    trialName: '',
    name: '',
    opportunityDate: undefined,
    startDate: undefined,
    endDate: undefined,
    projectValue: 0,
    clientId: '',
    userId: '',
    companyId: ''
}

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            projectApiSlice.endpoints.getProjectById.matchFulfilled,
            (state, action: PayloadAction<Project.ProjectResponse>) => {
                const { status, project } = action.payload
                if (status === 200 && project && !Array.isArray(project)) {
                    state = project
                }
            }
        )
        builder.addMatcher(
            projectApiSlice.endpoints.createProject.matchFulfilled,
            (state, action: PayloadAction<Project.ProjectResponse>) => {
                const { status, project } = action.payload
                if (status === 201 && project && !Array.isArray(project)) {
                    state = project
                }
            }
        )
        builder.addMatcher(
            projectApiSlice.endpoints.updateProject.matchFulfilled,
            (state, action: PayloadAction<Project.ProjectResponse>) => {
                const { status, project } = action.payload
                if (status === 200 && project && !Array.isArray(project)) {
                    state = project
                }
            }
        )
        builder.addMatcher(
            projectApiSlice.endpoints.deleteProject.matchFulfilled,
            (state, action: PayloadAction<Project.ProjectResponse>) => {
                const { status } = action.payload
                if (status === 204) {
                    state = initialState
                }
            }
        )
        builder.addMatcher(
            projectApiSlice.endpoints.getProjectByTrialName.matchFulfilled,
            (state, action: PayloadAction<Project.ProjectResponse>) => {
                const { status, project } = action.payload
                if (status === 200 && project && !Array.isArray(project)) {
                    state = initialState
                }
            }
        )
    }
})
