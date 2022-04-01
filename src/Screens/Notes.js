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
import TagSelector from '../Elements/TagSelector';
import NoteDisplay from '../Elements/NoteDisplay';
import GlobalStyle from '../GlobalStyle';
import {black} from 'react-native-paper/lib/typescript/styles/colors';

export default function Notes({navigation}) {
  const [noteTitle, setNoteTitle] = useState('');
  const [noteDescription, setNoteDesription] = useState('');
  const [noteTag, setNoteTag] = useState('no-tag');
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [notes, setNotes] = useState([]);
  const [visible, setVisible] = useState(false);
  const [tagList, setTagList] = useState(['tag1', 'tag2', 'tag3']);
  const [tagListNote, setTagListNote] = useState(['tag1', 'tag2', 'tag3']);
  const [tagModal, setTagModal] = useState(false);
  const [tagId, setTagid] = useState('');
  const [tagFilter, setTagFiler] = useState('');
  const noteRef = firestore().collection('notesDatabase');
  const tagRef = firestore().collection('tagsDatabase');
  const [tagClicked, setTagClicked] = useState(false);
  const [tagClicked2, setTagClicked2] = useState(false);
  const [tagId2, setTagid2] = useState('');
  const [Add, setAdd] = useState(true);
  const [itemEdit, setItemEdit] = useState('');
  const [colums, setColums] = useState(2);
  const clear = () => {
    console.log('Clearing Iniciated...');
    setVisible(false);
    setNoteTitle('');
    setNoteDesription('');
    setNoteTag('');
    setTagClicked2(false);
    setTagid2('');
    setItemEdit('');
  };

  //load the tags in two lists with two different ids
  //two ids to differenciate the two FlatLists, should be updated, possible bugs
  useEffect(() => {
    return tagRef.onSnapshot(querySnapshot => {
      const list2 = [];
      const list3 = [];
      let x = 0;
      querySnapshot.forEach(doc2 => {
        x++;
        const {tag} = doc2.data();
        list2.push({
          id: doc2.id,
          tag,
        });
        list3.push({
          id: x,
          tag,
        });
      });
      setTagList(list2);
      setTagListNote(list3);

      if (loading2) {
        setLoading2(false);
      }
    });
  }, []);

  //load the notes in notesList
  useEffect(() => {
    return noteRef.onSnapshot(querySnapshot => {
      const notesList = [];
      querySnapshot.forEach(doc3 => {
        const {title, description, tag} = doc3.data();
        notesList.push({
          id: doc3.id,
          title,
          description,
          tag,
        });
      });
      setNotes(notesList);
      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  //can be reduced to 1 function with conditions
  const topTagSelect = (id, title) => {
    console.log(id);
    setTagClicked(true);
    setColums(1);
    setTagid(id);
    setTagFiler(title);
  };

  const modalTagSelect = (id, title) => {
    console.log(id);
    setTagClicked2(true);
    setTagid2(id);
    setNoteTag(title);
  };

  const modalTagSelectClear = () => {
    setTagClicked2(false);
    setTagid2('');
  };

  //Add Note to Firebase
  async function addNote() {
    //writing to firabase
    console.log(noteTitle, '1');
    if (noteTitle.length == 0) {
      //err handling
      alert('Please provide a title!');
      return;
    }
    await noteRef.add({
      //add the fileds
      title: noteTitle,
      description: noteDescription,
      tag: noteTag,
      tagId2: tagId2,
      dateCreated: new Date(),
    });
    clear();
  }

  //Load Note onPress
  async function loadNote(id) {
    console.log('in Load Info');
    const noteRef = firestore().collection('notesDatabase').doc(id);
    const doc = await noteRef.get();
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data:', doc.data());
      setNoteTitle(doc.data().title);
      setNoteDesription(doc.data().description);
      setNoteTag(doc.data().tag);
      setVisible(true);
      setTagClicked2(true);
      setTagid2(doc.data().tagId2);
      setAdd(false);
      setItemEdit(id);
    }
  }

  //Add Top Tag to Firebase
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

  //Update Note onPress Confirm
  function UpdateInfo(id) {
    console.log('in UPDATE Info');
    firestore().collection('notesDatabase').doc(id).update({
      title: noteTitle,
      description: noteDescription,
      tag: noteTag,
      tagId2: tagId2,
    });
    clear();
  }

  if (loading) {
    return null;
  }

  //Open Modal, can be arrow function
  const onPressHandler = () => {
    setVisible(true);
  };

  //used in TopTag
  const cancelTagSelection = () => {
    setTagClicked(false);
    setColums(2);
    console.log(colums);
  };

  return (
    <ImageBackground
      source={require('../../assets/back.png')}
      style={styles.body}>
      <View style={styles.tagListWrapper}>
        <View>
          {/* two styles to force rerender as the flatlist does not scroll back, bug in react? */}
          <View style={!tagClicked ? styles.flatList : styles.flatListClicked}>
            <FlatList
              data={tagList}
              horizontal={true}
              keyExtractor={item => item.id}
              inverted={tagClicked}
              renderItem={({item}) => (
                <TagSelector
                  title={item.tag}
                  id={item.id}
                  tagClicked={tagClicked}
                  selectedId={tagId}
                  tagSelected={() => topTagSelect(item.id, item.tag)}
                />
              )}
            />
          </View>
          <TouchableOpacity
            onPress={
              tagClicked ? () => cancelTagSelection() : () => setTagModal(true)
            }
            style={styles.tagAddBtn}>
            <FontAwesome5
              name={tagClicked ? 'times' : 'plus'}
              size={18}
              color={tagClicked ? '#ff6d63' : '#FECA8C'}
            />
          </TouchableOpacity>
        </View>

        {/* ****************** Modal Add Tag  **************** */}

        <Modal
          visible={tagModal}
          animationType={'fade'}
          onRequestClose={clear}
          transparent>
          <View style={styles.modal}>
            <View style={styles.modalWrapper}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.modalWrapperTitle}>Add a tag</Text>
                <FontAwesome5
                  style={styles.tagIco}
                  name={'tag'}
                  size={18}
                  color={'#FECA8C'}
                />
              </View>
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

      {/* ****************** Note Wrapper **************** */}
      <View style={styles.notesWrapper}>
        <FlatList
          data={notes}
          keyExtractor={item => item.id}
          key={colums}
          numColumns={colums}
          renderItem={({item}) => (
            <NoteDisplay
              title={item.title}
              tagClicked={tagClicked}
              tagSlc={tagFilter}
              loadInfo={() => loadNote(item.id)}
              id={item.id}
              tag={item.tag}
              description={item.description}
              elIcon={'check'}
            />
          )}
        />
      </View>

      {/* ****************** Modal Add Note  **************** */}

      <Modal
        visible={visible}
        animationType={'fade'}
        onRequestClose={clear}
        transparent>
        <View style={styles.modal}>
          <View style={[GlobalStyle.ModalWrapper]}>
            <TextInput
              style={[GlobalStyle.Title]}
              placeholder="Note title"
              placeholderTextColor="#DEDEDE"
              maxLength={20}
              value={noteTitle}
              onChangeText={setNoteTitle}></TextInput>
            <TextInput
              style={[GlobalStyle.Description]}
              placeholder="Note Description"
              placeholderTextColor="#DEDEDE"
              value={noteDescription}
              onChangeText={setNoteDesription}></TextInput>

            <View
              style={!tagClicked2 ? styles.flatList2 : styles.flatListClicked2}>
              <View style={tagClicked2 ? {right: 40} : {}}>
                <FlatList
                  data={tagListNote}
                  horizontal={true}
                  keyExtractor={item => item.id}
                  renderItem={({item}) => (
                    <TagSelector
                      title={item.tag}
                      id={item.id}
                      tagClicked={tagClicked2}
                      selectedId={tagId2}
                      tagSelectedOnPress={() => modalTagSelectClear(item.id)}
                      tagSelected={() => modalTagSelect(item.id, item.tag)}
                    />
                  )}
                />
              </View>
              <TouchableOpacity
                onPress={
                  tagClicked2
                    ? () => modalTagSelectClear()
                    : () => setTagModal(true)
                }
                style={styles.tagAddBtn2}>
                <FontAwesome5
                  name={tagClicked2 ? 'times' : 'plus'}
                  size={18}
                  color={tagClicked2 ? '#ff6d63' : '#FECA8C'}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.modalWrapperCreateCancel}>
              <TouchableOpacity
                style={[GlobalStyle.btnUnclicked]}
                onPress={clear}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <FontAwesome5
                    style={{right: 8}}
                    name={'times'}
                    size={18}
                    color={'#EF7373'}
                  />
                  <Text style={[GlobalStyle.btnCloseConfirmText]}>Close</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                disabled={noteTitle.length === 0}
                style={[GlobalStyle.btnUnclicked]}
                onPress={Add ? addNote : () => UpdateInfo(itemEdit)}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <FontAwesome5
                    style={{right: 5, top: 1}}
                    name={'check'}
                    size={15}
                    color={'#FECA8C'}
                  />
                  <Text style={GlobalStyle.btnCloseConfirmText}>Confirm</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.addBtn} onPress={onPressHandler}>
        <FontAwesome5 name={'plus'} size={30} color={'#FECA8C'} />
      </TouchableOpacity>
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

  tagAddBtn: {
    position: 'absolute',
    top: 7,
    right: 15,
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: '#636363',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  tagAddBtn2: {
    position: 'absolute',
    top: 6,
    right: 10,
    width: 35,
    height: 35,
    borderRadius: 30,
    backgroundColor: '#636363',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },

  tagListWrapper: {
    width: '98%',
    borderRadius: 5,
    top: 5,
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },

  flatList: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 30,
    width: 360,
    height: 50,
    paddingHorizontal: 10,
    top: 2,
    left: 15,
  },

  flatListClicked: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 30,
    width: 360,
    height: 50,
    paddingHorizontal: 10,
    top: 2,
    right: 10,

    alignItems: 'flex-start',
  },

  flatList2: {
    paddingHorizontal: 10,
    paddingRight: 20,
  },

  flatListClicked2: {
    borderRadius: 30,
    width: 360,
    height: 50,
    paddingHorizontal: 10,
    alignItems: 'flex-end',
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
    width: '70%',
    backgroundColor: '#3b3c3d',
    borderRadius: 7,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalWrapperTitle: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    paddingTop: 10,
  },
  tagIco: {
    marginTop: 5,
    marginLeft: 10,
  },
  modalWrapperAdd: {
    width: '90%',
    backgroundColor: '#3b3c3d',
    borderRadius: 7,
    margin: 10,
    justifyContent: 'center',
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
    width: 180,
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
    justifyContent: 'center',
  },
  itemSelected: {
    backgroundColor: '#FECA8C',
    padding: 5,
    marginRight: 10,
    marginVertical: 8,
    borderRadius: 5,
    justifyContent: 'center',
  },
  tagTextSelected: {
    color: 'black',
  },
  notesWrapper: {
    flex: 1,
    marginTop: 60,
  },
});
