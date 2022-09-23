import React from "react";
import {Provider} from "react-redux";
import {AppRootStateType, RootReducerType} from "../app/store";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistsSlice} from "../features/TodolistsList/todolists-reducer";
import {tasksSlice} from "../features/TodolistsList/tasks-reducer";
import {v1} from "uuid";
import {TaskStatuses, TaskPriorities} from "../api/todolists-api"
import {appSlice} from "../app/app-reducer";
import thunk from "redux-thunk";
import {authSlice} from "../features/Login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {HashRouter} from "react-router-dom";



const rootReducer: RootReducerType = combineReducers({
    tasks: tasksSlice.reducer,
    todolists: todolistsSlice.reducer,
    app: appSlice.reducer,
    auth: authSlice.reducer
})

const initialGlobalState: AppRootStateType = {

    tasks: {
        ['todolistID1']: [
            {
                id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: 'todolistID1', order: 0,
                addedDate: '', priority: TaskPriorities.Middle, startDate: "", deadline: "", description: ""

            },
            {
                id: v1(), title: "Rest API", status: TaskStatuses.New, todoListId: 'todolistID1', order: 0,
                addedDate: '', priority: TaskPriorities.Middle, startDate: "", deadline: "", description: ""
            },
        ],
        ['todolistID2'] : [
            {
                id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: 'todolistID2', order: 0,
                addedDate: '', priority: TaskPriorities.Middle, startDate: "", deadline: "", description: ""
            },
            {
                id: v1(), title: "JS", status: TaskStatuses.Completed, todoListId: 'todolistID2', order: 0,
                addedDate: '', priority: TaskPriorities.Middle, startDate: "", deadline: "", description: ""
            },
        ]
    },
    todolists: [
        {id:'todolistID1', title:'What to learn', filter: 'all', order: 0, addedDate: "", entityStatus: 'idle'},
        {id:'todolistID2', title:'What to buy', filter: 'all', order: 0, addedDate: "", entityStatus: 'idle'},
    ],
    app: {
        status: 'idle',
        error: null,
        isInitialized: false
    },
    auth: {
        isLoggedIn: false
    }
}

export const storyBookStore = configureStore({
    reducer: rootReducer,
    preloadedState: initialGlobalState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
})

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>
        {storyFn()}
    </Provider>)

export const BrouserRouterDecorator = (storyFn: any) => {
    <HashRouter>{storyFn()}</HashRouter>
}