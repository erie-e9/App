import React, {useState, useContext, useRef, memo} from 'react'
import styled, {ThemeContext} from 'styled-components/native'
import {Platform} from 'react-native'
import {Animated, Easing} from 'react-native'
import {ETASimpleText} from '@etaui'

const Root = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    min-height: 20px;
    min-width: 40px;
	background-color: transparent;
`
const Radio = styled.View`
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	width: ${(props) => (props.sizeRadio ? props.sizeRadio : 30)}px;
	height: ${(props) => (props.sizeRadio ? props.sizeRadio : 30)}px;
	border-radius: ${(props) => (props.sizeRadio ? props.sizeRadio / 2 : 30 / 2)}px;
	border-width: 0.75px;
	border-color: ${(props) => props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
	margin: 0px 5px;
	z-index: 1000;
	background-color: ${(props) => (props.activated ? props.colorRadio : 'transparent' )};
`
const Touchable = styled.TouchableHighlight.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 25, bottom: 25, right: 25, left: 25}
})`
    flex-direction: row;
    justify-content: center;
`

const ETARadio = memo(({ sizeRadio, colorRadio, onChange, activated, text, sizeText, colorText }) => {
	const animation = useRef(new Animated.Value(activated ? 1 : 0)).current
	const [ toggled, setToggled ] = useState(!!activated)
	const themeContext = useContext(ThemeContext)
	const [ containerWidth ] = useState(0)
	console.log('[ETARadio] activated:', activated);

	const _switchAnimated = () => {
        // setToggled(!toggled)
        // console.log('ewe');
		// if (!toggled) {
		// 	Animated.timing(animation, {
		// 		duration: 100,
		// 		toValue: 1,
		// 		easing: Easing.materialUIStandard,
		// 		useNativeDriver: true,
		// 	}).start()
		// } else {
		// 	Animated.timing(animation, {
		// 		duration: 100,
		// 		toValue: 0,
		// 		easing: Easing.materialUIStandard,
		// 		useNativeDriver: true,
		// 	}).start()
		// }
	}

	return (
		<Root>
			<Touchable
				// onPress={() => {
				// 	onChange()
				// 	_switchAnimated()
                // }}
                onPress={onChange}
                >
                <>
                    <Radio 
                        activated={activated}
                        sizeRadio={sizeRadio}
                        colorRadio={colorRadio}
                        >
                        {/* <Animated.View
                            style={[
                                {
                                    height: 18,
                                    width: 18,
                                    borderRadius: 9,
                                    backgroundColor:
                                        color || '#333',
                                    justifyContent: 'center',
                                    bottom: 0.5,
                                    transform: [
                                        {
                                            translateX: animation.interpolate(
                                                {
                                                    inputRange: [
                                                        0,
                                                        1,
                                                    ],
                                                    outputRange: [
                                                        0,
                                                        containerWidth +
                                                            18.5,
                                                    ],
                                                },
                                            ),
                                        },
                                    ],
                                },
                            ]}
                        /> */}
                    </Radio>
                    <ETASimpleText
                        size={sizeText}
                        color={colorText}
                        weight='300'
                        align='left'>
                        {text}
                    </ETASimpleText>
                </>
			</Touchable>
		</Root>
	)
})

export default ETARadio
