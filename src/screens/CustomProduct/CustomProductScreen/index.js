import React from 'react'
import styled from 'styled-components/native'
import CustomProductComponent from '@components/CustomProduct/CustomProductComponent'

const Root = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`

const CustomProductScreen = () => (
	<Root>
		<CustomProductComponent />
	</Root>
)

export default CustomProductScreen