import { GetStaticProps, GetStaticPaths } from 'next'
import axios from 'axios'

interface IProductCategory {
	id: string
	name: string
	flg: boolean
}

const AdDetail = () => {
	return <h1>Hello, Ads</h1>
}
export default AdDetail

// /**
//  * SSG(静的レンダリング)するパスの一覧を設定し、ビルド時に静的HTMLを生成する
//  * `getStaticProps`より前に実行され、paramsに入れて配列で渡す
//  */
// export const getStaticPaths: GetStaticPaths = async () => {
// 	const res = await axios.get<IProductCategory[]>('/product/category')
// 	const data = res.data
// 	const paths = data.map((d) => {
// 		return {
// 			params: { id: String(d.id) },
// 		}
// 	})
// 	console.log('paths', paths)
// 	return { paths, fallback: false }
// }

// /**
//  * ビルド時に呼ばれるライフサイクル
//  * `getStaticPaths`より後に実行され、paramsにデータが入る
//  * @param param0
//  * @returns
//  */
// export const getStaticProps: GetStaticProps = async ({ params }) => {
// 	try {
// 		const id = params?.id
// 		// 商品区分をユニークで探せないと。。
// 		const res = await axios.get<IProductCategory>(`product/category/${id}`)
// 		const productCategory = res.data
// 		return { props: { productCategory } }
// 	} catch (err) {
// 		return { props: { errors: err.message } }
// 	}
// }
