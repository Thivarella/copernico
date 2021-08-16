import React, { useState } from 'react'
import { Col, Form, FormControl, FormLabel, Row } from 'react-bootstrap'
import styled from 'styled-components'
import arrowIcon from 'Assets/images/icons/arrow.png'
import { useFormik } from 'formik'
import { formatCurrency, formatDecimalNumber } from 'Utils/helpers'
import axios from "axios";

const CustomForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const InputsContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 5px;
  margin-bottom: 10px;

  div {
    flex: 1;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakPoints.BS_LG}) {
    margin-top: 10px;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakPoints.BS_SM}) {
    flex-direction: column;
  }
`

const Input = styled(Form.Control)`
  &::placeholder {
    color: ${({ theme }) => theme.colors.LIGHT_GRAY};
  }
`

const RadioButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 5px;
  margin-bottom: 10px;

  @media screen and (max-width: ${({ theme }) => theme.breakPoints.BS_LG}) {
    margin-top: 10px;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakPoints.BS_MD}) {
    flex-direction: column;
  }
`

const SubTitle = styled.h3`
  font-size: 30px;
  text-align: center;
  margin: 75px 0 25px 0;
`

const FixedHeightFormLabel = styled(FormLabel)`
  height: 50px;
  display: flex;
  align-items: flex-end;
`

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
`

type TButtonProps = {
  showIcon?: boolean
  spaced?: boolean
}

const Button = styled.button<TButtonProps>`
  background-color: ${({ theme }) => theme.colors.YELLOW};
  background-image: ${p => (p.showIcon ? `url(${arrowIcon})` : 'unset')};
  background-repeat: no-repeat;
  background-position: center right 15px;
  color: ${({ theme }) => theme.colors.WHITE};
  border: none;
  padding: 5px ${p => (p.showIcon ? '50px' : '40px')} 5px 40px;

  margin-top: ${p => (p.spaced ? '30px' : 0)};
  border-radius: 6px;
  font-size: 15px;
`

const OutLinedButton = styled.button`
  padding: 5px 40px;
  margin-top: 30px;
  border-radius: 6px;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.MEDIUM_GRAY};
  background-color: ${({ theme }) => theme.colors.WHITE};
  border: 1px solid ${({ theme }) => theme.colors.LIGHT_GRAY};
`

enum TipoConexao {
  MONOFASICA = 'M',
  BIFASICA = 'B',
  TRIFASICA = 'T',
}

type TInputEvent = {
  target: {
    id: string
    value: string
  }
}

type TForm = {
  mesAtual: string
  mes1: string
  mes2: string
  mes3: string
  mes4: string
  mes5: string
  mes6: string
  mes7: string
  mes8: string
  mes9: string
  mes10: string
  mes11: string
  mes12: string
  tipoConexao: TipoConexao
}

const initialValues: TForm = {
  mesAtual: '',
  mes1: '',
  mes2: '',
  mes3: '',
  mes4: '',
  mes5: '',
  mes6: '',
  mes7: '',
  mes8: '',
  mes9: '',
  mes10: '',
  mes11: '',
  mes12: '',
  tipoConexao: TipoConexao.BIFASICA,
}

type TProps = {
  handleFaseChange(fase: number): void
}

const FormSimulador = (props: TProps) => {
  const { handleFaseChange } = props

  const [economiaDinheiro, setEconomiaDinheiro] = useState('')
  const [economiaCO2, setEconomiaCO2] = useState('')
  const [economiaArvores, setEconomiaArvores] = useState('')

  const onSubmit = async () => {
    let obj = {...JSON.parse(localStorage.getItem("faseOne") as string)};
    obj = {...obj, ...formik.values}
    let response = await axios.post("http://localhost:8080/acquisition", obj)
    handleFaseChange(3);
  }

  const formik = useFormik<TForm>({
    initialValues,
    onSubmit,
  })

  const onChangeMesAtual = (event: TInputEvent) => {
    const { value } = event.target
    formik.setFieldValue('mesAtual', value)
    formik.setFieldValue('mes1', value)
    formik.setFieldValue('mes2', value)
    formik.setFieldValue('mes3', value)
    formik.setFieldValue('mes4', value)
    formik.setFieldValue('mes5', value)
    formik.setFieldValue('mes6', value)
    formik.setFieldValue('mes7', value)
    formik.setFieldValue('mes8', value)
    formik.setFieldValue('mes9', value)
    formik.setFieldValue('mes10', value)
    formik.setFieldValue('mes11', value)
    formik.setFieldValue('mes12', value)
  }

  const onClickCalculate = () => {
    const arrayValues = Array.from({ length: 12 }, (_, index) =>
      Number(formik.values[`mes${index + 1}` as keyof TForm])
    )

    const consumoAnual = arrayValues.reduce((acc, curr) => acc + curr, 0)

    const porcentagemDesconto = 0.13
    const tarifaCemig = 0.8
    const valorDesconto = consumoAnual * tarifaCemig * porcentagemDesconto
    const formattedValorDesconto = formatCurrency(valorDesconto)
    setEconomiaDinheiro(formattedValorDesconto)

    const _economiaCO2 = (valorDesconto / 1000000) * 0.539 * 1000
    const formattedValorCO2 = formatDecimalNumber(_economiaCO2)
    setEconomiaCO2(`Menos ${formattedValorCO2}kg de CO2`)

    const _economiaArvores = Math.ceil((valorDesconto / 1000000) * 0.504)
    setEconomiaArvores(`${_economiaArvores} árvores plantadas`)
  }

  return (
    <CustomForm onSubmit={formik.handleSubmit}>
      <Row>
        <Col lg={4}>2. Qual o seu consumo elétrico neste mês (kWh)?</Col>
        <Col lg={2}>
          <InputsContainer>
            <Input
              type="number"
              placeholder="000"
              min="0"
              {...formik.getFieldProps('mesAtual')}
              onChange={onChangeMesAtual}
            />
          </InputsContainer>
        </Col>
      </Row>

      <Row>
        <Col lg={4}>3. Preencha seu consumo dos últimos 12 meses</Col>

        <Col lg={8}>
          <InputsContainer>
            <Form.Group>
              <FormLabel>Janeiro</FormLabel>
              <Input
                type="number"
                placeholder="000"
                min="0"
                {...formik.getFieldProps('mes1')}
              />
            </Form.Group>

            <Form.Group>
              <FormLabel>Fevereiro</FormLabel>
              <Input
                type="number"
                placeholder="000"
                min="0"
                {...formik.getFieldProps('mes2')}
              />
            </Form.Group>

            <Form.Group>
              <FormLabel>Março</FormLabel>
              <Input
                type="number"
                placeholder="000"
                min="0"
                {...formik.getFieldProps('mes3')}
              />
            </Form.Group>

            <Form.Group>
              <FormLabel>Abril</FormLabel>
              <Input
                type="number"
                placeholder="000"
                min="0"
                {...formik.getFieldProps('mes4')}
              />
            </Form.Group>

            <Form.Group>
              <FormLabel>Maio</FormLabel>
              <Input
                type="number"
                placeholder="000"
                min="0"
                {...formik.getFieldProps('mes5')}
              />
            </Form.Group>

            <Form.Group>
              <FormLabel>Junho</FormLabel>
              <Input
                type="number"
                placeholder="000"
                min="0"
                {...formik.getFieldProps('mes6')}
              />
            </Form.Group>
          </InputsContainer>

          <InputsContainer>
            <Form.Group>
              <FormLabel>Julho</FormLabel>
              <Input
                type="number"
                placeholder="000"
                min="0"
                {...formik.getFieldProps('mes7')}
              />
            </Form.Group>

            <Form.Group>
              <FormLabel>Agosto</FormLabel>
              <Input
                type="number"
                placeholder="000"
                min="0"
                {...formik.getFieldProps('mes8')}
              />
            </Form.Group>

            <Form.Group>
              <FormLabel>Setembro</FormLabel>
              <Input
                type="number"
                placeholder="000"
                min="0"
                {...formik.getFieldProps('mes9')}
              />
            </Form.Group>

            <Form.Group>
              <FormLabel>Outubro</FormLabel>
              <Input
                type="number"
                placeholder="000"
                min="0"
                {...formik.getFieldProps('mes10')}
              />
            </Form.Group>

            <Form.Group>
              <FormLabel>Novembro</FormLabel>
              <Input
                type="number"
                placeholder="000"
                min="0"
                {...formik.getFieldProps('mes11')}
              />
            </Form.Group>

            <Form.Group>
              <FormLabel>Dezembro</FormLabel>
              <Input
                type="number"
                placeholder="000"
                min="0"
                {...formik.getFieldProps('mes12')}
              />
            </Form.Group>
          </InputsContainer>
        </Col>
      </Row>

      <Row>
        <Col lg={4}>4. Qual é o tipo de conexão?</Col>
        <Col lg={8}>
          <RadioButtonsContainer>
            <Form.Check
              inline
              label="Monofásica"
              type="radio"
              {...formik.getFieldProps('tipoConexao')}
            />

            <Form.Check
              inline
              label="Bifásica"
              type="radio"
              {...formik.getFieldProps('tipoConexao')}
            />

            <Form.Check
              inline
              label="Trifásica"
              type="radio"
              {...formik.getFieldProps('tipoConexao')}
            />
          </RadioButtonsContainer>
        </Col>
      </Row>

      <Row>
        <Col lg={4}>5. Qual é sua distribuidora?</Col>
        <Col lg={4}>
          <FormControl as="select">
            <option value="cemig">CEMIG</option>
          </FormControl>
        </Col>
        <Col>
          <Button type="button" onClick={onClickCalculate}>
            Calcular
          </Button>
        </Col>
      </Row>

      <SubTitle>
        Com a Copérnico você poupa o meio ambiente e o seu dinheiro. Simples,
        sem obras, sem investimento e sem fidelidade. Faça sua parte! Faça a
        diferença!
      </SubTitle>

      <Row>
        <Col md={4}>
          <Form.Group>
            <FixedHeightFormLabel>
              Sua economia em 12 meses será
            </FixedHeightFormLabel>
            <Input disabled value={economiaDinheiro} />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <FixedHeightFormLabel>
              Impactos positivos no meio ambiente
            </FixedHeightFormLabel>
            <Input disabled value={economiaCO2} />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <FixedHeightFormLabel></FixedHeightFormLabel>
            <Input disabled value={economiaArvores} />
          </Form.Group>
        </Col>
      </Row>

      <ButtonsWrapper>
        <OutLinedButton type="button" onClick={() => handleFaseChange(1)}>Voltar</OutLinedButton>
        <Button
          type="submit"
          showIcon
          spaced
        >
          Aderir
        </Button>
      </ButtonsWrapper>
    </CustomForm>
  )
}

export default FormSimulador
