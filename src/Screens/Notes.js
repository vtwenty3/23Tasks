import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  ImageBackground,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import firestore from '@react-native-firebase/firestore';
import Todo2 from '../Elements/Todo2';
import {white} from 'react-native-paper/lib/typescript/styles/colors';

export default function Notes({navigation}) {
  const [noteTitle, setNoteTitle] = useState('');
  const [noteDescription, setNoteDesription] = useState('');
  const [noteTag, setNoteTag] = useState('no-tag');
  const [tagInput, setTagInput] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);

  const [notes, setNotes] = useState([]);

  const [visible, setVisible] = useState(false);
  const [tagList, setTagList] = useState(['tag1', 'tag2', 'tag3']);
  const noteRef = firestore().collection('notesDatabase');
  const tagRef = firestore().collection('tagsDatabase');
  const [tagModal, setTagModal] = useState(false);
  const [tagId, setTagid] = useState('');
  const [TagTitle, setTagTitle] = useState('');

  const clear = () => {
    console.log('Clearing Iniciated...');
    setVisible(false);
    setNoteTitle('');
    setNoteDesription('');
    setNoteTag('');
  };

  //this is executed the items amount

  const Item = ({title, id}) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => Explorer(id)}>
        <Text style={styles.tagText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({item}) => <Item title={item.tag} id={item.id} />;

  useEffect(() => {
    return tagRef.onSnapshot(querySnapshot => {
      const list2 = [];
      querySnapshot.forEach(doc2 => {
        const {tag} = doc2.data();
        list2.push({
          id: doc2.id,
          tag,
        });
      });
      setTagList(list2);
      if (loading2) {
        setLoading2(false);
      }
    });
  }, []);

  const Explorer = whatever => {
    console.log(whatever);
  };

  useEffect(() => {
    return noteRef.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const {title, complete} = doc.data();
        list.push({
          id: doc.id,
          noteTitle,
          noteDescription,
          noteTag,
        });
      });
      setNotes(list);
      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  async function addNote() {
    //writing to firabase
    console.log(noteTitle, '1');
    if (noteTitle.length == 0) {
      //err handling
      alert('Please provide a title!');
      return;
    }

    async function LoadInfo(id) {
      console.log('in Load Info');
      const tagsRef = firestore().collection('tagsDatabase').doc(id);
      const doc = await tagsRef.get();
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        console.log('Document data:', doc.data());
        setTagTitle(doc.data().title);
        setTagid(id);
        console.log(tagId, TagTitle);
      }
    }

    await noteRef.add({
      //add the fileds
      title: noteTitle,
      description: noteDescription,
      tag: noteTag,
      dateCreated: new Date(),
    });

    clear();
  }

  async function addTag() {
    //writing to firabase
    console.log(noteTag, '1');
    if (noteTag.length == 1) {
      //err handling
      alert('Tag should be at least 2 chars');
      return;
    }
    await tagRef.add({
      //add the fileds
      tag: noteTag,
    });
    setNoteTag('');
  }

  if (loading) {
    return null;
  }

  const onPressHandler = () => {
    setVisible(true);
  };

  const toggleTag = () => {
    if (tagInput == false) {
      setTagInput(true);
    }
    if (tagInput == true) {
      setTagInput(false);
    }
  };

  const Test = () => {
    consoleLog('Tag Pressed');
  };

  return (
    <ImageBackground
      source={require('../../assets/back.png')}
      style={styles.body}>
      <View style={styles.body}>
        <View style={styles.tagListWrapper}>
          <FlatList
            style={styles.flatList}
            data={tagList}
            horizontal={true}
            keyExtractor={item => item.id}
            renderItem={renderItem}
          />
          <TouchableOpacity
            onPress={() => setTagModal(true)}
            style={styles.tagAddBtn}>
            <FontAwesome5 name={'plus'} size={15} color={'#FECA8C'} />
          </TouchableOpacity>

          <Modal
            visible={tagModal}
            animationType={'fade'}
            onRequestClose={clear}
            transparent>
            <View style={styles.modal}>
              <View style={styles.modalWrapper}>
                <View style={styles.modalWrapperTimeButtons}>
                  <TextInput
                    style={styles.tagInput}
                    onChangeText={setNoteTag}
                    placeholder={'ex. Ideas'}></TextInput>
                  <TouchableOpacity
                    onPress={addTag}
                    style={[styles.btnUnclicked]}>
                    <Text style={styles.modalTextTimeButtons}>Add</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.modalWrapperCreateCancel}>
                  <TouchableOpacity
                    style={styles.modalBtnCreateCancel}
                    onPress={() => setTagModal(false)}>
                    <Text style={styles.modalBtnTextCreateCancel}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        <Modal
          visible={visible}
          animationType={'fade'}
          onRequestClose={clear}
          transparent>
          <View style={styles.modal}>
            <View style={styles.modalWrapper}>
              <TextInput
                style={styles.modalTitle}
                placeholder="Note title"
                value={noteTitle}
                onChangeText={setNoteTitle}></TextInput>
              <TextInput
                style={styles.modalDescription}
                placeholder="Note Description"
                value={noteDescription}
                onChangeText={setNoteDesription}></TextInput>

              <View style={styles.modalWrapperTimeButtons}>
                <TextInput
                  style={styles.tagInput}
                  onChangeText={setNoteTag}
                  editable={tagInput}
                  placeholder={'ex. Ideas'}></TextInput>

                <TouchableOpacity
                  onPress={toggleTag}
                  style={[tagInput ? styles.btnClicked : styles.btnUnclicked]}>
                  <Text style={styles.modalTextTimeButtons}>Add</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.modalWrapperCreateCancel}>
                <TouchableOpacity
                  style={styles.modalBtnCreateCancel}
                  onPress={clear}>
                  <Text style={styles.modalBtnTextCreateCancel}>Close</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  disabled={noteTitle.length === 0}
                  style={styles.modalBtnCreateCancel}
                  onPress={addNote}>
                  <Text style={styles.modalBtnTextCreateCancel}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <TouchableOpacity style={styles.addBtn} onPress={onPressHandler}>
          <FontAwesome5 name={'plus'} size={30} color={'#FECA8C'} />
        </TouchableOpacity>

        <Text style={styles.text}>Notes</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Poppins-Bold',
    fontSize: 40,
    margin: 10,
  },

  tagListWrapper: {
    width: '98%',
    borderRadius: 5,
    top: 5,
    flexDirection: 'row',
    position: 'absolute',
  },
  tagAddBtn: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: '#636363',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },

  flatList: {
    marginRight: 7,
    marginLeft: 7,
  },
  addBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#636363',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 5,
    elevation: 5,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.28)',
  },
  modalWrapper: {
    width: '90%',
    backgroundColor: '#3b3c3d',
    borderRadius: 7,
    margin: 10,
  },
  modalTitle: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 7,
    margin: 10,
    fontSize: 20,
    backgroundColor: 'grey',
    elevation: 5,
  },
  modalDescription: {
    height: 150,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 7,
    margin: 10,
    fontSize: 12,
    backgroundColor: 'grey',
    elevation: 5,
  },

  modalBtnCreateCancel: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    borderRadius: 3,
    height: 30,
    paddingLeft: 30,
    paddingRight: 30,
    margin: 10,
  },

  modalBtnTextCreateCancel: {
    fontFamily: 'Poppins-SemiBold',
  },

  modalWrapperCreateCancel: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalWrapperTimeButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnClicked: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FECA8C',
    borderRadius: 3,
    height: 30,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
  },

  btnUnclicked: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    borderRadius: 3,
    height: 30,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
  },
  tagInput: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 7,
    fontSize: 15,
    backgroundColor: 'grey',
    elevation: 5,
    height: 35,
    width: 200,
  },
  tagText: {
    color: 'white',
  },
  item: {
    backgroundColor: '#5A5A5A',
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 6,
    borderRadius: 5,
  },
});
