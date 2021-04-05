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
		padding: theme.spacing(0.5),
		margin: 0,
	},
	chip: {
		margin: theme.spacing(0.5),
	},
}))

export interface ExtendProduct extends Product {
	color: 'default' | 'primary' | 'secondary'
}
export interface ChipsProps {
	products: Product[]
}

const ChipsSegment: React.FC<ChipsProps> = ({ products }) => {
	const classes = useStyles()
	const { state, dispatch } = useAppContext()

	const handleClick = (chipData: Product) => {
		const newChips = state.products.map((chip) => {
			if (chip.id == chipData.id) {
				if (chip.color === 'default') chip.color = 'primary'
				else chip.color = 'default'
			}
			return chip
		})
		dispatch({ products: { payload: newChips } })
	}

	React.useEffect(() => {
		const chips: ExtendProduct[] = products.map((item) => {
			return {
				...item,
				color: 'default',
			}
		})
		dispatch({ products: { payload: chips } })
	}, [products])

	return (
		<Paper component="ul" className={classes.root}>
			{state.products.map((item) => {
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
