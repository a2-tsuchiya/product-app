import * as React from 'react'
import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'

import { useAppContext } from 'src/foundations/AppProvider'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Product } from '@prisma/client'

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'flex-start',
		flexWrap: 'wrap',
		listStyle: 'none',
		padding: theme.spacing(1),
		margin: 0,
	},
	chip: {
		margin: theme.spacing(0.5),
	},
}))

interface ChipsProps {
	products: Product[]
}

const ChipsSegment: React.FC<ChipsProps> = ({ products }) => {
	const classes = useStyles()
	const { state, dispatch } = useAppContext()
	const [selected, setSelected] = React.useState<'default' | 'primary'>(
		'default'
	)

	/**
	 * If Product ID in State, delete it, if not, add it
	 * @param chipData Clicked Product
	 */
	const handleClick = (chipData: Product) => {
		const { productIds } = state
		if (productIds.find((id) => id === chipData.id)) {
			// Delete Product ID
			dispatch({
				productIds: {
					payload: productIds.filter((id) => id !== chipData.id),
				},
			})
		} else {
			// Add Product ID
			productIds.push(chipData.id)
			dispatch({ productIds: { payload: productIds } })
		}
	}
	/**
	 * Select Product IDs related to selected Segment IDs
	 */
	const handleClickAll = () => {
		const sorted = products.filter((item) => {
			if (state.segmentIds.find((id) => id === item.segmentId))
				return item
		})
		const ids = sorted.map((item) => item.id)
		if (state.productIds.length === ids.length) {
			dispatch({ productIds: { payload: [] } })
			setSelected('default')
		} else {
			dispatch({ productIds: { payload: ids } })
			setSelected('primary')
		}
	}

	return (
		<Paper component="ul" className={classes.root}>
			{products.map((item) => {
				// Selected Produccts
				let selected: 'primary' | 'default' = 'default'
				if (state.productIds.find((id) => id === item.id)) {
					selected = 'primary'
				}
				// Selected Segments
				const segments = state.segmentIds.find(
					(id) => id === item.segmentId
				)
				// if (item.primaryFlag && segments) {
				if (segments) {
					return (
						<li key={item.id}>
							<Chip
								label={item.name}
								color={selected}
								onClick={() => handleClick(item)}
								className={classes.chip}
							/>
						</li>
					)
				}
			})}
			<li key="all">
				<Chip
					label="全選択/クリア"
					color={selected}
					className={classes.chip}
					onClick={handleClickAll}
				/>
			</li>
		</Paper>
	)
}
export default ChipsSegment
