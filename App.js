import React, { Component } from 'react';

import {
    Text,
    Alert,
    View,
    Dimensions,
} from 'react-native';

import Carousel, { Pagination } from 'react-native-snap-carousel';

import styles from './style.js'

export default class App extends Component {
    constructor(props) {
        super(props)

        let window = Dimensions.get('window');

        this.state = {
            content: [],
            height: window.height,
            width: window.width,
        }
    }

    dimensionsChanged = ({ window }) => {
        this.setState({
            dimension: window,
            height: window.height,
            width: window.width
        });
    }

    async componentDidMount() {
        try {
            await fetch('https://15euros.nl/api/bier_basic.php')
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        content: responseJson
                    });

                    this.contentArray = responseJson;
                });
        }
        catch {
            Alert.alert(
                'Connection Failed',
                'There is an error occured, try again later',
                [
                    { text: 'OK' }
                ]
            );
        }
    }

    carouselRenderItem = ({ item }) => {
        return (
            <View style={styles.carousel_item_container}>
                <View>
                    <Text>
                        ID: {item.id}
                    </Text>
                    <Text>
                        Naam: {item.naam}
                    </Text>
                    <Text>
                        Brouwer: {item.brouwer}
                    </Text>
                    <Text>
                        Type: {item.type}
                    </Text>
                    <Text>
                        Gisting: {item.gisting}
                    </Text>
                    <Text>
                        Percentage: {item.perc}%
                    </Text>
                    <Text>
                        Inkoop Prijs: €{item.inkoop_prijs}
                    </Text>
                </View>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                    <View>
                        <View style={styles.carousel_container}>
                            <Carousel
                                data={this.state.content}
                                renderItem={this.carouselRenderItem}
                                onSnapToItem={index => {
                                    this.setState({
                                        activeSlide: index
                                    });
                                }}
                                keyExtractor={item => item.id}
                                ref={(c) => { this._carousel = c; }}
                                contentContainerCustomStyle={styles.contentContainerCustomStyle}
                                sliderWidth={this.state.width}
                                itemWidth={this.state.width / 1.3}
                            />

                            <Pagination
                                dotsLength={12}
                                activeDotIndex={this.state.activeSlide}
                                dotStyle={styles.pagination_dotStyle}
                                inactiveDotStyle={styles.pagination_inactiveDotStyle}
                                inactiveDotOpacity={0.4}
                                inactiveDotScale={0.6}
                            />
                        </View>
                    </View>
            </View>
        );
    }
}
