import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 32,
  },
  title: {
    color: THEME.COLORS.TEXT,
    fontSize: THEME.FONT_SIZE.LG,
    fontFamily: THEME.FONT_FAMILY.BLACK,
  },
  titleColor: {
    backgroundColor: "linear-gradient(90deg, rgba(99,102,241,1)', 'rgba(168,85,247,1)', 'rgba(59,130,246,1)'",
    backgroundClip: "text",
  },
  subtitle: {
    color: THEME.COLORS.CAPTION_400,
    fontSize: THEME.FONT_SIZE.MD,
    fontFamily: THEME.FONT_FAMILY.REGULAR
  },
  text: {
    color: 'transparent',
    backgroundClip: 'text',
    justifyContent: 'flex-end'
  }
});