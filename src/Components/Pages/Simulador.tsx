import React, { useState } from 'react'
import styled from 'styled-components'
// import { Container } from 'react-bootstrap'
import Container from 'Components/Container/Container'
import { formatCurrency, formatDecimalNumber } from 'Utils/helpers'
import guysHoldingSunImage from 'Assets/images/guysHoldingSun.png'

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 550px 100px 0;
  background: url(${guysHoldingSunImage}) no-repeat;
  background-size: 470px 669px;
  background-position: right center;
  text-align: center;

  p {
    margin: 0;
  }

  h3 {
    margin-bottom: 0;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakPoints.BS_LG}) {
    background: unset;
    padding-right: 0;
  }
`

const Title = styled.h3`
  font-size: 30px;
  text-align: center;
  padding-bottom: 20px;
`

const MainQuestion = styled.p`
  font-size: 22px;
  font-weight: 300;
  padding-bottom: 80px;

  strong {
    font-weight: 700;
  }
`

const Frase = styled.p`
  font-size: 20px;
  font-weight: 300;
  padding-bottom: 10px;

  strong {
    font-weight: 700;
  }
`

const LightEnphasisValue = styled.h3`
  font-weight: 700;
  font-size: 24px;
  padding-bottom: 40px;
`

const StrongEnphasisValue = styled.h3`
  font-size: 37px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.YELLOW};
  padding-bottom: 30px;
`

const MediumEnphasisValue = styled.strong`
  font-size: 25px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.YELLOW};
`

const Slider = styled.input`
  width: 100%;
  appearance: none;
  background: ${({ theme }) => theme.colors.YELLOW};
  outline: none;
  height: 3px;
  margin-bottom: 25px;

  &::-webkit-slider-thumb {
    appearance: none;
    background: ${({ theme }) => theme.colors.LIGHT_GRAY};
    cursor: pointer;
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }

  &::-moz-slider-thumb {
    appearance: none;
    background: ${({ theme }) => theme.colors.LIGHT_GRAY};
    cursor: pointer;
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }
`

const Button = styled.button`
  font-size: 22px;
  background-color: ${({ theme }) => theme.colors.YELLOW};
  color: ${({ theme }) => theme.colors.WHITE};
  border: 0;
  padding: 10px 30px;
  border-radius: 6px;
  margin: 50px 0;
`

const FootNote = styled.p`
  font-size: 14px;
  font-weight: 300;
`

type TInputEvent = {
  target: {
    value: string
  }
}

const custoEnergia = 0.92
const desconto = 0.15
const geracaoUsina = 13340900
const initialContaLuzValue = 1000

const getEconomia = (contaLuz: number) => {
  const economia = custoEnergia * (contaLuz * 12 - 1000) * desconto * 1.05
  const valueToConsider = economia > 0 ? economia : 0

  return formatCurrency(valueToConsider)
}

const getCO2 = (contaLuz: number) => {
  const consumo = contaLuz / custoEnergia
  const resultado = ((consumo * 2754) / geracaoUsina) * 1000
  return formatDecimalNumber(resultado)
}

const getArvores = (contaLuz: number) => {
  const consumo = contaLuz / custoEnergia
  const resultado = (consumo * 1642) / geracaoUsina
  return formatDecimalNumber(resultado)
}

const Simulador = () => {
  const [contaLuz, setContaLuz] = useState(initialContaLuzValue)

  const onChangeContaLuz = (event: TInputEvent) => {
    const { value } = event.target
    setContaLuz(Number(value))
  }

  const onClickScrollToForm = () => {
    window.location.href = '#form'
  }

  const formattedContaLuz = formatCurrency(contaLuz)
  const formattedEconomia = getEconomia(contaLuz)
  const formattedCO2 = getCO2(contaLuz)
  const formattedArvores = getArvores(contaLuz)

  return (
    <Container>
      <InnerWrapper>
        <Title>
          Simule aqui quanto pode economizar em sua conta de energia e
          surpreenda-se
        </Title>

        <MainQuestion>
          Qual o valor médio de sua <strong>conta de luz</strong>?
        </MainQuestion>

        <Slider
          type="range"
          min="200"
          max="20000"
          step="10"
          onChange={onChangeContaLuz}
          value={contaLuz}
        />
        <LightEnphasisValue>{formattedContaLuz}</LightEnphasisValue>
        <Frase>
          Sua economia em <strong>12 meses</strong> será de aproximadamente:
        </Frase>
        <StrongEnphasisValue>{formattedEconomia}</StrongEnphasisValue>
        <Frase>
          Além disso, veja seu <strong>impacto positivo</strong> para o meio
          ambiente:
        </Frase>
        <Frase>
          Menos de <MediumEnphasisValue>{formattedCO2}</MediumEnphasisValue>{' '}
          <strong>kg</strong> de <strong>CO2</strong> ou{' '}
          <MediumEnphasisValue>{formattedArvores}</MediumEnphasisValue> árvore(s)
          plantada(s)
        </Frase>
        <Button onClick={onClickScrollToForm}>Quero Economizar</Button>
        <FootNote>
          *Essa simulação foi feita considerando uma conexão bifásica. O
          desconto real pode sofrer alterações.
        </FootNote>
      </InnerWrapper>
    </Container>
  )
}

export default Simulador
