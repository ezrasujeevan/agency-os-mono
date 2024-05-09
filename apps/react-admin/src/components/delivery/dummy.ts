import { faker } from '@faker-js/faker'
import { ProjectStatus } from '~/resources/project-constans'


export const dummyDelivery: Delivery.Delivery[] = Array.from(
    { length: faker.number.int({ min: 1, max: 20 }) },
    () => {
        faker.seed()
        return {
            projectId: faker.string.uuid(),
            deliverableName: faker.lorem.words(2),
            deliverableType: faker.helpers.arrayElement(['Document', 'Image', 'Video']),
            description: faker.lorem.sentence(),
            tags: faker.lorem.words(3).split(' '),
            access: faker.datatype.boolean(),
            createdBy: faker.string.uuid(),
            deliveryFiles: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
                delivery: {
                    projectId: faker.string.uuid(),
                    deliverableName: faker.lorem.words(2),
                    deliverableType: faker.helpers.arrayElement(['Document', 'Image', 'Video']),
                    description: faker.lorem.sentence(),
                    tags: faker.lorem.words(3).split(' '),
                    access: faker.datatype.boolean(),
                    createdBy: faker.string.uuid(),
                    deliveryFiles: [],
                    id: faker.string.uuid(),
                    createdAt: faker.date.past(),
                    updatedAt: faker.date.recent(),
                    deletedAt: faker.date.recent(),
                    version: faker.number.int()
                },
                fileVersion: faker.system.semver(),
                fileUrl: faker.image.url(),
                id: faker.string.uuid(),
                createdAt: faker.date.past(),
                updatedAt: faker.date.recent(),
                deletedAt: faker.date.recent(),
                version: faker.number.int()
            })),
            id: faker.string.uuid(),
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent(),
            deletedAt: faker.date.recent(),
            version: faker.number.int()
        }
    }
)

export const dummyProject: Projects.Project[] = Array.from(
    { length: faker.number.int({ min: 5, max: 50 }) },
    () => {
        faker.seed()
        return {
            id: faker.string.uuid(),
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent(),
            deletedAt: faker.date.recent(),
            version: faker.number.int(),
            trialName: faker.lorem.word(),
            name: faker.lorem.words(),
            opportunityDate: faker.date.future(),
            startDate: faker.date.future(),
            endDate: faker.date.future(),
            projectValue: faker.number.float(),
            clientId: faker.string.uuid(),
            userId: faker.string.uuid(),
            companyId: faker.string.uuid(),
            status: faker.helpers.enumValue(ProjectStatus)
        }
    }
)

// export const dummyProject: ProjectClass.Project[] = Array.from(
//     { length: faker.number.int({ min: 1, max: 20 }) },
//     () => {
//         faker.seed()
//         return {
//             id: faker.string.uuid(),
//             createdAt: faker.date.past(),
//             updatedAt: faker.date.recent(),
//             deletedAt: faker.date.recent(),
//             version: faker.number.int(),
//             trialName: faker.lorem.word(),
//             name: faker.lorem.words(),
//             opportunityDate: faker.date.future(),
//             startDate: faker.date.future(),
//             endDate: faker.date.future(),
//             projectValue: faker.number.float(),
//             clientId: faker.string.uuid(),
//             userId: faker.string.uuid(),
//             companyId: faker.string.uuid(),
//             status: faker.helpers.enumValue(ProjectClass.ProjectStatus)
//         }
//     }
// )
