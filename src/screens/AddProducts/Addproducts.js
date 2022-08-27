import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {DEVICE_WIDTH} from '../../utils/scaling';
import {BASE_URL, Token} from '../../utils/BaseURL';
import axios from 'axios';
import netInfo from '@react-native-community/netinfo';

const Addproducts = ({route, navigation}) => {
  const [productTitle, setproducttitle] = useState();
  const [price, setprice] = useState();
  const [desc, setDesc] = useState();
  const [image, setImage] = useState();
  const [listTab, setlistTab] = useState(route.params.tabData);
  const [tabName, setTabName] = useState(listTab[0].name);
  const [currentTab, setCurrentTab] = useState(0);

  var regexp =
    /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

  const Addproducts = () => {
    if (productTitle == null || productTitle == '') {
      alert('please fill all the details');
      return;
    } else if (price == null || price == '') {
      alert('please fill all the details');
      return;
    } else if (desc == null || desc == '') {
      alert('please fill all the details');
      return;
    } else if (image == null || image == '' || !regexp.test(image)) {
      alert('please enter a valid url');
      return;
    }
    netInfo.fetch().then(res => {
      res.isConnected ? APICall() : alert('No internet connection');
    });
  };

  const APICall = () => {
    const url = BASE_URL + '/api/products';

    axios({
      url: url,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${Token}`,
      },
      data: {
        Name: productTitle,
        Price: price,
        Category: tabName.name,
        Description: desc,
        Avatar: image,
        DeveloperEmail: 'abhiramareddy04@gmail.com',
      },
    })
      .then(res => {
        if (res.status == 200) {
          navigation.replace('Home');
          console.log(res.data);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <TextInput
          placeholder="product title"
          style={styles.textInput}
          onChangeText={txt => {
            console.log(txt);
            setproducttitle(txt);
          }}
        />
        <TextInput
          placeholder="price"
          style={styles.textInput}
          onChangeText={txt => {
            console.log(txt);
            setprice(txt);
          }}
          keyboardType="number-pad"
        />
        <TextInput
          placeholder="description"
          multiline
          style={[styles.textInput, {height: 200}]}
          onChangeText={txt => {
            console.log(txt);
            setDesc(txt);
          }}
        />
        <TextInput
          placeholder="image link"
          multiline
          style={[styles.textInput]}
          onChangeText={txt => {
            console.log(txt);
            setImage(txt);
          }}
        />
        <ScrollView
          contentContainerStyle={styles.scrollStyle}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          {listTab?.map((tab, tabIndex) => (
            <TouchableOpacity
              style={[
                styles.btntab,
                currentTab === tabIndex && styles.btnTabActive,
              ]}
              onPress={() => {
                setTabName(tab), setCurrentTab(tabIndex);
                console.log(tab);
              }}>
              <Text
                style={[
                  styles.texttab,
                  currentTab === tabIndex && styles.texttabActive,
                ]}>
                {tab.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            width: 150,
            alignSelf: 'center',
            borderRadius: 10,
            borderWidth: 2,
          }}
          onPress={() => {
            Addproducts();
          }}>
          <Text style={{alignSelf: 'center', padding: 10}}>Add product</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: DEVICE_WIDTH / 1.2,
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
    borderWidth: 2,
    margin: 10,
  },
  btnTabActive: {
    backgroundColor: '#7B91F8',
  },
  btntab: {
    flex: 1,
    height: 40,
    flexDirection: 'row',
    borderRadius: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  texttab: {
    fontSize: 16,
    color: '#90949E',
    paddingHorizontal: 15,
  },
  texttabActive: {
    color: 'white',
  },
  scrollStyle: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
});

export default Addproducts;
