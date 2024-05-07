import { PayloadAction, createAsyncThunk, createListenerMiddleware, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

interface FetchRequest {
    from: number
    to: number
}

interface FetcherTask {
    seqNo: number
    request: FetchRequest,
    current: number
    state: 'new' | 'pending' | 'done' | 'err',
    results: any[],
}

interface FetcherTaskResultOk {
    task: FetcherTask,
    result: any,
}

export interface FetcherState {
    nextSeqNo: number
    tasks: FetcherTask[]
}

const initialState: FetcherState = {
    nextSeqNo: 1,
    tasks: [],
}

export const fetcherSlice = createSlice({
    name: 'fetcher',
    initialState,
    reducers: {
        initiate: (state, action: PayloadAction<FetchRequest>) => {
            const newTask: FetcherTask = {
                seqNo : state.nextSeqNo++,
                request : action.payload,
                current: action.payload.from,
                state: 'new',
                results: [],
            };
            state.tasks.push(newTask);
        },
        startFetching: (state, action: PayloadAction<FetcherTask>) => {
            const task = state.tasks.find(task => task.seqNo === action.payload.seqNo)
            if (task) {
                task.state = "pending"
            }
        },
        fetchedOk: (state, action: PayloadAction<FetcherTaskResultOk>) => {
            const task = state.tasks.find(task => task.seqNo === action.payload.task.seqNo)
            if (task) {
                task.results.push(action.payload.result)
                if (task.current < task.request.to) {
                    task.current ++
                } else {
                    task.state = "done"
                }                
            }
        },
    },
})

export default fetcherSlice

export const newActionsDetectedMiddleware = createListenerMiddleware()

newActionsDetectedMiddleware.startListening({
    actionCreator: fetcherSlice.actions.initiate,
    effect: (_, listenerApi) => {
      const fetcher:FetcherState = (listenerApi.getState() as any).fetcher;
      for (const task of fetcher.tasks) {
        if (task.state === 'new') {
            listenerApi.dispatch(fetcherSlice.actions.startFetching(task))
        }
      }
    },
  })

  export const startFetchingActionsMiddleware = createListenerMiddleware()

  newActionsDetectedMiddleware.startListening({
      actionCreator: fetcherSlice.actions.startFetching,
      effect: async (action, listenerApi) => {
        console.log('About to start fetching: ', action.payload);
        const url = `/api/data/${action.payload.current}?delay=2&fail=false`        
        try {
            const response = await axios.get(url);
            //const event
            listenerApi.dispatch(fetcherSlice.actions.fetchedOk({
                task: action.payload,
                result: response.data,
            }))
          } catch (error: any) {
            //TODO: emit an error
          }
      
        //console.log('state', listenerApi.getState());
      },
    })
  
