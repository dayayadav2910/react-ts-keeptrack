import configureMockStore from 'redux-mock-store';
import ReduxThunk from 'redux-thunk';
import { initialState } from '../../../state';
import { loadProject } from '../projectActions';
import {
  LOAD_PROJECT_REQUEST,
  LOAD_PROJECT_SUCCESS,
  LOAD_PROJECT_FAILURE
} from '../projectTypes';
import { projectAPI } from '../../projectAPI';
import { MOCK_PROJECTS } from '../../MockProjects';
jest.mock('../../projectAPI');

const middlewares = [ReduxThunk];
const mockStoreCreator = configureMockStore(middlewares);

describe('Project Actions', () => {
  let store: any;

  beforeEach(() => {
    store = mockStoreCreator(initialState);
  });

 

  test('should load projects successfully', () => {
    const expectedActions = [
      { type: LOAD_PROJECT_REQUEST },
      {
        type: LOAD_PROJECT_SUCCESS,
        payload: { projects: MOCK_PROJECTS, page: 1 }
      }
    ];

    return store.dispatch(loadProject(1)).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });
  test('should return error', () => {
    projectAPI.get = jest
      .fn(
        // leave this commented initially
        // projectAPI.get
      )
      .mockImplementationOnce(() => {
        return Promise.reject('failed');
      });

    const expectedActions = [
      { type: LOAD_PROJECT_REQUEST },
      {
        type: LOAD_PROJECT_FAILURE,
        payload: 'failed'
      }
    ];
    return store.dispatch(loadProject(1)).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });

 
});