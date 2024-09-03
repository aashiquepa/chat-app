import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Search from '../assets/icons/search.svg';
import {useChatStore, useEmployeeStore} from '../store/chatStore';
import {colors} from '../utils/colorManager';
import {DashBoardText} from '../utils/textManager';
import {commonStyles, textManger} from '../utils/textStyleManager';

export default function Home({navigation}) {
  const {getLastMessage} = useChatStore();
  const data = [
    {
      id: '75318592-1100-5bb4-86de-e9af24da10b6',
      name: 'Abhishek',
      recentMessage: 'hello',
      profilePic: '../assets/images/sample.png',
    },
    {
      id: '75318592-1100-5bb4-86de-e9af24da10b8',
      name: 'Arun',
      recentMessage: 'how are you ?',
      profilePic: '../assets/images/sample.png',
    },
    {
      id: '75318592-1100-5bb4-86de-e9af24da10b7',
      name: 'Niranjan',
      recentMessage: 'where are you ?',
      profilePic: '../assets/images/sample.png',
    },
    {
      id: '75318592-1100-5bb4-86de-e9af24da10b9',
      name: 'Philip Manning',
      recentMessage: 'where are you ?',
      profilePic: '../assets/images/sample.png',
    },
    {
      id: '75318592-1100-5bb4-86de-e9af24da10b5',
      name: 'John Doe',
      recentMessage: 'hey there',
      profilePic: '../assets/images/sample.png',
    },
    {
      id: '75318592-1100-5bb4-86de-e9af24da10b4',
      name: 'Ram Manohar',
      recentMessage: 'test message',
      profilePic: '../assets/images/sample.png',
    },
    {
      id: '75318592-1100-5bb4-86de-e9af24da10b3',
      name: 'John Doe',
      recentMessage: 'test message',
      profilePic: '../assets/images/sample.png',
    },
    {
      id: '75318592-1100-5bb4-86de-e9af24da10b2',
      name: 'John Doe',
      recentMessage: 'test message',
      profilePic: '../assets/images/sample.png',
    },
    {
      id: '75318592-1100-5bb4-86de-e9af24ra10b5',
      name: 'John Luke',
      recentMessage: 'test message',
      profilePic: '../assets/images/sample.png',
    },
    {
      id: '75318592-1100-5bb4-86de-e9af24ra10b5',
      name: 'Isabella Austin',
      recentMessage: 'test message',
      profilePic: '../assets/images/sample.png',
    },
  ];
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.bg,
    },
    containe2: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.bg,
      padding: 20,
    },
    heading: {
      height: 60,
      backgroundColor: colors.primary,
      width: '100%',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    card: {
      backgroundColor: colors.white,
      padding: 10,
      width: '100%',
      alignSelf: 'center',
      // marginVertical: 10,
      // borderRadius: 10,
    },
    button: {
      marginVertical: 5,
      marginHorizontal: 10,
      borderRadius: 10,
      height: 50,
      backgroundColor: colors.primary,
      width: '90%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    searchButton: {
      width: '90%',
      alignItems: 'center',
      backgroundColor: colors.white,
      borderRadius: 10,
      height: 50,
      marginVertical: 10,
      flexDirection: 'row',
    },
    clear: {
      backgroundColor: colors.error,
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    justRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });
  const renderData = ({item}) => {
    console.log(getLastMessage(item.id));
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('chat', {item})}
        style={styles.card}>
        <View style={styles.justRow}>
          <View style={[commonStyles.row, commonStyles.centerView]}>
            <Image
              style={{width: 50, height: 50, borderRadius: 25}}
              v
              source={require('../assets/images/sample.png')}
            />
            <View>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={[textManger.heading_md, {width: 180, marginLeft: 5}]}>
                {item.name}
              </Text>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={[
                  textManger.heading_sm,
                  {width: 180, marginLeft: 5, color: colors.lightBlack},
                ]}>
                {getLastMessage(item.id).message}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const renderHeader = () => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={[textManger.heading_lg, {alignSelf: 'flex-start'}]}>
            {DashBoardText.dashHead}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('searchEmployee');
            }}>
            <Search marginHorizontal={20} />
          </TouchableOpacity>
        </View>
      </>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={renderHeader}
        ListHeaderComponentStyle={styles.heading}
        // ListFooterComponent={<View style={{height: 250}} />}
        data={data}
        renderItem={renderData}
        style={{width: '100%', flex: 1}}
      />
      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('addEmployee');
        }}>
        <Text style={textManger.heading_lg}>{DashBoardText.addemp}</Text>
      </TouchableOpacity> */}
    </View>
  );
}
