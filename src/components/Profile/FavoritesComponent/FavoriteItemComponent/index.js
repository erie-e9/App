import React, {useState, useContext, useEffect} from 'react'
import styled, {ThemeContext} from 'styled-components'
import {Platform, Dimensions} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {ETASimpleText} from '@etaui'
import {Ionicons} from '@icons'
import {connect} from 'react-redux'
import { TOOGLE_FAVORITE } from '@redux/profile/favorites/actions'
import {currencySeparator, truncateString} from '@functions'

const {width} = Dimensions.get('window')

const Root = styled.View`
	flex-direction: column;
	min-height: 80px;
	width: ${width}px;
`
const Item = styled.View`
	flex: 1;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	min-height: 50px;
	padding-horizontal: 5px;
	shadow-color: ${(props) => props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
	shadow-offset: 2px 3px;
	shadow-radius: 2px;
	shadow-opacity: 0;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const ItemImage = styled.Image`
	height: 60px;
	width: 60px;
	border-radius: 5px;
	margin-left: 5px;
`
const FavoriteItemData = styled.View`
	flex: 1;
	flex-direction: column;
	margin-left: 15px;
	align-items: flex-start;
	justify-content: center;
	background-color: transparent;
`
const FavoriteItemHeadContainer = styled.View`
	min-height: 30px;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 5px 5px 0px 5px;
	background-color: transparent;
`
const PriceContainer = styled.View`
	flex: 0.4;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	padding: 0px 5px 0px 5px;
	background-color: transparent;
`
const FavoriteTitleContainer = styled.View`
	flex: 1;
	align-items: flex-start;
	background-color: transparent;
`
const CardItemFunctions = styled.View`
	flex: 0.5;
	align-items: flex-end;
	justify-content: center;
	margin: 0px 10px 10px 0px;
	background-color: transparent;
`
const Touchable = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 25, bottom: 25, right: 25, left: 25}
})`
	min-height: 25px;
	min-width: 25px;
`
const FavoriteItemContainer = styled.View`
	flex-direction: row;
	width: 100%;
	background-color: transparent;
`
const FavoriteItemLeftContainer = styled.View`
	flex: 0.9;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	padding-horizontal: 2px;
	background-color: transparent;
`
const DescriptionContainer = styled.View`
	width: 100%;
	justify-content: center;
	align-items: center;
	z-index: 100;
	border-width: 0px;
	padding-horizontal: 5px;
	padding-vertical: 3px;
	border-color: white;
	border-top-left-radius: 4px;
	border-top-right-radius: 4px;
	border-bottom-left-radius: 4px;
	border-bottom-right-radius: 4px;
	background-color: transparent;
`
const FavoriteItemRightContainer = styled.View`
	flex: 0.1;
	align-items: center;
	justify-content: center;
	margin: 0px 10px 0px 0px;
	padding-horizontal: 2px;
	background-color: transparent;
`
const AddFavoriteContainer = styled.View`
	flex: 0.5;
	flex-direction: row;
	align-items: flex-end;
	justify-content: center;
	margin: 0px 10px 10px 0px;
	padding-horizontal: 2px;
	position: absolute;
	border-radius: 20px;
	z-index: 1000;
`
const AddFavorite = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 25, bottom: 25, right: 25, left: 25}
})`
	flex-direction: row;
	height: 30px;
	width: 30px;
	padding-horizontal: 5px;
	z-index: 1000;
	justify-content: center;
	align-items: center;
	background-color: transparent;
`

const mapDispatchProps = (dispatch, props) => ({
	toogleFavorite: (paramItem) => {
		dispatch({
			type: TOOGLE_FAVORITE,
			payload: {
				paramItem,
			}
		})
	},
})

const FavoriteItemComponent = ({toogleFavorite,	item, howMany }) => {
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()
	const [addedCounter, setaddedCounter] = useState()

	useEffect(() => {
		setaddedCounter(howMany)
	}, [howMany])

	const _addFavorite = (paramItem) => {
		setaddedCounter(addedCounter + 1)
		toogleFavorite(paramItem)
	}

	const _removeFromFavorite = (_id) => {
		setaddedCounter(addedCounter - 1)
		removeFromFavorite(_id)
	}

	const _removeItemFromFavorite = (_id) => {
		removeItemFromFavorite(_id)
	}

	const _onPressItem = (propitem) => {
		navigation.navigate('GetOneItemNavigator', {
			screen: 'GetOneItemScreen',
			params: {
				item: propitem,
			},
		})
	}

	return (
		<Root>
			<Item>
				<Touchable onPress={() => _onPressItem(item)}>
					<ItemImage source={{uri: item.images[0].image}} />
				</Touchable>
				<FavoriteItemData>
					<FavoriteItemHeadContainer>
						<FavoriteTitleContainer>
							<ETASimpleText
								size={13}
								weight={
									Platform.OS ===
									'ios'
										? '400'
										: '800'
								}
								color={
									themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
								}
								align='left'>
								{item.name}
							</ETASimpleText>
						</FavoriteTitleContainer>
						<CardItemFunctions>
							<PriceContainer>
								<ETASimpleText
									size={13}
									weight={
										Platform.OS ===
										'ios'
											? '500'
											: '400'
									}
									color={
										themeContext.PRIMARY_COLOR
									}
									align='center'
									style={{
										zIndex: 100,
									}}>
									$
									{currencySeparator(
										(
											(100 -
												item.discount) *
											(item.price /
												100) 
										).toFixed(2),
									)}
								</ETASimpleText>
							</PriceContainer>
						</CardItemFunctions>
					</FavoriteItemHeadContainer>
					<FavoriteItemContainer>
						<FavoriteItemLeftContainer>
							<DescriptionContainer>
								<ETASimpleText
									size={11}
									weight={
										Platform.OS ===
										'ios'
											? '400'
											: '300'
									}
									color={
										themeContext.PRIMARY_TEXT_COLOR_LIGHT
									}
									align='left'
									style={{
										zIndex: 100,
									}}>
									{truncateString(item.details, 70)}
								</ETASimpleText>
							</DescriptionContainer>
						</FavoriteItemLeftContainer>
						<FavoriteItemRightContainer>
							<AddFavoriteContainer>
								<AddFavorite
									onPress={() =>
										_addFavorite(
											item,
										)
									}>
									<Ionicons
										name='md-heart'
										size={20}
										color={themeContext.PRIMARY_COLOR}
									/>
								</AddFavorite>
							</AddFavoriteContainer>
						</FavoriteItemRightContainer>
					</FavoriteItemContainer>
				</FavoriteItemData>
			</Item>
		</Root>
	)
}

const FavoriteItemComponentConnect = connect(
	null,
	mapDispatchProps,
)(FavoriteItemComponent)

export default React.memo(FavoriteItemComponentConnect)