import React, { useState } from 'react'
import styled from 'styled-components'
import { formatCurrency, formatDecimalNumber } from 'Utils/helpers'
import guysHoldingSunImage from 'Assets/images/guysHoldingSun.png'

const OutterWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f9f9f9;
  padding-bottom: 110px;
`

const InnerWrapper = styled.div`
  width: 100%;
  max-width: 1170px;
`

const Title = styled.h2`
  padding: 40px;
  font-size: 40px;
  text-align: center;
`

const SimuladorContainer = styled.div`
  background: white url(${guysHoldingSunImage}) no-repeat;
  background-position: center right 35px;
  padding: 35px 80px;
  padding-right: 570px;
  text-align: center;

  @media screen and (max-width: ${({ theme }) => theme.breakPoints.BS_LG}) {
    background: white;
    padding: 35px;
  }
`

const MainQuestion = styled.p`
  font-size: 22px;
  font-weight: 300;
  padding-bottom: 25px;

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
  margin: 0;
`

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
  return formatDecimalNumber(Math.ceil(resultado))
}

type TInputEvent = {
  target: {
    value: string
  }
}

type TProps = {
  changeToSecondFase(): void
}

const Simulador = (props: TProps) => {
  const { changeToSecondFase } = props

  const [contaLuz, setContaLuz] = useState(initialContaLuzValue)

  const onChangeContaLuz = (event: TInputEvent) => {
    const { value } = event.target
    setContaLuz(Number(value))
  }

  const formattedContaLuz = formatCurrency(contaLuz)
  const formattedEconomia = getEconomia(contaLuz)
  const formattedCO2 = getCO2(contaLuz)
  const formattedArvores = getArvores(contaLuz)

  return (
    <OutterWrapper>
      <InnerWrapper>
        <Title>
          Com zero de investimento, simule quanto você pode economizar
        </Title>
        <SimuladorContainer>
          <MainQuestion>
            Qual o valor médio de sua <strong>conta de luz</strong>?
          </MainQuestion>

          <Slider
            type="range"
            min="650"
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
            <MediumEnphasisValue>{formattedArvores}</MediumEnphasisValue>{' '}
            árvores plantadas
          </Frase>

          <Button onClick={changeToSecondFase}>Quero Economizar</Button>

          <FootNote>
            *Essa simulação foi feita considerando uma conexão bifásica.
          </FootNote>
          <FootNote>
            A economia real, pode sofrer alterações em virtude da conexão e da
            taxa de iluminação pública.
          </FootNote>
        </SimuladorContainer>
      </InnerWrapper>
    </OutterWrapper>
  )
}

export default Simulador
