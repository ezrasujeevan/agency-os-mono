import { Asset, Client, Company, Delivery, Project, User } from '@agency-os/class'

export type userType = User.User
export type companyType = Company.Company
export type clientType = Client.Client
export type projectType = Project.Project
export type deliveryType = Delivery.Delivery
export type deliveryFileType = Delivery.DeliveryFile
export type assetType = Asset.Asset
export type assetFileType = Asset.AssetFile

export type projectArrayType = Project.Project[]

export type responseUserType = User.UserResponseDto
export type responseCompanyType = Company.companyResponseDto
export type responseClientType = Client.ClientResponseDto
export type responseProjectType = Project.ProjectResponse
export type responseDeliveryType = Delivery.DeliveryResponseDto
export type responseAssetType = Asset.AssetResponseDto

export type createUserType = User.CreateUserRequestDto
export type createCompanyType = Company.CreateCompanyRequestDto
export type createClientType = Client.CreateClientRequestDto
export type createProjectType = Project.CreateProjectRequestDto
export type createDeliveryType = Delivery.CreateDeliveryRequestDto
export type createDeliveryFileType = Delivery.createDeliveryFileRequestDto
export type createAssetType = Asset.CreateAssetRequestDto
export type createAssetFileType = Asset.createAssetFileRequestDto
