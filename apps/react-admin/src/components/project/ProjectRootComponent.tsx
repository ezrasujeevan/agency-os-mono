import React, { useState, useEffect } from 'react'
import { Unstable_Grid2 as Grid } from '@mui/material'
import { Project } from '@agency-os/class'
import { useGetAllProjectsQuery } from '~/store/api'
import { useNavigate } from 'react-router-dom'
import SkeletonCardComponent from './SkeletonCardComponent'
import ProjectCardComponent from './ProjectCardComponent'

interface ProjectRootComponentProps {}

const ProjectRootComponent: React.FC<
    ProjectRootComponentProps
> = ({}: ProjectRootComponentProps) => {
    const { data: projectRes, isFetching, isSuccess, isError } = useGetAllProjectsQuery()
    const [projects, setProjects] = useState<Project.Project[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        if (isSuccess) {
            const { status, project }: Project.ProjectResponse = projectRes
            if (status === 200 && project && Array.isArray(project)) {
                setProjects(project)
            }
        }
        return () => {}
    }, [projectRes])
    const handleOnClick = (projectID: string) => {
        console.log(projectID)
        navigate(`/project/${projectID}`)
    }

    return (
        <Grid container>
            {isFetching
                ? Array.from({ length: 3 }).map((_, index) => (
                      <Grid xs={4} p={1} key={index}>
                          <SkeletonCardComponent />
                      </Grid>
                  ))
                : projects.map((project, index) => (
                      <Grid
                          xs={4}
                          p={1}
                          key={index}
                          onClick={() => {
                              handleOnClick(project.id)
                          }}
                          sx={{ cursor: 'pointer' }}
                      >
                          <ProjectCardComponent project={project} />
                      </Grid>
                  ))}
        </Grid>
    )
}

export default ProjectRootComponent
