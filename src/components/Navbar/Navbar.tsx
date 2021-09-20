import { Button, Flex } from '@adobe/react-spectrum'
import { useContext } from 'react'
import Avatar from 'react-avatar'
import { useHistory } from 'react-router'
import { UserContext } from 'src/App'
import Container from '../Container'

import './Navbar.scss'

const Navbar: React.FC = ({ children }) => {
	const userContext = useContext(UserContext)
	const user = userContext.user

	const history = useHistory()

	return (
		<div className='navbar'>
			<Container size='small'>
				<Flex alignItems='center' justifyContent='space-between'>
					<div className='navbar__left-side'>
						<div onClick={() => history.push('/')} className='navbar__logo'>
							Medyum
						</div>
					</div>
					<div className='navbar__right-side'>
						{children}
						{user ? (
							<Avatar
								size={'35px'}
								color='black'
								name={`${user?.firstName} ${user?.lastName}`}
								round
							/>
						) : (
							<Button
								onPress={() => history.push('/auth/signin')}
								variant='cta'>
								Login
							</Button>
						)}
					</div>
				</Flex>
			</Container>
		</div>
	)
}

export default Navbar
