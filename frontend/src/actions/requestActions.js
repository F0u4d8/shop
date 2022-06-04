import {
  REQUEST_SELLER_REQUEST,
  REQUEST_SELLER_SUCCESS,
  REQUEST_SELLER_FAIL,
  REQUEST_SELLER_RESET,
  GET_REQUEST_SELLER_REQUEST,
  GET_REQUEST_SELLER_SUCCESS,
  GET_REQUEST_SELLER_FAIL,
  GET_REQUEST_SELLER_RESET,
  GET_DESC_REQUEST_SELLER_REQUEST,
  GET_DESC_REQUEST_SELLER_SUCCESS,
  GET_DESC_REQUEST_SELLER_FAIL,
  GET_DESC_REQUEST_SELLER_RESET,
  APPROVE_SELLER_REQUEST,
  APPROVE_SELLER_SUCCESS,
  APPROVE_SELLER_FAIL,
} from '../constants/requestConstants';

import axios from 'axios';

export const createRequest = (request) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REQUEST_SELLER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/request/`, request, config);
    console.log(data);

    dispatch({
      type: REQUEST_SELLER_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: REQUEST_SELLER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllRequest = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_REQUEST_SELLER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/request/all`, config);

    dispatch({
      type: GET_REQUEST_SELLER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_REQUEST_SELLER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const approveRequest = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: APPROVE_SELLER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/request/approve/${id}`,
      {},
      config
    );

    dispatch({
      type: APPROVE_SELLER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: APPROVE_SELLER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getRequestById = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_DESC_REQUEST_SELLER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/request/${id}`, config);

    dispatch({
      type: GET_DESC_REQUEST_SELLER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_DESC_REQUEST_SELLER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
