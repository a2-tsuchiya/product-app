import * as React from 'react'
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

export interface ExtendSegment extends Segment {
	color: 'default' | 'primary' | 'secondary'
}
export interface ChipsProps {
	segments: Segment[]
}

const ChipsSegment: React.FC<ChipsProps> = ({ segments }) => {
	const classes = useStyles()
	const { state, dispatch } = useAppContext()

	const handleClick = (chipData: Segment) => {
		const newChips = state.segments.map((chip) => {
			if (chip.id == chipData.id) {
				if (chip.color === 'default') chip.color = 'primary'
				else chip.color = 'default'
			}
			return chip
		})
		dispatch({ segments: { payload: newChips } })
	}

	React.useEffect(() => {
		const chips: ExtendSegment[] = segments.map((item) => {
			return {
				...item,
				color: 'default',
			}
		})
		dispatch({ segments: { payload: chips } })
	}, [segments])

	return (
		<Paper component="ul" className={classes.root}>
			{state.segments.map((item) => {
				return (
					<li key={item.id}>
						<Chip
							label={item.name}
							color={item.color}
							onClick={() => handleClick(item)}
							className={classes.chip}
						/>
					</li>
				)
			})}
		</Paper>
	)
}
export default ChipsSegment
