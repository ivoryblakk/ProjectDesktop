import { IRecords } from "../interface/interfaces";
import mockData from "../mockData";

export const initialState: State = {
   records: mockData,
   loading: false
  };
  
  interface State {
    records: IRecords[];
    loading: boolean
  }
  
  type Action = { type: 'updateRecords';   payload: IRecords[] } |
  {type :'initUpdateRecords'} | {type :'completedUpdateRecords'};


  export function recordsReducer(state: State, action: Action) {
    switch (action.type) {
      case 'updateRecords': {
        return {...state,
          records: action.payload,
        };
    }
      case 'initUpdateRecords': {
            return {...state,
              loading: true,
            };
      }
      case 'completedUpdateRecords': {
        return {...state,
          loading: false,
        };
  }
      default:
        return state;
    }
  }