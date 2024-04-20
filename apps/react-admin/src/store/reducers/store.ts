import { ThunkDispatch, UnknownAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage
import data from './data'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import themeReducer from './theme'
import jwtRedcuer from './jwt'
import  authReducer  from './auth'
import { rootApiSlice } from '../api/rootApi'

const jwtPersistConfig = {
    key: 'jwt',
    storage: storage,
    verstion: 1
}
const jwt = persistReducer(jwtPersistConfig, jwtRedcuer)

const rootReducer = combineReducers({
    [rootApiSlice.reducerPath]: rootApiSlice.reducer,
    data,
    theme: themeReducer,
    auth:authReducer
    jwt
})
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['theme']
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
        }).concat(rootApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, any, UnknownAction>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const persistor = persistStore(store)
