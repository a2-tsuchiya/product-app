import * as React from 'react'
import _ from 'lodash'
import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'

import { useAppContext } from 'src/foundations/AppProvider'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Segment } from '@prisma/client'

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'flex-start',
		flexWrap: 'wrap',
		listStyle: 'none',
		padding: theme.spacing(0.5),
		margin: 0,
	},
	chip: {
		margin: theme.spacing(0.5),
	},
}))

interface ChipsProps {
	segments: Segment[]
}

const ChipsSegment: React.FC<ChipsProps> = ({ segments }) => {
	const classes = useStyles()
	const { state, dispatch } = useAppContext()

	const handleClick = (chipData: Segment) => {
		// If IDs in State, Delete it, if not, Add it
		const { segmentIds } = state
		if (segmentIds.find((id) => id === chipData.id)) {
			dispatch({
				segmentIds: {
					payload: segmentIds.filter((id) => id !== chipData.id),
				},
			})
		} else {
			segmentIds.push(chipData.id)
			dispatch({ segmentIds: { payload: segmentIds } })
		}
	}
	const handleClickAll = () => {
		const all = segments.map((item) => item.id)
		if (state.segmentIds.length == segments.length) {
			dispatch({ segmentIds: { payload: [] } })
		} else {
			dispatch({ segmentIds: { payload: all } })
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
					label="ALL/CLEAR"
					color="secondary"
					className={classes.chip}
					onClick={handleClickAll}
				/>
			</li>
		</Paper>
	)
}
export default ChipsSegment
