import { GetStaticProps, GetStaticPaths } from 'next'
import ListDetail from 'src/components/ListDetail'
import axios from 'src/foundations/axios'
import { Category } from '@prisma/client'

type Props = {
	category?: Category
	errors?: string
}

const StaticPropsDetail = ({ category, errors }: Props) => {
	if (errors) {
		return (
			<p>
				<span style={{ color: 'red' }}>Error:</span> {errors}
			</p>
		)
	}
	return <>{category && <ListDetail category={category} />}</>
}

export default StaticPropsDetail

/**
 * SSGのビルド時のみ呼ばれるライフサイクル
 *  -- `getStaticProps`より前に実行される
 *  -- 対応する動的パラメータを配列で渡す
 */
export const getStaticPaths: GetStaticPaths = async () => {
	// Get the paths we want to pre-render based on users
	const res = await axios.get<Category[]>('/category')
	const data = res.data
	const paths = data.map((d) => {
		return {
			params: { id: String(d.id) },
		}
	})

	// We'll pre-render only these paths at build time.
	// { fallback: false } means other routes should 404.
	return { paths, fallback: false }
}

/**
 * SSGビルド時のみ呼ばれるライフサイクル
 *  -- `getStaticPaths`より後に実行される
 *  -- 引数には動的パラメータを含むコンテキストが渡される
 * @param params
 */
export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const id = params?.id
		const res = await axios.get<Category>(`/category/${id}`)
		const category = res.data
		// By returning { props: item }, the StaticPropsDetail component
		// will receive `item` as a prop at build time
		return { props: { category } }
	} catch (err) {
		return { props: { errors: err.message } }
	}
}
