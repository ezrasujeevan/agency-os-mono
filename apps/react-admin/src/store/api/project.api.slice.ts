import { Project } from "@agency-os/class";
import { rootApiSlice } from "./root.api.slice";

export const projectApiSlice = rootApiSlice.injectEndpoints({
    endpoints:(builder) => ({
        getAllProjects: builder.query<Project.ProjectResponse, void>({
            query: () => ({
                url: `project`,
                method: 'GET'
            })
        }),
        getProjectById: builder.query<Project.ProjectResponse, Project.FindOneProjectRequestByIdDto>({
            query: ({id}: Project.FindOneProjectRequestByIdDto) => ({
                url: `project/${id}`,
                method: 'GET'
            })
        }),
        getProjectByTrialName: builder.query<Project.ProjectResponse, Project.FindOneProjectRequestByTrialNameDto>({
            query: ({trialName}: Project.FindOneProjectRequestByTrialNameDto) => ({
                url: `project?trialName=${trialName}`,
                method: 'GET'
            })
        }),
        getAllProjectsByUserId: builder.query<Project.ProjectResponse, Project.FindAllProjectByUserRequestDto>({
            query: ({userId}: Project.FindAllProjectByUserRequestDto) => ({
                url: `project?user=${userId}`,
                method: 'GET'
            })
        }),
        getAllProjectsByCompanyId: builder.query<Project.ProjectResponse, Project.FindAllProjectByCompanyRequestDto>({
            query: ({companyId}: Project.FindAllProjectByCompanyRequestDto) => ({
                url: `project?company=${companyId}`,
                method: 'GET'
            })
        }),
        getAllProjectsByClientId: builder.query<Project.ProjectResponse, Project.FindAllProjectByClientRequestDto>({
            query: ({clientId}: Project.FindAllProjectByClientRequestDto) => ({
                url: `project?client=${clientId}`,
                method: 'GET'
            })
        }),
        createProject: builder.mutation<Project.ProjectResponse, Project.CreateProjectRequestDto>({
            query: (data: Project.CreateProjectRequestDto) => ({
                url: `project`,
                method: 'POST',
                body: data
            })
        }),
        updateProject: builder.mutation<Project.ProjectResponse, Project.UpdateProjectRequestDto>({
            query: (data: Project.UpdateProjectRequestDto) => ({
                url: `project/${data.id}`,
                method: 'PATCH',
                body: data
            })
        }),
        deleteProject: builder.mutation<Project.ProjectResponse, string>({
            query: (id: string) => ({
                url: `project/${id}`,
                method: 'DELETE'
            })
        })
    })
})