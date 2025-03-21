import { HistoryState } from './history.state';
import { SongModel } from '../../models/song.model';
import { createReducer, on } from '@ngrx/store';
import * as historyActions from './history.actions';

export const initialState: HistoryState = {
  historySongList: <SongModel[]>[],
  isLoading: false,
  error: null,
};

export const historyReducer = createReducer(
  initialState,

  on(historyActions.getHistorySongList, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(
    historyActions.GetHistorySongListSuccess,
    (state, { historySongList, type }) => {
      console.log(type);
      return <HistoryState>{
        ...state,
        historySongList: historySongList,
        isLoading: false,
      };
    },
  ),

  on(historyActions.GetHistorySongListFailure, (state, { error, type }) => {
    console.log(type);
    return {
      ...state,
      error: error,
      isLoading: false,
    };
  }),

  on(historyActions.createHistory, (state, { type }) => {
    console.log(type);
    return {
      ...state,
    };
  }),

  on(
    historyActions.createHistorySuccess,
    (state, { type, historySongList }) => {
      console.log(type);
      return {
        ...state,
        historySongList: historySongList,
      };
    },
  ),

  on(historyActions.createHistoryFailure, (state, { error, type }) => {
    console.log(type);
    return {
      ...state,
      error: error,
    };
  }),

  on(historyActions.clearState, (state, {type}) => {
    console.log(type);
    return{
      historySongList: <SongModel[]>[],
      isLoading: false,
      error: null,
    }
  })
);
