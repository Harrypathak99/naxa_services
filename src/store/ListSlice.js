import { createSlice } from '@reduxjs/toolkit';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { getDataFromAPI } from '../api/api'; 

const initialState = {
  data: null,
  error: null,
  loading: false
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    fetchDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } = dataSlice.actions;

export function* fetchDataSaga(action) {
  try {
    const data = yield call(getDataFromAPI, action.payload);
    yield put(fetchDataSuccess(data));
  } catch (error) {
    yield put(fetchDataFailure(error));
  }
}

export function* watchFetchData() {
  yield takeEvery(fetchDataStart.type, fetchDataSaga);
  yield takeLatest(fetchDataStart.type, fetchDataSaga);
}

export default dataSlice.reducer;
