import React, {useState, useEffect} from 'react'
import styled from 'styled-components/native'
import {useNavigation} from '@react-navigation/native'
import addresses from '@utils/addresses.json'
import Card from './Card'

const Root = styled.View`
	flex: 1;
	flex-direction: column;
	background-color: ${(props) => props.theme.FOURTH_BACKGROUND_COLOR_LIGHT};
`
const AddressesList = styled.FlatList`
	flex-direction: column;
	padding: 10px 10px;
`
const Touchable = styled.TouchableOpacity``

const AddressesListComponent = () => {
	const navigation = useNavigation()
	const [items, setitems] = useState([])
	const [refresher, setrefresher] = useState(!true)

	useEffect(() => {
		setitems(addresses.data)
		_getData()
	}, [])

	const _onPress = (item) => {
		navigation.navigate('SettingsNavigator', {
			screen: 'MapAddressesScreen',
			params: {
				data: item,
			},
		})
	}

	const _getData = () => {
		setrefresher(true)
		setitems(addresses.data)
		setrefresher(!true)
	}

	return (
		<Root>
			<AddressesList
				contentContainerStyle={{
					alignSelf: 'stretch',
				}}
				data={items}
				keyExtractor={(item) => item._id.toString()}
				showsVerticalScrollIndicator={false}
				refreshing={refresher}
				onRefresh={() => _getData()}
				renderItem={({item}) => (
					<Touchable
						key={item._id}
						onPress={() => _onPress(item)}>
						<Card {...item} />
					</Touchable>
				)}
			/>
		</Root>
	)
}

export default AddressesListComponent
