import * as React from 'react'
import { Category } from '@prisma/client'

type ListDetailProps = {
	category: Category
}

const ListDetail = ({ category }: ListDetailProps) => (
	<div>
		<h1>Detail for {category.name}</h1>
		<p>ID: {category.id}</p>
	</div>
)

export default ListDetail
