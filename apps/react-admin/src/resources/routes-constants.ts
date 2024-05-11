export const ROUTES = {
    HOME_PAGE: '/',
    LOGIN_PAGE: '/login',
    REGISTER_PAGE: '/register',
    DASHBOARD_PAGE: '/dashboard',

 
    PROJECT_NEW_PAGE: '/project',
    PROJECT_PAGE: '/project/:projectId',
    PROJECT_EDIT_PAGE: '/project/:projectId/edit',

    DELIVERY_PAGE: '/project/:projectId/delivery/:deliveryId',
    DELIVERY_NEW_PAGE: '/project/:projectId/delivery',
    DELIVERY_EDIT_PAGE: '/project/:projectId/delivery/:deliveryId/edit',
    DELIVERY_FILE_PAGE: '/project/:projectId/delivery/:deliveryId/file',
    DELIVERY_FILE_UPDATE_PAGE: '/project/:projectId/delivery/:deliveryId/file/new',

    ASSET_BASE_PATH: '/asset',
    ASSET_PAGE: '/project/:projectId/delivery/:deliveryId/asset/:assetId',
    ASSET_EDIT_PAGE: '/project/:projectId/delivery/:deliveryId/asset/:assetId/edit',
    ASSET_NEW_PAGE: '/project/:projectId/delivery/:deliveryId/asset',
    ASSET_FILE_PAGE: '/project/:projectId/delivery/:deliveryId/asset/:assetId/file',
    ASSET_FILE_UPDATE_PAGE: '/project/:projectId/delivery/:deliveryId/asset/:assetId/file/:fileId'
}
