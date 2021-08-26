import globalContextCreator from '../context/globalContextCreator';
const initialState = {
    key:''
}

const favoriteReducer = (state,actions)=>{
    switch(actions.type){
        case 'UPDATE_FAVORITE':
            return{
                ...state,
                key:actions.payload
            }
        case 'GET_FAVORITE':
            return{
                ...state,
                favoriteId: actions.payload

            }
        default:
            return state;

    }
}

const updateFavorite =  (dispatch) =>{
    return async (id)=>{
     dispatch({
         type:'UPDATE_FAVORITE',
         payload:id
        });
    };
 }
 export const {Context,Provider} = globalContextCreator(favoriteReducer,{updateFavorite},initialState);