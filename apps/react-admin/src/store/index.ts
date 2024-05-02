import { ThunkDispatch, UnknownAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage
import { dataReducer } from './reducers/data'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { rootApiSlice } from './api/root.api.slice'
import {
    assetSlice,
    authSlice,
    clientSlice,
    companySlice,
    deliverySlice,
    projectSlice,
    snackAlertSlice,
    themeSlice,
    userSlice
} from './reducers'


const rootReducer = combineReducers({
    [rootApiSlice.reducerPath]: rootApiSlice.reducer,
    [themeSlice.reducerPath]: themeSlice.reducer,
    [authSlice.reducerPath]: authSlice.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
    [companySlice.reducerPath]: companySlice.reducer,
    [clientSlice.reducerPath]: clientSlice.reducer,
    [snackAlertSlice.reducerPath]: snackAlertSlice.reducer,
    [projectSlice.reducerPath]: projectSlice.reducer,
    [assetSlice.reducerPath]: assetSlice.reducer,
    [deliverySlice.reducerPath]: deliverySlice.reducer
})
const persistConfig = {
    key: 'root',
    storage,
    whitelist: [themeSlice.reducerPath,authSlice.reducerPath]
}

const rootPersistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: rootPersistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        }).concat(rootApiSlice.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, any, UnknownAction>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const persister = persistStore(store)
