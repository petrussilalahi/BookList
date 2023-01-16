import { SAVE_SEARCH, UNSAVE_SEARCH } from '../actionTypes/index';

const initialState = {
  search_history: [],
};

export default function (state = initialState, action) {
  if (action.type == SAVE_SEARCH) {
    console.log('history:' , state.search_history)

    var profileHistory = state.search_history;
    
    profileHistory=[...profileHistory,{
        searchKey: action.payload.searchKey,
         id: action.payload.id,
    }];

    console.log("profileHistory", profileHistory)
    
    return {
      ...state,
      search_history: profileHistory
    };
  }

  if (action.type == UNSAVE_SEARCH) {
    const {id} = action.payload
    return{
      ...state,
      search_history: state.search_history.filter((list) => list.id != id)

    }
  }

  return state;
}