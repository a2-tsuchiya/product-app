import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { signIn, signOut, useSession } from 'next-auth/client'

type Props = {
	children?: ReactNode
	title?: string
}

const SampleLayout = ({
	children,
	title = 'This is the default title',
}: Props) => {
	const [session, loading] = useSession()
	const handlerClickSignIn = () => signIn()
	const handlerClickSignOut = () => signOut()

	if (loading) return <div>Loading...</div>

	return (
		<div>
			<Head>
				<title>{title}</title>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width"
				/>
			</Head>
			<header>
				{session && (
					<>
						<nav>
							<Link href="/">
								<a>Home</a>
							</Link>{' '}
							|{' '}
							<Link href="/about">
								<a>About</a>
							</Link>{' '}
							|{' '}
							<Link href="/sample">
								<a>Category List</a>
							</Link>{' '}
							| <a href="/api/category">Users API</a>
						</nav>
						<hr />
						Signed in as {session.user.name}
						<br />
						<button onClick={handlerClickSignOut}>Sign Out</button>
					</>
				)}
				{!session && (
					<>
						Not signed in <br />
						<button onClick={handlerClickSignIn}>Sign in</button>
					</>
				)}
			</header>
			{session && <>{children}</>}
			<footer>
				<hr />
				<span>I'm here to stay (Footer)</span>
			</footer>
		</div>
	)
}

export default SampleLayout
