import { useState, useEffect } from 'react'
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import * as Dialog from '@radix-ui/react-dialog'
import './styles/main.css';
import logoImg from './assets/logo-nlw-esports.png'
import { Input } from './components/form/Input';
import { CreateAdModal } from './components/form/CreateAdModal';
import axios from 'axios';


interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios('http://localhost:3333/games').then(response => {
        setGames(response.data) //pega as informações dos jogos no back-end (API)
    })
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="" />
      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent'>duo</span> está aqui.
      </h1>
      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games.map(game => {
          return ( //para cada game, quero retornar um GameBanner
            <GameBanner key={game.id} bannerUrl={game.bannerUrl} title={game.title} adsCount={game._count.ads} />
          )
        })}
      </div>
      <Dialog.Root>
        <CreateAdBanner />
          <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App
