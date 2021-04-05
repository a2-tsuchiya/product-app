import * as React from 'react'
import _ from 'lodash'
import { ExtendSegment } from 'src/components/ChipsSegment'
import { ExtendProduct } from 'src/components/ChipsProduct'

export interface State {
	tabValue: number
	segments: ExtendSegment[]
	products: ExtendProduct[]
}
export interface Action {
	tabValue?: { payload: number }
	segments?: { payload: ExtendSegment[] }
	products?: { payload: ExtendProduct[] }
}
const initState: State = {
	tabValue: 0,
	segments: [] as ExtendSegment[],
	products: [] as ExtendProduct[],
}
export const reducer = (state: State, action: Action) => {
	const newState = _.cloneDeep(state)

	if (action.tabValue) newState.tabValue = action.tabValue.payload
	if (action.segments) newState.segments = action.segments.payload
	if (action.products) newState.products = action.products.payload
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
