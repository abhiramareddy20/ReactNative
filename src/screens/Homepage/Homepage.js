import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import textInApp from '../../../textInApp.json';
import {BASE_URL, Token} from '../../utils/BaseURL';
import axios from 'axios';
import {FlatList} from 'react-native-gesture-handler';
import {scale, DEVICE_HEIGHT, DEVICE_WIDTH} from '../../utils/scaling';
import netinfo from '@react-native-community/netinfo';
import Navigation from '../../navigation/Navigation';

const Homepage = ({navigation}) => {
  const [tabName, setTabName] = useState();
  const [currentTab, setCurrentTab] = useState(0);
  const [listTab, setlistTab] = useState([]);
  const [AllProducts, setAllProducts] = useState([]);
  const [withoutFilter, setwithoutFilter] = useState([]);
  const [loader, setLoader] = useState(true);
  const [tabData, settabData] = useState([]);

  useEffect(() => {
    netinfo.fetch().then(res => {
      if (res.isConnected) {
        getCategories();
        getProducts();
      } else {
        alert('No internet connection');
      }
    });
  }, [currentTab]);

  const getProducts = () => {
    setLoader(true);
    var url = BASE_URL + '/api/products';

    axios({
      url: url,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    })
      .then(res => {
        if (currentTab == 0) {
          setAllProducts(res.data.products);
        } else {
          var filteredArray = res.data.products.filter(function (itm) {
            return itm.category.indexOf(tabName.name) > -1;
          });
          setAllProducts(filteredArray);
        }
        setLoader(false);
        console.log(res.data, 'Products');
      })
      .catch(err => {
        console.log(err), setLoader(false);
      });
  };

  const getCategories = async () => {
    const url = BASE_URL + '/api/categories/';
    axios({
      url: url,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    })
      .then(res => {
        var object = {name: 'All'};
        var newData = [object, ...res.data.categories];
        console.log(newData, 'list tab');
        setlistTab(newData);
        setLoader(false);
        settabData(res.data.categories);
        console.log(res);
      })
      .catch(err => {
        console.log(err, 'err'), setLoader(false);
      });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.heading}>{textInApp.HomePage.Header}</Text>
      <View style={styles.listTab}>
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
        <FlatList
          data={AllProducts}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'column',
                margin: 20,
                borderRadius: 20,
                backgroundColor: 'grey',
              }}
              onPress={() => {
                navigation.navigate('description', {selected: item});
              }}>
              <Image
                style={styles.imageThumbnail}
                source={{
                  uri: item.avatar,
                }}
                resizeMode="contain"
              />
              <View style={styles.textStyle}>
                <Text style={{color: 'white', fontSize: 16, padding: 10}}>
                  {item.name} {'\n\n'} ${item.price}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          numColumns={2}
          keyExtractor={(item, index) => index}
        />
      </View>
      <TouchableOpacity
        style={styles.float}
        onPress={() => navigation.replace('Addproducts', {tabData: tabData})}>
        <Text style={{fontSize: 20, alignSelf: 'center'}}>+</Text>
      </TouchableOpacity>
      {loader ? (
        <ActivityIndicator size={'large'} color="red" style={styles.loader} />
      ) : null}
    </SafeAreaView>
  );
};

export default Homepage;
