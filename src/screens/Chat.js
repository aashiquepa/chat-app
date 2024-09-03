import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Back from '../assets/icons/back1.svg';
import MoreOption from '../assets/icons/options.svg';
import Add from '../assets/icons/plus.svg';
import Send from '../assets/icons/send.svg';
import {colors} from '../utils/colorManager';
import {textManger} from '../utils/textStyleManager';
import {useChatStore} from '../store/chatStore';
import Animated, {
  LightSpeedInLeft,
  LightSpeedInRight,
  LightSpeedOutLeft,
} from 'react-native-reanimated';

const Chat = ({route, navigation}) => {
  const data = route.params.item;
  const {getChatMessages, addMessage} = useChatStore();
  const flatListRef = useRef(null);

  const [details, setDetails] = useState({
    text: '',
    cameraModal: false,
    callModal: false,
  });

  const sendMessage = text => {
    if (text != undefined && text.trim()) {
      setDetails({...details, text: ''});
      const randomId =
        Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
      addMessage(data.id, {
        id: randomId,
        name: 'ram',
        message: text,
        isUser: true,
      });

      //   flatListRef.current?.scrollToEnd({animated: true});
      setTimeout(() => {
        sampleText();
      }, 1000);
    }
  };
  const sampleText = () => {
    const sampleMessages = [
      'Hello, how are you?',
      "What's up?",
      'Do you need help with something?',
      "How's your day going?",
      'Can I assist you with anything?',
    ];

    const randomMessage =
      sampleMessages[Math.floor(Math.random() * sampleMessages.length)];
    const randomId =
      Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
    addMessage(data.id, {
      id: randomId,
      name: 'ram',
      message: randomMessage,
      isUser: false,
    });
  };
  const RenderHeader = () => {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Back />
          </TouchableOpacity>
          <Image
            style={{width: 50, height: 50, borderRadius: 25}}
            source={require('../assets/images/sample.png')}
          />
          <Text
            style={[
              textManger.heading_lg,
              {alignSelf: 'center', marginLeft: 5},
            ]}>
            {data.name}
          </Text>
          <View style={{flex: 1, alignItems: 'flex-end', alignSelf: 'center'}}>
            <MoreOption />
          </View>
        </View>
      </View>
    );
  };
  const renderData = ({item}) => {
    return (
      <Animated.View
        entering={item.isUser ? LightSpeedInRight : LightSpeedInLeft}
        style={[
          styles.messageContainer,
          {
            backgroundColor: item.isUser
              ? colors.lightBlack
              : colors.lightBlackSecondary,
            alignSelf: item.isUser ? 'flex-end' : 'flex-start',
            padding: 15,
            maxWidth: '90%',
            borderRadius: 10,
            marginHorizontal: 10,
            marginVertical: 5,
          },
        ]}>
        <Text style={[textManger.heading_sm, {color: colors.white}]}>
          {item.message}
        </Text>
      </Animated.View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <RenderHeader />
      </View>
      <FlatList
        ref={flatListRef}
        keyExtractor={(item, index) => index.toString()}
        inverted
        showsVerticalScrollIndicator={false}
        data={getChatMessages(data.id)}
        renderItem={renderData}
        style={{width: '100%', flex: 1}}
        ListEmptyComponent={
          <View style={styles.noMessage}>
            <Text style={[textManger.heading_md, {color: colors.lightBlack}]}>
              No Messages
            </Text>
          </View>
        }
      />
      <View style={styles.input}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center', padding: 5}}
          onPress={() => setDetails({...details, cameraModal: true})}>
          <Add />
        </TouchableOpacity>
        <View style={styles.inputArea}>
          <TextInput
            value={details.text}
            style={{color: colors.black}}
            onChangeText={value => setDetails({...details, text: value})}
            placeholderTextColor={colors.black}
            placeholder="Enter Message"
          />
        </View>
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => sendMessage(details.text)}>
          <Send />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bg,
  },
  heading: {
    height: 60,
    backgroundColor: colors.primary,
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  noMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '90%',
  },
  sendButton: {
    backgroundColor: colors.white,
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  inputArea: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  input: {
    backgroundColor: colors.primary,
    padding: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Chat;
