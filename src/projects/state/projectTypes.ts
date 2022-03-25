import {Project} from '../Project';

// Action Types 


export const LOAD_PROJECT_REQUEST = 'LOAD_PROJECT_REQUEST';
export const LOAD_PROJECT_SUCCESS = 'LOAD_PROJECT_SUCCESS';
export const LOAD_PROJECT_FAILURE = 'LOAD_PROJECT_FAILURE';
export const SAVE_PROJECT_REQUEST = 'SAVE_PROJECT_REQUEST';
export const SAVE_PROJECT_SUCCESS = 'SAVE_PROJECT_SUCCESS';
export const SAVE_PROJECT_FAILURE = 'SAVE_PROJECT_FAILURE';
export const DELETE_PROJECT_REQUEST = 'DELETE_PROJECT_REQUEST';
export const DELETE_PROJECT_SUCCESS = 'DELETE_PROJECT_SUCCESS';
export const DELETE_PROJECT_FAILURE = 'DELETE_PROJECT_FAILURE'

// Action Interface

interface LoadProjectRequest {
    type : typeof LOAD_PROJECT_REQUEST
}

interface LoadProjectSuccess {
    type : typeof LOAD_PROJECT_SUCCESS
    payload : {
        projects : Project[];
        page : number
    }
}
interface LoadProjectFailure {
    type : typeof LOAD_PROJECT_FAILURE
    payload : {
        message : string
    }
}
interface SaveProjectRequest {
    type : typeof SAVE_PROJECT_REQUEST
}
interface SaveProjectSuccess {
    type: typeof SAVE_PROJECT_SUCCESS
    payload: Project
  }
interface SaveProjectFailure{
    type : typeof SAVE_PROJECT_FAILURE
    payload : {message : string}
}
interface DeleteProjectRequest{
    type : typeof DELETE_PROJECT_REQUEST   
}
interface DeleteProjectSuccess{
    type : typeof DELETE_PROJECT_SUCCESS
    payload : Project;
}
interface DeleteProjectFailure{
    type : typeof DELETE_PROJECT_FAILURE
    payload : {message : string}
}

export type ProjectActionTypes = LoadProjectRequest | LoadProjectSuccess | 
LoadProjectFailure | SaveProjectRequest | SaveProjectSuccess | SaveProjectFailure |
DeleteProjectRequest | DeleteProjectSuccess | DeleteProjectFailure


export interface ProjectState {
    loading : boolean;
    projects : Project[];
    error : string | undefined;
    page : number
}