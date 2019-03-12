import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { QRreader } from 'react-native-qr-scanner';
import ImagePicker from 'react-native-image-picker';
// import bip39 from 'react-native-bip39'
import PBKDF2 from 'react-native-pbkdf2'

export default class ScanScreen extends Component {
    // static generateMnemonic = async () => {
    //     try {
    //       return await bip39.generateMnemonic(256);
    //     } catch(e) {
    //       return false;
    //     }
    //   }
      
    componentWillMount() {
        console.disableYellowBox = true;
        PBKDF2.derivationKey('P4S5W0RD', '032145', 10000)
        .then((derivationKey) => console.log('derivationKey : ' + derivationKey))
        .catch((err) => console.log(err))

        // console.log(ScanScreen.generateMnemonic);

        // if(bip39.validateMnemonic(myMnemonic)) {
        //     const mnemonic = bip39.entropyToMnemonic('133755ff');
        //     bip39.mnemonicToEntropy(mnemonic);
        // }
      }
    
    onSuccess = (data) => {
        console.log(data);

        this.props.navigation.navigate('ScannerDetail',{data: data.data});
        setTimeout(()=>{
            if(this.scanner){
                this.scanner.reactivate()
            }
        },2000);
    };

    openPhoto(){
        console.log('ImagePicker');
        ImagePicker.launchImageLibrary({}, (response) => {
          console.log('Response = ', response);
        
          if (response.didCancel) {
            console.log('User cancelled image picker');
          }
          else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          }
          else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          }
          else {
            if(response.uri){
              var path = response.path;
              if(!path){
                  path = response.uri;
              }
              QRreader(path).then((data)=>{
                  console.log(data);
                  
                this.props.navigation.navigate('ScannerDetail',{data});
                setTimeout(()=>{
                    if(this.scanner){
                        this.scanner.reactivate()
                    }
                },2000);
                }).catch((err)=>{
                  console.log(err);
                });
            }
          }
        });
    }
    
    render() {
        return (
            <QRCodeScanner
                ref={(node) => { this.scanner = node }}
                onRead={this.onSuccess.bind(this)}
                topContent={
                    <Text style={styles.centerText}>
                        scan the QR code.
                    </Text>
                }
                bottomContent={
                    <TouchableOpacity onPress={()=> this.openPhoto()} style={styles.buttonTouchable}>
                        <Text style={styles.buttonText}>Select image!</Text>
                    </TouchableOpacity>
                }
            />
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

