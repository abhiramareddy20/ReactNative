import {Image, Text, View, SafeAreaView, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../utils/scaling';
import style from './styles';

const description = ({navigation, route}) => {
  useEffect(() => {
    console.log(route.params);
  }, []);

  return (
    <SafeAreaView>
      <Text style={style.header}>Item Description</Text>
      <Image
        source={{
          uri: route.params.selected.avatar,
        }}
        resizeMode="center"
        style={style.image}
      />

      <ScrollView style={{backgroundColor: 'black'}}>
        <View
          style={{
            justifyContent: 'space-between',
            margin: 10,
            flexDirection: 'row',
          }}>
          <Text style={{color: 'white', fontSize: 18}}>
            {route.params.selected.name}
          </Text>
          <Text style={{color: 'white', fontSize: 18}}>
            ${route.params.selected.price}
          </Text>
        </View>
        <Text style={{color: 'white', margin: 10}}>
          {route.params.selected.description}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default description;
