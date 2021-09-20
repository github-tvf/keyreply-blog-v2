import './SignUpForm.scss'
import { useFormik } from 'formik'
import { Form } from '@react-spectrum/form'
import { TextField } from '@react-spectrum/textfield'
import { Flex } from '@react-spectrum/layout'
import { Button } from '@react-spectrum/button'
import { signUpUser } from '../../services/auth.service'
import { useState } from 'react'
import Cookies from 'js-cookie'
import { Link } from '@react-spectrum/link'
import { Link as RouterLink } from 'react-router-dom'

const SignUpForm = () => {
	const [errors, setErrors] = useState<string[]>([])

	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
		},
		onSubmit: async values => {
			try {
				const response = await signUpUser(values)

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
		<div className='signup-form'>
			<h1 className='signup-form__title'>Create an account</h1>
			<span className='signup-form__message'>
				Already have an account?{' '}
				<Link>
					<RouterLink to='/auth/signin'>Sign in</RouterLink>
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
				maxWidth='size-4600'>
				<TextField
					name='email'
					onChange={value => formik.setFieldValue('email', value)}
					value={formik.values.email}
					label='Email address'
				/>
				<Flex gap='size-150'>
					<TextField
						name='firstName'
						onChange={value => formik.setFieldValue('firstName', value)}
						value={formik.values.firstName}
						label='First name'
					/>
					<TextField
						name='lastName'
						onChange={value => formik.setFieldValue('lastName', value)}
						value={formik.values.lastName}
						label='Last name'
					/>
				</Flex>
				<TextField
					name='password'
					onChange={value => formik.setFieldValue('password', value)}
					value={formik.values.password}
					type='password'
					label='Password'
				/>
				<Flex marginTop='size-500' justifyContent='end'>
					<Button type='submit' width='size-1700' variant='cta'>
						Create account
					</Button>
				</Flex>
			</Form>
		</div>
	)
}

export default SignUpForm
