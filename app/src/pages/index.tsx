import * as React from 'react'
import useStyles from 'src/styles/indexPage'
import { useAppContext } from 'src/foundations/AppProvider'
import PageHead from 'src/layouts/PageHead'
import BreadCrumbs from 'src/components/BreadCrumbs'
import Typography from '@material-ui/core/Typography'
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined'

import CardCategory from 'src/components/CardCategory'

const IndexPage = () => {
	const classes = useStyles()
	const { dispatch } = useAppContext()

	// Switch header menu cursor
	React.useEffect(() => {
		dispatch({ tabValue: { payload: 0 } })
	}, [])

	return (
		<div className={classes.root}>
			<PageHead title="Top | Product Lineup" />
			<BreadCrumbs current="TOP" />
			<Typography
				variant="h5"
				component="h2"
				className={classes.title}
				gutterBottom>
				商品マスタ 👋
			</Typography>
			<Typography
				variant="h6"
				component="h3"
				color="textPrimary"
				className={classes.subtitle}
				gutterBottom>
				<LocalOfferOutlinedIcon className={classes.icon} />
				ソリューションカテゴリ
			</Typography>
			<CardCategory />
			<Typography
				variant="h6"
				component="h3"
				color="textPrimary"
				className={classes.subtitle}
				gutterBottom>
				<LocalOfferOutlinedIcon className={classes.icon} />
				会社説明資料
			</Typography>
			<ul>
				<li>Gドライブへのリンクを貼る</li>
				<li>ダウンロード機能など</li>
			</ul>
			<Typography
				variant="h6"
				component="h3"
				color="textPrimary"
				className={classes.subtitle}
				gutterBottom>
				<LocalOfferOutlinedIcon className={classes.icon} />
				提案資料
			</Typography>
			<ul>
				<li>提案資料アップロード＆ビューワー</li>
				<li>ストレージはGドライブ？</li>
				<li>商品マスタと連動したタグ管理</li>
			</ul>
			<Typography
				variant="h6"
				component="h3"
				color="textPrimary"
				className={classes.subtitle}
				gutterBottom>
				<LocalOfferOutlinedIcon className={classes.icon} />
				コンテンツ募集中　👍
			</Typography>
		</div>
	)
}
export default IndexPage
