interface ICategoryMap {
	name: string
	href: string
}
const categoryMap: ICategoryMap[] = [
	{
		name: 'TOP',
		href: '/',
	},
	{
		name: '広告代理',
		href: '/ad',
	},
	{
		name: 'WEB制作',
		href: '/web',
	},
	{
		name: 'CRM',
		href: '/crm',
	},
	{
		name: 'システム開発',
		href: '/system',
	},
	// {
	// 	name: 'SAMPLE',
	// 	href: '/sample',
	// },
	// {
	// 	name: 'ABOUT',
	// 	href: '/about',
	// },
]
export default categoryMap
