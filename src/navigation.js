import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './home';
import ScannerDetail from './scannerDetail';

const AppNavigator = createStackNavigator({
    Home,
    ScannerDetail
},{
    headerMode: 'none'
});

const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;
