import {View,Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

export default function Credit( ) {
    // React.useLayoutEffect(() => {
    //     navigation.setOptions({
    //         headerLeft: () => (
    //             <HeaderButtons>
    //                 <Item title="Menu" iconName="ios-menu" onPress={() => navigation.toggleDrawer()} />
    //             </HeaderButtons>
    //         ),
    //     });
    // }, [navigation]);
    return (
        <View>
        <Text>Credit</Text>
        </View>
    );
}