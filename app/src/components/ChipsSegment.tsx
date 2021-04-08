import * as React from 'react'
import _ from 'lodash'
import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'

import { useAppContext } from 'src/foundations/AppProvider'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Segment, Product } from '@prisma/client'

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
	segments: Segment[]
	products: Product[]
}

const ChipsSegment: React.FC<ChipsProps> = ({ segments, products }) => {
	const classes = useStyles()
	const { state, dispatch } = useAppContext()
	const [selected, setSelected] = React.useState<'default' | 'primary'>(
		'default'
	)

	/**
	 * If Segment ID in State, delete it, if not, add it.
	 * When delete Segment ID, delete Product IDs related to current Segment ID as well.
	 * @param chipData Clicked Segment
	 */
	const handleClick = (chipData: Segment) => {
		const { segmentIds } = state
		if (segmentIds.find((id) => id === chipData.id)) {
			// Delete Segment ID
			dispatch({
				segmentIds: {
					payload: segmentIds.filter((id) => id !== chipData.id),
				},
			})
			// Delete Product IDs related to current Segment ID
			const sorted = products.filter(
				(item) => item.segmentId === chipData.id
			)
			const ids = state.productIds.filter((id) => {
				if (!sorted.find((item) => item.id === id)) return id
			})
			dispatch({ productIds: { payload: ids } })
		} else {
			// Add Segment ID
			segmentIds.push(chipData.id)
			dispatch({ segmentIds: { payload: segmentIds } })
		}
	}
	/**
	 * Delete All Segment IDs, Product Ids.
	 */
	const handleClickAll = () => {
		const all = segments.map((item) => item.id)
		if (state.segmentIds.length == segments.length) {
			dispatch({ segmentIds: { payload: [] } })
			dispatch({ productIds: { payload: [] } })
			setSelected('default')
		} else {
			dispatch({ segmentIds: { payload: all } })
			setSelected('primary')
		}
	}

	return (
		<Paper component="ul" className={classes.root}>
			{segments.map((item) => {
				// Selected Segments
				let selected: 'primary' | 'default' = 'default'
				if (state.segmentIds.find((id) => id === item.id))
					selected = 'primary'
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
