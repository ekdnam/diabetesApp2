import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    InteractionManager,
    TextInput,
    Alert,
    StyleSheet
} from 'react-native';
import {Sizes} from '@style/Sizes';
import {StyleTemplates} from '@style/Styles';
import {DataService} from '@measure/service/DataService';
import {DataServiceManager} from '@measure/DataServiceManager';
import Colors from '@style/Colors';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {ReduxAppState} from '@state/types';
import {setService} from '@state/settings/actions';
import {InitialLoadingIndicator} from '@components/pages/exploration/parts/main/InitialLoadingIndicator';
import {StackNavigationProp} from '@react-navigation/stack';
import {SettingsSteckParamList} from '@components/Routes';
import {resetAction} from '@state/exploration/interaction/actions';
import SQLite, { DatabaseParams } from 'react-native-sqlite-storage';
import { format, toDate } from 'date-fns'

interface Prop {
    navigation: StackNavigationProp<
        SettingsSteckParamList,
        'ServiceWizardModal'
    >;
    selectService: (key: string) => void;
    selectedServiceKey: string;
    text?: string;
}

interface State {
    services: ReadonlyArray<DataService>;
    isLoading: boolean;
    loadingMessage?: string;
    text?: string;
    userDate?: string
}

// TouchableOpacity.defaultProps = { activeOpacity: 0.8 };

// const AppButton = ({ onPress: any, title: any }) => (
//   <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
//     <Text style={styles.appButtonText}>{title}</Text>
//   </TouchableOpacity>
// );

class ServiceSelectionScreen extends React.Component<Prop, State> {
    constructor(props: Prop) {
        super(props);

        this.state = {
            services: [],
            isLoading: false,
            loadingMessage: null,
            text: '',
            userDate: ''
        };
    }

    async componentDidMount() {
        const supportedServices = await DataServiceManager.instance.getServicesSupportedInThisSystem();
        this.setState({
            ...this.state,
            services: supportedServices,
        });
    }

    render() {
        return (
            <SafeAreaView
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'stretch',
                }}>
                <TextInput
                    style = {{
                        // borderStartWidth : 2,
                        // borderEndWidth : 3,
                        // borderTopWidth : 1,
                        // borderLeftWidth : 2,
                        // borderRightWidth: 3,
                        // borderBottomWidth : 4,
                        // borderWidth : 1,
                        // borderColor : 'grey'
                        borderWidth : 1,
                        margin: 12,
                        height: 50,
                        padding: 10,
                        borderColor : '#183059',
                        borderRadius:8
                        }}
                    placeholder="Enter BG level here"
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                />
                <TouchableOpacity onPress={() => {
                        console.log(this.state.text);
                        var x = "Your BG level is " + this.state.text;
                        Alert.alert(x);
                        insertRecordToDB(this.state.text);
                    }} style={{
                        margin:12,
                        backgroundColor:'#276fbf',
                        padding:12,
                        borderRadius:10
                
                    }}>
                    <Text style={styles.appButtonText}>Submit</Text>
                </TouchableOpacity>
                <TextInput
                    style = {{
                        // borderStartWidth : 0,
                        // borderEndWidth : 0,
                        // borderTopWidth : 0,
                        // borderLeftWidth : 1,
                        // borderRightWidth: 3,
                        // borderBottomWidth : 4,
                        borderWidth : 1,
                        margin: 12,
                        height: 50,
                        padding: 10,
                        borderColor : '#183059',
                        borderRadius:8
                        }}
                    placeholder="Enter date here (YYYY-MM-DD)"
                    onChangeText={(userDate) => this.setState({userDate})}
                    value={this.state.userDate}
                />
                <TouchableOpacity onPress={() => {
                        console.log(this.state.userDate);
                        var x = "Your BG level is " + this.state.text;
                        var y = 'Your date: ' + this.state.userDate;
                        Alert.alert(x);
                        Alert.alert(y);
                        insertRecordToDBWithDate(this.state.text, this.state.userDate);
                    }} style={
                        {
                            margin:12,
                            backgroundColor:'#276fbf',
                            padding:12,
                            borderRadius:10
                    
                        }
                    }>
                    <Text style={styles.appButtonText}>Submit with Date</Text>
                </TouchableOpacity>
                {/* <ScrollView style={{ flex: 1 }}>
                    {
                        this.state.services
                            .map((service, index) => <ServiceElement
                                key={service.key}
                                index={index}
                                selectedAlready={
                                    this.props.selectedServiceKey === service.key
                                }
                                source={service}
                                onSelected={
                                    async () => {
                                        if (this.props.selectedServiceKey != service.key) {
                                            console.log("start loading")
                                            InteractionManager.runAfterInteractions(()=>{
                                                
                                            })
                                            requestAnimationFrame(()=>{
                                                this.setState({
                                                    ...this.state,
                                                    isLoading: true
                                                })
                                            })

                                            try {
                                                console.log("start activation of new service..")
                                                const activationResult = await DataServiceManager.instance.getServiceByKey(service.key).activateInSystem((progressInfo) => {
                                                    this.setState({
                                                        ...this.state,
                                                        loadingMessage: progressInfo.message
                                                    })
                                                })
                                                console.log("finished the activation of new service.")

                                                if (activationResult.success === true) {
                                                    //await DataServiceManager.instance.getServiceByKey(this.props.selectedServiceKey).deactivatedInSystem()

                                                    this.props.selectService(service.key)
                                                }
                                            } catch (err) {
                                                console.error("Failed to sign in to ", service.key, err)
                                            } finally {
                                                console.log("finish loading")
                                                this.setState({
                                                    ...this.state,
                                                    isLoading: false,
                                                    loadingMessage: null
                                                })
                                                this.props.navigation.goBack()
                                            }
                                        }
                                    }
                                } />)
                    }
                </ScrollView> */}
                {this.state.isLoading === true ? (
                    <InitialLoadingIndicator
                        loadingMessage={this.state.loadingMessage}
                    />
                ) : null}
            </SafeAreaView>
        );
    }
}

function openDB(): Promise<SQLite.SQLiteDatabase> {

    console.log("try open the database:", );

    _dbInitPromise = SQLite.openDatabase({ name: 'fitbit-local-cache.sqlite' })
      .then(db => {
        console.log("db opened.")
        return db
          .transaction(tx => {
          }).then(tx => db)
      })
    return _dbInitPromise
  }

 const insertRecordToDB = async (bgvalue: any) => {
    // await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 2, 20220215, 127, 2022]);
    // 'INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 2, 20220215, 127, 2022]);
    const todayDate = new Date();
    const dayOfWeek = todayDate.getDay();
    console.log(`dayOfWeek: ${dayOfWeek}| type: ${typeof(dayOfWeek)}`);
    const month = todayDate.getMonth();
    // console.log(typeof(month));
    console.log(`month: ${month}| type: ${typeof(month)}`);
    const numberedDate = parseInt(todayDate.toISOString().split('T')[0].replaceAll('-', ''));
    console.log(`numberedDate: ${numberedDate}| type: ${typeof(numberedDate)}`);
    const year = todayDate.getFullYear();
    console.log(`year: ${year}| type: ${typeof(year)}`);
    const bgValueAsNumber = parseInt(bgvalue);
    console.log(`bgValueAsNumber: ${bgValueAsNumber}| type: ${typeof(bgValueAsNumber)}`);
    await (await openDB()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ dayOfWeek, month, numberedDate, bgValueAsNumber, year])
    // await (await openDB()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 2, 20220320, 120, 2022])

    console.log('data inserted to database');
}

const insertRecordToDBWithDate = async (bgvalue: any, userDate: any) => {
    const dateSplits = userDate.split('-');
    const ourYear = parseInt(dateSplits[0]);
    const ourMonth = parseInt(dateSplits[1]);
    const ourDay = parseInt(dateSplits[2]);
    const ourDate = new Date(ourYear, ourMonth - 1, ourDay);
    console.log(ourDate);
    const dayOfWeek = ourDate.getDay();
    console.log(`dayOfWeek: ${dayOfWeek}| type: ${typeof(dayOfWeek)}`);
    const month = ourDate.getMonth();
    // console.log(typeof(month));
    console.log(`month: ${month}| type: ${typeof(month)}`);
    const numberedDate = parseInt(ourDate.toISOString().split('T')[0].replaceAll('-', ''));
    console.log(`numberedDate: ${numberedDate}| type: ${typeof(numberedDate)}`);
    const year = ourDate.getFullYear();
    console.log(`year: ${year}| type: ${typeof(year)}`);
    const bgValueAsNumber = parseInt(bgvalue);
    console.log(`bgValueAsNumber: ${bgValueAsNumber}| type: ${typeof(bgValueAsNumber)}`);
    await (await openDB()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ dayOfWeek, month, numberedDate, bgValueAsNumber, year])
    // await (await openDB()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 2, 20220320, 120, 2022])

    console.log('data inserted to database');
}

function mapStateToPropsScreen(appState: ReduxAppState, ownProps: Prop): Prop {
    return {
        ...ownProps,
        selectedServiceKey: appState.settingsState.serviceKey,
    };
}
const getTodayNew = () => {
    return new Date();
}
function mapDispatchToPropsScreen(dispatch: Dispatch, ownProps: Prop): Prop {
    return {
        ...ownProps,
        selectService: (key: string) => {
            dispatch(setService(key));
            dispatch(
                resetAction(
                    getTodayNew(),
                ),
            );
        },
    };
}

const connectedServiceSelectionScreen = connect(
    mapStateToPropsScreen,
    mapDispatchToPropsScreen,
)(ServiceSelectionScreen);
export {connectedServiceSelectionScreen as ServiceSelectionScreen};

interface ServiceElementProps {
    source: DataService;
    index: number;
    selectedAlready: boolean;
    onSelected(): void;
}

const ServiceElement = (props: ServiceElementProps) => {
    return (
        <TouchableOpacity
            disabled={props.selectedAlready}
            style={{
                marginTop: 24,
                marginRight: 20,
                marginLeft: 20,
            }}
            activeOpacity={0.3}
            onPress={async () => {
                props.onSelected();
            }}>
            <View>
                <ImageBackground
                    style={{
                        justifyContent: 'center',
                        alignSelf: 'stretch',
                        alignItems: 'center',
                        aspectRatio: 2.5 / 1,
                        opacity: props.selectedAlready === true ? 0.5 : 1,
                    }}
                    imageStyle={{borderRadius: 12}}
                    source={props.source.thumbnail}>
                    <Text
                        style={{
                            ...(StyleTemplates.titleTextStyle as any),
                            fontSize: 36,
                            alignContent: 'center',
                            fontWeight: '600',
                            color: Colors.WHITE,
                        }}>
                        {props.source.name}
                    </Text>
                </ImageBackground>
                {props.selectedAlready === true ? (
                    <View
                        style={{
                            position: 'absolute',
                            right: 12,
                            top: 8,
                            backgroundColor: Colors.accent,
                            borderRadius: 12,
                            padding: 4,
                            paddingLeft: 8,
                            paddingRight: 8,
                        }}>
                        <Text
                            style={{
                                fontSize: Sizes.descriptionFontSize,
                                fontWeight: 'bold',
                                color: Colors.WHITE,
                            }}>
                            Already Selected
                        </Text>
                    </View>
                ) : (
                    <></>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
      flex: 1,
      justifyContent: "center",
      padding: 16
    },
    appButtonContainer: {
      elevation: 8,
      backgroundColor: "#009688",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12
    },
    appButtonText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    }
  });