import React, { useState } from 'react'
import Navbar from './Components/Navbar'
import Header from './Components/Header'
import Simulador from './Components/Simulador'
import Footer from 'Components/Footer/Footer'
import FacaAdesao from './Components/FacaAdesao/FacaAdesao'
import Contato from 'Components/Pages/Contato'
import Beneficios from './Components/FacaAdesao/Beneficios'
import FAQ from 'Components/Pages/FAQ'
import WhatsApp from 'Components/Pages/WhatsApp'

const Adesao = () => {
  const [fase, setFase] = useState(1)

  const changeToSecondFase = () => setFase(2)

  return (
    <>
      <Navbar />
      <Header />
      {fase === 1 && <Simulador changeToSecondFase={changeToSecondFase} />}
      {fase === 2 && <FacaAdesao />}
      <Beneficios />
      <Contato />
      <FAQ />
      <WhatsApp />
      <Footer />
    </>
  )
}

export default Adesao
