// Libraries
import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, Keyboard, Image} from 'react-native';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

// Includes
import Colors from '../../constants/colors';

// Styles

const InputBox = ({onPress}) => {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState();

  return (
    <View
      style={{
        width: '100%',
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
      }}>
      <View
        style={{
          backgroundColor: 'white',
          width: '85%',
          borderRadius: 40,
          justifyContent: 'flex-end',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            marginBottom: 15,
            marginHorizontal: 15,
            justifyContent: 'space-between',
          }}>
          <FontAwesomeIcon name="comment" size={26} color="#FFCDD2" />
          <View
            style={{
              flex: 1,
              marginHorizontal: 10,
              justifyContent: 'flex-end',
            }}>
            {image ? (
              <View style={{paddingVertical: 5, flexDirection: 'row'}}>
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 10,
                    marginVertical: 10,
                  }}
                  source={{uri: image.uri}}
                />
                <TouchableOpacity
                  style={{paddingLeft: 5, paddingTop: 5}}
                  onPress={() => {
                    setImage(undefined);
                  }}>
                  <FontAwesomeIcon
                    name="close"
                    size={26}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
              </View>
            ) : null}

            <TextInput
              placeholder="Type a message"
              style={{fontSize: 17, padding: 0}}
              multiline
              maxLength={350}
              value={message}
              onChangeText={setMessage}
              onSubmitEditing={() => {
                onPress(message, image);
                setMessage('');
                setImage(undefined);
              }}
            />
          </View>

          <TouchableOpacity
            onPress={() =>
              launchImageLibrary({mediaType: 'photo'}, res => {
                console.log(res);
                if (!res.didCancel) setImage(res);
              })
            }>
            <FontAwesomeIcon
              name="image"
              size={26}
              color={Colors.primary}
              style={{marginRight: 5, marginLeft: 20}}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          alignItems: 'center',
          justifyContent: 'flex-end',
          opacity: message || image ? 1 : 0.5,
        }}>
        <TouchableOpacity
          onPress={() => {
            onPress(message, image);
            setMessage('');
            setImage(undefined);
            Keyboard.dismiss();
          }}
          disabled={message || image ? false : true}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.primary,
            borderRadius: 30,
            width: 60,
            height: 60,
          }}>
          <FontAwesomeIcon name="send" size={26} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InputBox;
