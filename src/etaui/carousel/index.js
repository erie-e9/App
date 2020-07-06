import React, {useState, useEffect, useRef} from 'react';
import {Animated, Dimensions} from 'react-native';
import styled from 'styled-components';
import ETACarouselItem from './item';
import carouselData from '@utils/carouselData.json';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const Root = styled.View`
  justify-content: center;
  align-items: center;
  background-color:  ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`;
const CarouselList = styled.FlatList`
`;
const DotCarousel = styled.View`
  flex-direction: row;
  justify-content: center;
  position: absolute;
  bottom: 5px;
`;
const Touchable = styled.TouchableWithoutFeedback`
`;
const TouchableWithoutFeedbackContainer = styled.View``;

const ETACarousel = ({posts, data, autoplay, time}) => {
  const navigation = useNavigation();
  const [dataList, setdataList] = useState([]);
  const scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX, width);
  let flatList = useRef(0);
  let timerID;

  useEffect(() => {
    setdataList(carouselData.data);
    if (autoplay) {
      infiniteScroll(dataList);
    } else {
      stopAutoPlay();
    }
  }, []);

  const infiniteScroll = (datalist) => {
    var numberOfData = posts.length;
    
    let scrollValue = 0;
    let scrolled = 0;

    timerID = setInterval(() => {
      scrolled++;
      if (scrolled < numberOfData) {
        scrollValue = scrollValue + 1;      
      } else {
        scrollValue = 0;
        scrolled = 0;
      }

      flatList.current.scrollToIndex({ animated: true, index: scrollValue ? scrollValue : 0 });
      // flatList.scrollView({animated: true, offset: scrollValue});
    }, time);
  };
  
  const stopAutoPlay = () => {
    if(timerID) {
      clearInterval(timerID);
      timerID = null
    }
  }

  const _onPressPromo = (selecteditem) => {
    console.log('_onPressPromo pressed:', selecteditem.title);
    
    navigation.navigate('PromotionScreen', {
      screen: 'MenuScreen',
      params: {
        name: selecteditem.title,
        promoitems: data,
        selectedItem: selecteditem
      }
    });
  };

  return (
    <Root>
      {dataList && dataList.length ? (
        <>
          <CarouselList
            ref={flatList}
            data={posts}
            keyExtractor={(item) => item._id.toString()}
            horizontal
            pagingEnabled
            snapToAlignment='center'
            scrollEventThrottle={16}
            decelerationRate='fast'
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {contentOffset: {x: scrollX}},
                },
              ],
              {
                useNativeDriver: !true,
                // isInteraction: false
              },
            )}
            renderItem={({item}) => (
              <Touchable onPress={() => _onPressPromo(item)}>
                <TouchableWithoutFeedbackContainer>
                  <ETACarouselItem key={item._id} item={item} />
                </TouchableWithoutFeedbackContainer>
              </Touchable>
            )}
          />
          <DotCarousel>
            {dataList.map((_, i) => {
              let opacity = position.interpolate({
                inputRange: [i - 1, i, i + 1],
                outputRange: [0.3, 1, 0.3],
                extrapolate: 'clamp',
              });

              return (
                <Animated.View
                  key={i}
                  style={{
                    opacity,
                    width: 7,
                    height: 7,
                    borderRadius: 3.5,
                    backgroundColor: '#595959',
                    margin: 5,
                    bottom: 5,
                  }}
                />
              );
            })}
          </DotCarousel>
        </>
      ) : null}
    </Root>
  );
};

export default React.memo(ETACarousel);
