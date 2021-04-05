import * as React from 'react'
import _ from 'lodash'

export interface State {
	tabValue: number
	segmentIds: string[]
	productIds: string[]
}
export interface Action {
	tabValue?: { payload: number }
	segmentIds?: { payload: string[] }
	productIds?: { payload: string[] }
}
const initState: State = {
	tabValue: 0,
	segmentIds: [],
	productIds: [],
}
export const reducer = (state: State, action: Action) => {
	const newState = _.cloneDeep(state)

	if (action.tabValue) newState.tabValue = action.tabValue.payload
	if (action.segmentIds) newState.segmentIds = action.segmentIds.payload
	if (action.productIds) newState.productIds = action.productIds.payload

	return newState
}

export interface AppContextType {
	state: State
	dispatch: React.Dispatch<Action>
}
const AppContext = React.createContext({} as AppContextType)
export const useAppContext = () => React.useContext(AppContext)

const AppContextProvider: React.FC = ({ children }) => {
	const [state, dispatch] = React.useReducer(reducer, initState)
	return (
		<AppContext.Provider value={{ state, dispatch }}>
			{children}
		</AppContext.Provider>
	)
}
export default AppContextProvider
