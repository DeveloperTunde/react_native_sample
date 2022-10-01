



import Header from '../components/HeaderInner';
import { CustomeStatusBar } from '../../../constants/CustomeStatusBar';

const AddAccount = ({navigation}) => {


    return (
        <View style={[styles.deposittwo_container_main]}>
            <CustomeStatusBar 
                   backgroundColor={Colors.background}
                   barStyle={'dark-content'}
                   
                 />
               <View style={styles.deposittwo_top_main}>
               <Header  navigation={navigation} isBackArrow={true} title="" />
                <View style={{width: '100%'}}>


                </View>
              </View>
                <View style={[styles.deposittwo_bottom_main]}>
                    <View style={styles.btn_container}>
                        <TouchableOpacity style={styles.btn_wrapper2} >
                            <Text style={styles.btn_text}>Add account </Text>
                        </TouchableOpacity>
                    </View>
            
               </View>
                              
     </View>
    );
};



export default AddAccount;
