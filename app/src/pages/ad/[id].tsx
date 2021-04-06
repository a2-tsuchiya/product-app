import { GetStaticProps, GetStaticPaths } from 'next'
import axios from 'src/foundations/axios'
import { BujinessItem, SalesItem } from '@prisma/client'
import { Relation } from 'src/interfaces'

interface IAdDetail {
	bujinessItem: BujinessItem
	salesItems: SalesItem[]
}

const AdDetail: React.FC<IAdDetail> = (props) => {
	const { bujinessItem, salesItems } = props
	return (
		<>
			<h1>営業品目: {bujinessItem.name}</h1>
			<ul>
				{salesItems.map((item) => (
					<li key={item.id} value={item.id}>
						{item.name}
					</li>
				))}
			</ul>
		</>
	)
}
export default AdDetail

/**
 * SSG(静的レンダリング)するパスの一覧を設定し、ビルド時に静的HTMLを生成する
 * `getStaticProps`より前に実行され、paramsに入れて配列で渡す
 */
export const getStaticPaths: GetStaticPaths = async () => {
	const res = await axios.post<(BujinessItem & Relation)[]>(
		'/bujinessitems',
		{}
	)
	const data = res.data
	const paths = data.map((d) => {
		return {
			params: { id: String(d.id) },
		}
	})
	// console.log('paths', paths)
	return { paths, fallback: false }
}

/**
 * ビルド時に呼ばれるライフサイクル
 * `getStaticPaths`より後に実行され、paramsにデータが入る
 * @param param0
 * @returns
 */
export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const id = params?.id
		const res = await axios.get<BujinessItem & Relation>(
			`/bujinessitem/${id}`
		)
		const bujinessItem = res.data

		const res2 = await axios.post<SalesItem[]>('/salesitems', {
			bujinessItemId: id,
		})
		const salesItems = res2.data

		return { props: { bujinessItem, salesItems } }
	} catch (err) {
		return { props: { errors: err.message } }
	}
}
