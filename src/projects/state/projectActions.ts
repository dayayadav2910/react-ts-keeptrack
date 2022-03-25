import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { projectAPI } from '../projectAPI';
import {Project} from '../Project';
import {
    LOAD_PROJECT_REQUEST,
    LOAD_PROJECT_SUCCESS,
    LOAD_PROJECT_FAILURE,
    SAVE_PROJECT_REQUEST,
    SAVE_PROJECT_SUCCESS,
    SAVE_PROJECT_FAILURE,
    ProjectState,
} from './projectTypes';
  

export function loadProject(
    page: number
  ): ThunkAction<void, ProjectState, null, Action<string>> {
    return async (dispatch: any) => {
      dispatch({ type: LOAD_PROJECT_REQUEST });
      try {
            const data = await projectAPI
                .get(page);
            dispatch({
                type: LOAD_PROJECT_SUCCESS,
                payload: { projects: data, page },
            });
        } catch (error) {
            dispatch({ type: LOAD_PROJECT_FAILURE, payload: error });
        }
    };
  }
export function saveProject(project : Project) : ThunkAction <void, ProjectState,null,Action <string>>{
    return(dispatch : any)=>{
        dispatch({type: SAVE_PROJECT_REQUEST});
        return projectAPI.put(project).then((data)=>{
            dispatch({
                type: SAVE_PROJECT_SUCCESS,
                payload : data
            })
        }).catch((error)=>{
            dispatch({
                type : SAVE_PROJECT_FAILURE,
                payload : error
            })
            
        })
    }
}