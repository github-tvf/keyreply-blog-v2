import './SignInForm.scss'
import { useFormik } from 'formik'
import { Form } from '@react-spectrum/form'
import { TextField } from '@react-spectrum/textfield'
import { Flex } from '@react-spectrum/layout'
import { Button } from '@react-spectrum/button'
import { Link } from '@react-spectrum/link'
import { Link as RouterLink } from 'react-router-dom'
import { signInUser } from '../../services/auth.service'
import { useState } from 'react'
import Cookies from 'js-cookie'

const SignInForm = () => {
	const [errors, setErrors] = useState<string[]>([])

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		onSubmit: async values => {
			try {
				const response = await signInUser(values)

				const { access_token } = response
				Cookies.set('access_token', access_token)
				window.location.href = ''
			} catch (error: any) {
				const errorResponse = await error.response.json()
				setErrors(errorResponse.message)
			}
		},
	})
	return (
		<div className='signin-form'>
			<h1 className='signin-form__title'>Sign in</h1>
			<span className='signin-form__message'>
				New user?{' '}
				<Link>
					<RouterLink to='/auth/signup'>Create an account</RouterLink>
				</Link>
			</span>
			{errors[0] && <div className='signup-form__error'>{errors[0]}</div>}
			<Form
				onSubmit={e => {
					e.preventDefault()
					formik.handleSubmit()
				}}
				marginTop='size-300'
				isQuiet
				minWidth='size-4600'>
				<TextField
					value={formik.values.email}
					onChange={value => formik.setFieldValue('email', value)}
					label='Email address'
				/>
				<TextField
					value={formik.values.password}
					onChange={value => formik.setFieldValue('password', value)}
					type='password'
					label='Password'
				/>
				<Flex marginTop='size-500' justifyContent='end'>
					<Button type='submit' width='size-1200' variant='cta'>
						Sign in
					</Button>
				</Flex>
			</Form>
		</div>
	)
}

export default SignInForm
