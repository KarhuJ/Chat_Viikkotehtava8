import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { firestore,collection,addDoc,MESSAGES, serverTimestamp, query, onSnapshot } from './firebase/Config';
import { useState, useEffect } from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
import { convertFirebaseTimeStampToJS } from './helpers/Function';
import { orderBy } from 'firebase/firestore';



console.log(firestore);
export default function App() {
  const[message, setMessage] = useState([]);
  const[newMessage, setNewMessage] = useState("");

  const save = async () => {
    const docRef = await addDoc(collection(firestore, MESSAGES), {
      text: newMessage,
      created: serverTimestamp()
    }).catch (error=> console.error("Error adding document: ", error));

    setNewMessage("");
    console.log("Message saved")
  }

  useEffect(() => {
    const q = query(collection(firestore, MESSAGES), orderBy("created", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempMessages = []

      querySnapshot.forEach((doc) => {

        const messageObject = {
          id: doc.id,
          text: doc.data().text,
          created: convertFirebaseTimeStampToJS(doc.data().created)
        };
        tempMessages.push(messageObject);
      });
      setMessage(tempMessages);
    });
    return () => {
      unsubscribe();
    }
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {message.map((message) => (
          <View style={styles.message} key={message.id}>
            <Text style={styles.messageInfo}>{message.created}</Text>
            <Text>{message.text}</Text>
          </View>
        ))}
        </ScrollView>
      <TextInput style={styles.input} placeholder='Send message...' value = {newMessage} onChangeText={text => setNewMessage(text)} />
      <Button color="black" title="Send" type="button" onPress={save} />
      
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.StatusBarHeight,
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
  },
  message: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    textAlign: 'center',
  },
  messageInfo: {
   fontSize: 12,
  }
});
