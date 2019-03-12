import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Linking,
} from 'react-native';

export default class ScanScreen extends Component {

    onPress = (data) => {

        Linking
            .openURL(data)
            .catch(err => console.error('An error occured', err));
    };

    render() {
        const {navigation} = this.props;
        const data = navigation.state && navigation.state.params
            && navigation.state.params.data || null;
        return (
            <View>
                {data &&
                <TouchableOpacity style={styles.buttonTouchable} onPress={()=>this.onPress(data)}>
                    <Text style={styles.buttonText}>
                        {data}
                    </Text>
                </TouchableOpacity>
                ||
                <Text>No Data</Text>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777',
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)',
    },
    buttonTouchable: {
        padding: 16,
    },
});

