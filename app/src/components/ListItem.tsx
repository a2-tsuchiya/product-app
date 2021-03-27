import React from 'react'
import Link from 'next/link'
import { Category } from '@prisma/client'

type Props = {
	data: Category
}

const ListItem = ({ data }: Props) => (
	<Link href="/sample/[id]" as={`/sample/${data.id}`}>
		<a>
			{data.id}: {data.name}
		</a>
	</Link>
)

export default ListItem
