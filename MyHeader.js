import React, { Component} from 'react';
import { Header,Icon,Badge } from 'react-native-elements';
import { View, Text, StyeSheet ,Alert} from 'react-native';
import db from '../config';

export default class MyHeader extends Component{
  constructor(props){
super(props)
this.state={
  value :''
}
  }
BellIconWithBadges=()=>{
  return(
    <View>
       <Icon name='bell' type='font-awesome' color='#696969' size={25}
          onPress={() =>this.props.navigation.navigate('Notification')}/>
          <Badge value={this.state.value}
          containerStyle={{position: 'absolute',top:-4 ,right:-4}}/>
      </View>
  )
}

//function will get the notifications from database
getNumberOfUnreadNotifications(){
  db.collection('all_notifications').where("notification_status","==",'unread')
  .onSnapshot((snapshot)=>{
    var unreadNotifications= snapshot.doc.map((doc)=>doc.data())
    this.setState({
      value:unreadNotifications.length
    })
  })
}
componentDidMount(){
  this.getNumberOfUnreadNotifications()
}

render(){
  return (
   
    <Header
    leftComponent={<Icon name='bars' type='font-awesome' color='black' onPress={()=>props.navigation.toggleDrawer()}/>}
      centerComponent={{ text: props.title, style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
      rightComponent={<this.BellIconWithBadges{...this.props}/>}
      backgroundColor = "#eaf8fe"
    />
  );
};
}
export default MyHeader;