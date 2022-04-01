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
  const [tagListNote, setTagListNote] = useState(['tag1', 'tag2', 'tag3']);
  const [tagModal, setTagModal] = useState(false);
  const [tagId, setTagid] = useState('');
  const [tagIdNote, setTagIdNote] = useState('');
  const [tagFilter, setTagFiler] = useState('');
  const [TagTitle, setTagTitle] = useState('');
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

  //this is executed the items amount
  // when tag is clicked, return null, only render the selected one
  const Item = ({title, id}) => {
    if (tagClicked == true) {
      if (visible) {
        //const [tagIdNote, setTagIdNote] = useState('');
        return (
          <View style={styles.itemSelected}>
            <TouchableOpacity onPress={() => selectTag(id)}>
              <Text style={styles.tagTextSelected}>{title}</Text>
            </TouchableOpacity>
          </View>
        );
      } else {
        if (id == tagId) {
          return (
            <View style={styles.itemSelected}>
              <TouchableOpacity onPress={() => selectTag(id)}>
                <Text style={styles.tagTextSelected}>{title}</Text>
              </TouchableOpacity>
            </View>
          );
        } else {
          return null;
        }
      }
    } else {
      return (
        <View style={styles.item}>
          <TouchableOpacity onPress={() => selectTag(id)}>
            <Text style={styles.tagText}>{title}</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };
  const renderItem = ({item}) => <Item title={item.tag} id={item.id} />;

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

  const selectTag = id => {
    console.log(id);
    setTagid(id);
    setColums(1);
    setTagClicked(true);
  };

  const tagSel = (id, title) => {
    console.log(id);
    setTagClicked(true);
    setColums(1);
    setTagid(id);
    setTagFiler(title);
  };

  const tagSel2 = (id, title) => {
    console.log(id);
    setTagClicked2(true);
    setTagid2(id);
    setNoteTag(title);
  };
  const tagSel2Reverse = id => {
    console.log(id);
    setTagClicked2(false);
    setTagid2('');
  };

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
      tagId2: tagId2,
      dateCreated: new Date(),
    });

    clear();
  }

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

  const onPress2 = () => {
    setTagClicked(false);
    setColums(2);
    console.log(colums);
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
    console.log(notes);
  };

  return (
    <ImageBackground
      source={require('../../assets/back.png')}
      style={styles.body}>
      <View style={styles.body}>
        <View
          style={
            tagClicked ? styles.tagListWrapperClicked : styles.tagListWrapper
          }>
          <View style={styles.flatList}>
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
                  tagSelected={() => tagSel(item.id, item.tag)}
                />
              )}
            />
          </View>
          <TouchableOpacity
            onPress={tagClicked ? () => onPress2() : () => setTagModal(true)}
            style={styles.tagAddBtn}>
            <FontAwesome5
              name={tagClicked ? 'times' : 'plus'}
              size={15}
              color={'#FECA8C'}
            />
          </TouchableOpacity>
          {/* ****************** Modal Add Tag  **************** */}

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
                elFunction={() => Test()}
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
            <View style={styles.modalWrapper}>
              <TextInput
                style={styles.modalTitle}
                placeholder="Note title"
                maxLength={20}
                value={noteTitle}
                onChangeText={setNoteTitle}></TextInput>
              <TextInput
                style={styles.modalDescription}
                placeholder="Note Description"
                value={noteDescription}
                onChangeText={setNoteDesription}></TextInput>

              <View style={styles.modalWrapperTimeButtons}>
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
                      tagSelectedOnPress={() => tagSel2Reverse(item.id)}
                      tagSelected={() => tagSel2(item.id, item.tag)}
                    />
                  )}
                />
              </View>

              <View style={styles.modalWrapperCreateCancel}>
                <TouchableOpacity
                  style={styles.modalBtnCreateCancel}
                  onPress={clear}>
                  <Text style={styles.modalBtnTextCreateCancel}>Close</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modalBtnCreateCancel}
                  onPress={Test}>
                  <Text style={styles.modalBtnTextCreateCancel}>Test</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  disabled={noteTitle.length === 0}
                  style={styles.modalBtnCreateCancel}
                  onPress={Add ? addNote : () => UpdateInfo(itemEdit)}>
                  <Text style={styles.modalBtnTextCreateCancel}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <TouchableOpacity style={styles.addBtn} onPress={onPressHandler}>
          <FontAwesome5 name={'plus'} size={30} color={'#FECA8C'} />
        </TouchableOpacity>
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

  tagListWrapper: {
    width: '98%',
    borderRadius: 5,
    top: 5,
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagListWrapperClicked: {
    width: '98.1%',
    borderRadius: 5,
    top: 5,
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
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
