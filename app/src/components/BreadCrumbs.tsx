import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Typography from '@material-ui/core/Typography'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import HomeIcon from '@material-ui/icons/Home'

interface IBreadCrumbs {
	current: string
}
type Obj = {
	[key: string]: string
}
const BreadMap: Obj = {
	'': 'TOP',
	ad: '広告代理',
}

// すごく微妙。。
const BreadCrumbs: React.FC<IBreadCrumbs> = ({ current }) => {
	const router = useRouter()
	const paths = router.pathname.split('/')

	return (
		<Breadcrumbs aria-label="breadcrumb">
			<HomeIcon />
			{paths.map((path, index) => {
				if (index !== paths.length - 1) {
					return (
						<Link key={path} href={`/${path}`}>
							{BreadMap[path]}
						</Link>
					)
				} else {
					return (
						<Typography key={path} color="textPrimary">
							{current}
						</Typography>
					)
				}
			})}
		</Breadcrumbs>
	)
}
export default BreadCrumbs
