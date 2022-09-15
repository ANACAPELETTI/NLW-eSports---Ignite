import { View, Image, FlatList } from 'react-native';
import logoImg from '../../assets/logo-nlw-esports.png';
import { GameCard } from '../../components/GameCard';
import { Heading } from '../../components/Heading';
import { styles } from './styles';
import { GAMES } from '../../utils/games';

export function Home() {
  return (
    <View style={styles.container}>
      <Image 
        source={logoImg}
        style={styles.logo}
      />

      <Heading 
        title="Encontre seu "
        titleColor="duo"
        subtitle="Selecione o game que deseja jogar..."
      />

      <FlatList 
        data={GAMES} 
        keyExtractor={item => item.id} 
        renderItem={({item}) => (
          <GameCard 
            data={item}
          />
        )}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal
        contentContainerStyle={styles.contentList}
      />
      
    </View>
  );
}