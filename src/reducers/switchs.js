import {
  SET_PAGE_NAME
} from '../actions/switchs';
  
const initialState = {
  pageName: "Home"
};
  
export default function switchs(state = initialState, action) {
  const {type, data} = action;
  switch (type) {
    case SET_PAGE_NAME:
      return {
        ...state,
        pageName: data
      };
    default:
      return state;
  }
}
  