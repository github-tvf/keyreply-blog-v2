import { Flex } from '@adobe/react-spectrum'
import SignUpForm from '../../components/SignUpForm'
import './SignUp.scss'

const SignUp: React.FC<any> = () => {
	return (
		<div className='signup-page'>
			<Flex
				alignItems='center'
				justifyContent='center'
				height='100%'
				gap='size-4600'>
				<div className='signup-page__logo-wrapper'>
					<h1>Medyum</h1>
					<h4>Sign in or create account</h4>
				</div>
				<SignUpForm />
			</Flex>
		</div>
	)
}

export default SignUp
