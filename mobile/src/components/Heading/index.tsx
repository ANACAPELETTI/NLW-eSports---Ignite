import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, ViewProps } from 'react-native';
import { THEME } from '../../theme';

import { styles } from './styles';

interface Props extends ViewProps {
    title: string;
    titleColor: string; 
    subtitle: string;
}

export function Heading({title, subtitle, titleColor, ...rest}:Props) {
  return (
    <View style={styles.container} {...rest}>
        <Text style={styles.title}>
            {title}
        </Text>

        <Text style={styles.subtitle}>
            {subtitle}
        </Text>
        <LinearGradient colors={THEME.COLORS.DUO} style={styles.text} >
            <Text style={styles.titleColor}>
                {titleColor}
            </Text>
        </LinearGradient>
    </View>
  );
}