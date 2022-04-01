import {StyleSheet} from 'react-native';
import {white} from 'react-native-paper/lib/typescript/styles/colors';

export default StyleSheet.create({
  LightFont: {
    fontFamily: 'Poppins-Light',
  },
  CustomFont: {
    fontFamily: 'Poppins-Medium',
  },
  ButtonText: {
    fontFamily: 'Poppins-Black',
    fontSize: 25,
  },
  Title: {
    fontFamily: 'Poppins-Regular',
    marginTop: 12,
    borderRadius: 7,
    paddingBottom: 3,
    paddingLeft: 7,
    textAlignVertical: 'center',
    margin: 10,
    fontSize: 20,
    backgroundColor: '#5A5A5A',
    color: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
  },

  Description: {
    fontFamily: 'Poppins-Light',
    padding: 7,

    backgroundColor: '#5A5A5A',
    textAlignVertical: 'top',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: 150,
    borderRadius: 7,
    paddingHorizontal: 10,
    color: 'white',

    marginHorizontal: 10,
    marginVertical: 5,
    fontSize: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
  },

  ModalWrapper: {
    width: '92%',
    backgroundColor: '#313131',
    borderRadius: 7,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },

  btnUnclicked: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6B6B6B',
    width: 100,
    borderRadius: 5,
    height: 35,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },

  btnClicked: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#AC8659',
    borderRadius: 5,
    width: 100,

    height: 35,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  btnText: {
    marginTop: 3,
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#DEDEDE',
  },
  btnCloseConfirmText: {
    marginTop: 3,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: '#2D2D2D',
  },
});
