import { StyleSheet } from 'react-native';
import { scale, verticalScale } from '../utils/scaling'; // Import scaling functions

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: scale(5),
  },
  scrollContainer: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  contentBlock: {
    marginBottom: verticalScale(10),
  },
  halfContentBlock: {
    flexDirection: 'row',
    marginBottom: verticalScale(10),
  },
  leftContent: {
    flex: 1,
    paddingRight: scale(10),
  },
  rightContent: {
    width: scale(150), // Scaled width
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: verticalScale(20), // Scaled font size
    fontWeight: 'bold',
    backgroundColor: '#94499c',
    color: 'white',
    textAlign: 'center',
    paddingVertical: verticalScale(10),
    marginBottom: verticalScale(10),
    marginTop: verticalScale(10),
    borderRadius: scale(10),
  },
  subtitle: {
    fontSize: verticalScale(15), // Scaled font size
    fontWeight: 'bold',
    backgroundColor: '#e1e1e1',
    color: '#333',
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(20),
    marginBottom: verticalScale(10),
    borderRadius: scale(10),
  },
  regularText: {
    fontSize: verticalScale(16), // Scaled font size
    lineHeight: verticalScale(20), // Scaled line height
    color: '#333',
  },
  subtitleBold: {
    fontSize: verticalScale(18), // Scaled font size
    fontWeight: 'bold',
    color: '#333',
    paddingVertical: verticalScale(5),
    paddingHorizontal: scale(5),
    marginBottom: verticalScale(10),
    borderRadius: scale(10),
  },
  subtitleImage: {
    width: '100%',
    height: verticalScale(150), // Scaled height
    borderRadius: scale(10),
    marginBottom: verticalScale(10),
  },
  bullet: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(5),
  },
  bulletText: {
    fontSize: verticalScale(15), // Scaled font size
    color: '#555',
    marginRight: scale(10),
  },
  halfContentText: {
    fontSize: verticalScale(15), // Scaled font size
    color: '#555',
  },
  halfContentImage: {
    width: scale(150), // Scaled width
    height: verticalScale(150), // Scaled height
    borderRadius: scale(10),
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  table: {
    marginBottom: verticalScale(20),
    borderWidth: 1,
    borderColor: '#ccc',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e1e1e1',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  tableBody: {
    flexDirection: 'column',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    flex: 1,
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(10),
    fontSize: verticalScale(15),
    color: '#555',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  errorText: {
    color: 'red',
    marginTop: verticalScale(10),
  },
});

export default styles;
