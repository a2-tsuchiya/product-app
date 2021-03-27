import * as React from 'react'
import ListItem from 'src/components/ListItem'
import { Category } from '@prisma/client'

type Props = {
	categories: Category[]
}

const List = ({ categories }: Props) => (
	<ul>
		{categories.map((category) => (
			<li key={category.id}>
				<ListItem data={category} />
			</li>
		))}
	</ul>
)

export default List
