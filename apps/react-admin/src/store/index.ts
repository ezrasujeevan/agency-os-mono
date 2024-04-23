import { ThunkDispatch, UnknownAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage
import { dataReducer } from './reducers/data'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { rootApiSlice } from './api/root.api.slice'
import { authSlice, clientSlice, companySlice, jwtSlice, snackAlertSlice, themeSlice, userSlice } from './reducers'

const jwtPersistConfig = {
    key: 'jwt',
    storage: storage,
    verstion: 1
}
const jwt = persistReducer(jwtPersistConfig, jwtSlice.reducer)

const rootReducer = combineReducers({
    jwt,
    [rootApiSlice.reducerPath]: rootApiSlice.reducer,
    [themeSlice.reducerPath]: themeSlice.reducer,
    [authSlice.reducerPath]: authSlice.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
    [companySlice.reducerPath]: companySlice.reducer,
    [clientSlice.reducerPath]: clientSlice.reducer,
    [snackAlertSlice.reducerPath]: snackAlertSlice.reducer
})
const persistConfig = {
    key: 'root',
    storage,
    whitelist: [themeSlice.reducerPath]
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

export const persistor = persistStore(store)
