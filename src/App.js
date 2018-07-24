import React, {Component} from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner,CardSection } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null };

  componentWillMount()
    {
      firebase.initializeApp({
    apiKey: 'AIzaSyBqRVd9JuooPrX_1SOywF1J14WGzRv9RIc',
    authDomain: 'auth-2d5c4.firebaseapp.com',
    databaseURL: 'https://auth-2d5c4.firebaseio.com',
    projectId: 'auth-2d5c4',
    storageBucket: 'auth-2d5c4.appspot.com',
    messagingSenderId: '406722043503'
  });

 //user 상태가 변할때마다 호출됨
  firebase.auth().onAuthStateChanged((user) =>{
    if(user){
      this.setState({ loggedIn: true });
    } else {
      this.setState({ loggedIn: false });
    }
  });
};

renderContent(){
  switch (this.state.loggedIn){
    case true:
        return(
        <CardSection>
          <Button onPress={()=> firebase.auth().signOut()}>
            Log out
          </Button>
        </CardSection>);
    case false:
      return <LoginForm />;
    case null:
      return <Spinner size ="large"/>;
  }
}

  render(){
    return(
      <View style ={styles.containerStyle}>
        <Header headerText="Authentification"/>
        {this.renderContent()}
      </View>
    );
  };
}
const styles = {
  containerStyle: {
    flex: 1,
  }
}

export default App;
