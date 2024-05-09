import { Project } from '@agency-os/class'
import { Box, Unstable_Grid2 as Grid, } from '@mui/material'
import React from 'react'
import { ProjectCollection, DeliveryCollection } from '~/components'

const DashboardPage: React.FC = () => {
    return (
        <Box>
            <div>DashboardPage</div>
            <DeliveryCollection.TableComponent/>
            {/* <ProjectCollection.NewComponent /> */}

            {/* <DeliveryCollection.NewComponent /> */}
            <Grid container>
                {Array.from({ length: 10 }).map((_, index) => (
                    <Grid xs={4} p={1} key={index}>
                        <ProjectCollection.CardComponent key={index} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default DashboardPage
