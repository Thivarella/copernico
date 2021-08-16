import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { cpf as cpfValidator, cnpj as cnpjValidator } from 'cpf-cnpj-validator'
import { useToasts } from 'react-toast-notifications'
import { removeMaskGuides } from 'Utils/helpers'
import { Form, FormLabel } from 'react-bootstrap'
import styled from 'styled-components'
import InputMask from 'react-input-mask'
import arrowIcon from 'Assets/images/icons/arrow.png'

const CustomForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const Input = styled(Form.Control)`
  &::placeholder {
    color: ${({ theme }) => theme.colors.LIGHT_GRAY};
  }
`

const CustomFormLabel = styled(FormLabel)`
  margin-right: 20px;
`

const MaskedInput = styled(InputMask)`
  &::placeholder {
    color: ${({ theme }) => theme.colors.LIGHT_GRAY};
  }
`

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
`

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.YELLOW};
  background-image: url(${arrowIcon});
  background-repeat: no-repeat;
  background-position: center right 15px;
  color: ${({ theme }) => theme.colors.WHITE};
  border: none;
  padding: 5px 50px 5px 40px;
  margin-top: 30px;
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

const NoWrappingContainer = styled.div`
  white-space: nowrap;
  display: inline;
`

const getEndereco = async (cep: string) => {
  try {
    const url = `https://viacep.com.br/ws/${cep}/json/`
    const response = await fetch(url)
    const endereco = await response.json()
    return endereco
  } catch (error) {
    return
  }
}

enum PessoaTipo {
  FISICA = 'F',
  JURIDICA = 'J',
}

type TInputEvent = {
  target: {
    id: string
    value: string
  }
}

type TForm = {
  tipoPessoa: PessoaTipo
  nome: string
  rg: string
  cpf: string
  ocupacao: string
  estadoCivil: string
  razaoSocial: string
  cnpj: string
  email: string
  telefone: string
  cep: string
  endereco: string
  complemento: string
  estado: string
  cidade: string
  nomeRepresentanteLegal: string
  rgRepresentanteLegal: string
  cpfRepresentanteLegal: string
  ocupacaoRepresentanteLegal: string
  estadoCivilRepresentanteLegal: string
  cepRepresentanteLegal: string
  enderecoRepresentanteLegal: string
  complementoRepresentanteLegal: string
  estadoRepresentanteLegal: string
  cidadeRepresentanteLegal: string
}

const validationSchema = yup.object().shape({
  tipoPessoa: yup.string().required('O campo "Tipo de Pessoa" é obrigatório'),
  nome: yup.string().when('tipoPessoa', {
    is: PessoaTipo.FISICA,
    then: yup.string().required('O campo "Nome" é obrigatório'),
    otherwise: yup.string(),
  }),
  ocupacao: yup.string().when('tipoPessoa', {
    is: PessoaTipo.FISICA,
    then: yup.string().required('O campo "Ocupação" é obrigatório'),
    otherwise: yup.string(),
  }),
  rg: yup.string().when('tipoPessoa', {
    is: PessoaTipo.FISICA,
    then: yup
      .string()
      .required('O campo "RG" é obrigatório'),
    otherwise: yup.string(),
  }),
  cpf: yup.string().when('tipoPessoa', {
    is: PessoaTipo.FISICA,
    then: yup
      .string()
      .required('O campo "CPF" é obrigatório')
      .test('', 'O CPF informado não é válido', value =>
        cpfValidator.isValid(value!)
      ),
    otherwise: yup.string(),
  }),
  razaoSocial: yup.string().when('tipoPessoa', {
    is: PessoaTipo.JURIDICA,
    then: yup.string().required('O campo "Razão Social" é obrigatório'),
    otherwise: yup.string(),
  }),
  cnpj: yup.string().when('tipoPessoa', {
    is: PessoaTipo.JURIDICA,
    then: yup
      .string()
      .required('O campo "CNPJ" é obrigatório')
      .test('', 'O CNPJ informado não é válido', value =>
        cnpjValidator.isValid(value!)
      ),
    otherwise: yup.string(),
  }),
  email: yup
    .string()
    .required('Por favor informe seu e-mail')
    .email('Insira um e-mail válido'),
  telefone: yup
    .string()
    .required('O campo "Telefone" é obrigatório')
    .test('', 'Insira um telefone válido', value => {
      const zeroedPhone = '(00) 00000-0000'
      const isPhoneZeroed = value === zeroedPhone

      const cleanPhone = removeMaskGuides(String(value))
      const isPhoneIncomplete = cleanPhone.length < 10

      return !isPhoneIncomplete && !isPhoneZeroed
    })
    .max(15, 'Insira um telefone válido'),
  cep: yup
    .string()
    .required('O campo "CEP" é obrigatório')
    .test('', 'Insira um CEP válido', value => {
      const zeroedCEP = '00000-000'
      const isCEPZeroed = value === zeroedCEP

      const cleanCEP = removeMaskGuides(String(value))
      const isCEPIncomplete = cleanCEP.length !== 8

      return !isCEPIncomplete && !isCEPZeroed
    }),
  nomeRepresentanteLegal: yup.string().when('tipoPessoa', {
    is: PessoaTipo.JURIDICA,
    then: yup.string().required('O campo "Nome" é obrigatório'),
    otherwise: yup.string(),
  }),
  ocupacaoRepresentanteLegal: yup.string().when('tipoPessoa', {
    is: PessoaTipo.JURIDICA,
    then: yup.string().required('O campo "Ocupação" é obrigatório'),
    otherwise: yup.string(),
  }),
  rgRepresentanteLegal: yup.string().when('tipoPessoa', {
    is: PessoaTipo.JURIDICA,
    then: yup
        .string()
        .required('O campo "RG" é obrigatório'),
    otherwise: yup.string(),
  }),
  cpfRepresentanteLegal: yup.string().when('tipoPessoa', {
    is: PessoaTipo.JURIDICA,
    then: yup
        .string()
        .required('O campo "CPF" é obrigatório')
        .test('', 'O CPF informado não é válido', value =>
            cpfValidator.isValid(value!)
        ),
    otherwise: yup.string(),
  }),
  endereco: yup.string().required('O campo "Endereço" é obrigatório'),
  cidade: yup.string().required('O campo "Cidade" é obrigatório'),
  estado: yup.string().required('O campo "Estado" é obrigatório'),
  cepRepresentanteLegal: yup
      .string()
      .required('O campo "CEP" é obrigatório')
      .test('', 'Insira um CEP válido', value => {
        const zeroedCEP = '00000-000'
        const isCEPZeroed = value === zeroedCEP

        const cleanCEP = removeMaskGuides(String(value))
        const isCEPIncomplete = cleanCEP.length !== 8

        return !isCEPIncomplete && !isCEPZeroed
      }),
  enderecoRepresentanteLegal: yup.string().when('tipoPessoa', {
    is: PessoaTipo.JURIDICA,
    then: yup
        .string()
        .required('O campo "Endereço" é obrigatório'),
    otherwise: yup.string(),
  }),
  cidadeRepresentanteLegal: yup.string().when('tipoPessoa', {
    is: PessoaTipo.JURIDICA,
    then: yup
        .string()
        .required('O campo "Cidade" é obrigatório'),
    otherwise: yup.string(),
  }),
  estadoRepresentanteLegal: yup.string().when('tipoPessoa', {
    is: PessoaTipo.JURIDICA,
    then: yup
        .string()
        .required('O campo "Endereço" é obrigatório'),
    otherwise: yup.string(),
  }),
})

const initialValues: TForm = {
  tipoPessoa: PessoaTipo.FISICA,
  nome: '',
  rg: '',
  cpf: '',
  ocupacao: '',
  razaoSocial: '',
  cnpj: '',
  email: '',
  telefone: '',
  cep: '',
  estadoCivil: '',
  endereco: '',
  complemento: '',
  estado: '',
  cidade: '',
  nomeRepresentanteLegal: '',
  rgRepresentanteLegal: '',
  cpfRepresentanteLegal: '',
  ocupacaoRepresentanteLegal: '',
  estadoCivilRepresentanteLegal: '',
  cepRepresentanteLegal: '',
  enderecoRepresentanteLegal: '',
  complementoRepresentanteLegal: '',
  estadoRepresentanteLegal: '',
  cidadeRepresentanteLegal: '',
}

type TProps = {
  handleFaseChange(fase: number): void
}

const FormContrato = (props: TProps) => {
  const { handleFaseChange } = props

  const { addToast } = useToasts()

  const onSubmit = () => {
    localStorage.setItem("faseOne", JSON.stringify(formik.values));
    handleFaseChange(2);
  }

  const formik = useFormik<TForm>({
    initialValues,
    validationSchema,
    enableReinitialize: false,
    validateOnChange: true,
    onSubmit,
  })

  const onChangeTipoPessoa = (tipoPessoa: PessoaTipo) => () => {
    formik.setFieldValue('tipoPessoa', tipoPessoa)
  }

  const onChangeCEP = async (e: TInputEvent) => {
    const { value: cep } = e.target
    formik.handleChange(e)

    const cepNumbers = cep.replace(/_/g, '').replace(/-/g, '')
    if (cepNumbers.length === 8) {
      const endereco = await getEndereco(cep)
      if (!endereco || !endereco.localidade) {
        addToast('O CEP digitado é inválido!', {
          appearance: 'error',
          autoDismiss: true,
        })

        formik.setFieldValue('cidade', '')
        formik.setFieldValue('estado', '')
        formik.setFieldValue('endereco', '')
      }

      formik.setFieldValue('cidade', endereco.localidade, true)
      formik.setFieldValue('estado', endereco.uf, true)
      formik.setFieldValue('endereco', endereco.logradouro, true)
      return
    }

    formik.setFieldValue('cidade', '')
    formik.setFieldValue('estado', '')
    formik.setFieldValue('endereco', '')
  }

  const onChangeCEPRepresentanteLegal = async (e: TInputEvent) => {
    const { value: cep } = e.target
    formik.handleChange(e)

    const cepNumbers = cep.replace(/_/g, '').replace(/-/g, '')
    if (cepNumbers.length === 8) {
      const endereco = await getEndereco(cep)
      if (!endereco || !endereco.localidade) {
        addToast('O CEP digitado é inválido!', {
          appearance: 'error',
          autoDismiss: true,
        })

        formik.setFieldValue('cidadeRepresentanteLegal', '')
        formik.setFieldValue('estadoRepresentanteLegal', '')
        formik.setFieldValue('endereco', '')
      }

      formik.setFieldValue('cidadeRepresentanteLegal', endereco.localidade, true)
      formik.setFieldValue('estadoRepresentanteLegal', endereco.uf, true)
      formik.setFieldValue('enderecoRepresentanteLegal', endereco.logradouro, true)
      return
    }

    formik.setFieldValue('cidadeRepresentanteLegal', '')
    formik.setFieldValue('estadoRepresentanteLegal', '')
    formik.setFieldValue('enderecoRepresentanteLegal', '')
  }

  return (
    <CustomForm onSubmit={formik.handleSubmit}>
      <p>Preencha os dados para continuar</p>
      <Form.Group>
        <CustomFormLabel>Tipo de Pessoa</CustomFormLabel>

        <NoWrappingContainer>
          <Form.Check
            name="tipoPessoa"
            inline
            label="Física"
            type="radio"
            checked={formik.values.tipoPessoa === PessoaTipo.FISICA}
            onChange={onChangeTipoPessoa(PessoaTipo.FISICA)}
          />

          <Form.Check
            name="tipoPessoa"
            inline
            label="Jurídica"
            type="radio"
            checked={formik.values.tipoPessoa === PessoaTipo.JURIDICA}
            onChange={onChangeTipoPessoa(PessoaTipo.JURIDICA)}
          />
        </NoWrappingContainer>
      </Form.Group>

      {formik.values.tipoPessoa === PessoaTipo.FISICA ? (
        <>
          <Form.Group>
            <Input
              name="nome"
              type="text"
              placeholder="Nome completo"
              isInvalid={Boolean(formik.touched.nome && formik.errors.nome)}
              value={formik.values.nome}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />

            <Form.Control.Feedback type="invalid">
              {formik.errors.nome}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Input
                className={`form-control ${
                    Boolean(formik.touched.rg && formik.errors.rg) && 'is-invalid'
                }`}
                name="rg"
                type="text"
                placeholder="RG"
                value={formik.values.rg}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
            />

            <Form.Control.Feedback type="invalid">
              {formik.errors.rg}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <MaskedInput
              className={`form-control ${
                Boolean(formik.touched.cpf && formik.errors.cpf) && 'is-invalid'
              }`}
              name="cpf"
              mask={'999.999.999-99'}
              type="text"
              placeholder="CPF"
              value={formik.values.cpf}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />

            <Form.Control.Feedback type="invalid">
              {formik.errors.cpf}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Input
                className={`form-control ${
                    Boolean(formik.touched.ocupacao && formik.errors.ocupacao) && 'is-invalid'
                }`}
                name="ocupacao"
                type="text"
                placeholder="Ocupação"
                value={formik.values.ocupacao}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
            />

            <Form.Control.Feedback type="invalid">
              {formik.errors.ocupacao}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Input
                className={`form-control ${
                    Boolean(formik.touched.estadoCivil && formik.errors.estadoCivil) && 'is-invalid'
                }`}
                name="estadoCivil"
                type="text"
                placeholder="Estado Civil"
                value={formik.values.estadoCivil}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
            />

            <Form.Control.Feedback type="invalid">
              {formik.errors.estadoCivil}
            </Form.Control.Feedback>
          </Form.Group>
        </>
      ) : (
        <>
          <Form.Group>
            <Input
              name="razaoSocial"
              type="text"
              placeholder="Razão Social"
              isInvalid={Boolean(
                formik.touched.razaoSocial && formik.errors.razaoSocial
              )}
              value={formik.values.razaoSocial}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />

            <Form.Control.Feedback type="invalid">
              {formik.errors.razaoSocial}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <MaskedInput
              className={`form-control ${
                Boolean(formik.touched.cnpj && formik.errors.cnpj) &&
                'is-invalid'
              }`}
              name="cnpj"
              mask="99.999.999/9999-99"
              type="text"
              placeholder="CNPJ"
              value={formik.values.cnpj}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />

            <Form.Control.Feedback type="invalid">
              {formik.errors.cnpj}
            </Form.Control.Feedback>
          </Form.Group>
        </>
      )}
      <Form.Group>
        <Input
          name="email"
          type="email"
          placeholder="E-mail"
          isInvalid={Boolean(formik.touched.email && formik.errors.email)}
          value={formik.values.email}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />

        <Form.Control.Feedback type="invalid">
          {formik.errors.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <MaskedInput
          className={`form-control ${
            Boolean(formik.touched.telefone && formik.errors.telefone) &&
            'is-invalid'
          }`}
          name="telefone"
          mask="(99) 99999-9999"
          type="text"
          placeholder="Telefone"
          value={formik.values.telefone}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />

        <Form.Control.Feedback type="invalid">
          {formik.errors.telefone}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <MaskedInput
          className={`form-control ${
            Boolean(formik.touched.cep && formik.errors.cep) && 'is-invalid'
          }`}
          name="cep"
          mask="99999-999"
          type="text"
          placeholder="CEP"
          autoComplete="disabled"
          value={formik.values.cep}
          onBlur={formik.handleBlur}
          onChange={onChangeCEP}
        />

        <Form.Control.Feedback type="invalid">
          {formik.errors.cep}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Input
          name="endereco"
          type="text"
          placeholder="Endereço"
          isInvalid={Boolean(formik.touched.endereco && formik.errors.endereco)}
          value={formik.values.endereco}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />

        <Form.Control.Feedback type="invalid">
          {formik.errors.endereco}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Input
          name="complemento"
          type="text"
          placeholder="Complemento"
          isInvalid={Boolean(
            formik.touched.complemento && formik.errors.complemento
          )}
          value={formik.values.complemento}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />

        <Form.Control.Feedback type="invalid">
          {formik.errors.complemento}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Input
          name="estado"
          type="text"
          placeholder="Estado"
          isInvalid={Boolean(formik.touched.estado && formik.errors.estado)}
          value={formik.values.estado}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          disabled
        />

        <Form.Control.Feedback type="invalid">
          {formik.errors.estado}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Input
          name="cidade"
          type="text"
          placeholder="Cidade"
          isInvalid={Boolean(formik.touched.cidade && formik.errors.cidade)}
          value={formik.values.cidade}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          disabled
        />

        <Form.Control.Feedback type="invalid">
          {formik.errors.cidade}
        </Form.Control.Feedback>
      </Form.Group>

      {formik.values.tipoPessoa === PessoaTipo.JURIDICA ? (
          <>
            <hr/>
            <p>Dados do Representante Legal</p>
            <Form.Group>
              <Input
                  name="nomeRepresentanteLegal"
                  type="text"
                  placeholder="Nome completo"
                  isInvalid={Boolean(formik.touched.nomeRepresentanteLegal && formik.errors.nomeRepresentanteLegal)}
                  value={formik.values.nomeRepresentanteLegal}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
              />

              <Form.Control.Feedback type="invalid">
                {formik.errors.nomeRepresentanteLegal}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Input
                  className={`form-control ${
                      Boolean(formik.touched.rgRepresentanteLegal && formik.errors.rgRepresentanteLegal) && 'is-invalid'
                  }`}
                  name="rgRepresentanteLegal"
                  type="text"
                  placeholder="RG"
                  value={formik.values.rgRepresentanteLegal}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
              />

              <Form.Control.Feedback type="invalid">
                {formik.errors.rgRepresentanteLegal}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <MaskedInput
                  className={`form-control ${
                      Boolean(formik.touched.cpfRepresentanteLegal && formik.errors.cpfRepresentanteLegal) && 'is-invalid'
                  }`}
                  name="cpfRepresentanteLegal"
                  mask={'999.999.999-99'}
                  type="text"
                  placeholder="CPF"
                  value={formik.values.cpfRepresentanteLegal}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
              />

              <Form.Control.Feedback type="invalid">
                {formik.errors.cpfRepresentanteLegal}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Input
                  className={`form-control ${
                      Boolean(formik.touched.ocupacaoRepresentanteLegal && formik.errors.ocupacaoRepresentanteLegal) && 'is-invalid'
                  }`}
                  name="ocupacaoRepresentanteLegal"
                  type="text"
                  placeholder="Ocupação"
                  value={formik.values.ocupacaoRepresentanteLegal}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
              />

              <Form.Control.Feedback type="invalid">
                {formik.errors.ocupacaoRepresentanteLegal}
              </Form.Control.Feedback>
            </Form.Group>



            <Form.Group>
              <Input
                  className={`form-control ${
                      Boolean(formik.touched.estadoCivilRepresentanteLegal && formik.errors.estadoCivilRepresentanteLegal) && 'is-invalid'
                  }`}
                  name="estadoCivilRepresentanteLegal"
                  type="text"
                  placeholder="Estado Civil"
                  value={formik.values.estadoCivilRepresentanteLegal}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
              />

              <Form.Control.Feedback type="invalid">
                {formik.errors.estadoCivilRepresentanteLegal}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <MaskedInput
                  className={`form-control ${
                      Boolean(formik.touched.cepRepresentanteLegal && formik.errors.cepRepresentanteLegal) && 'is-invalid'
                  }`}
                  name="cepRepresentanteLegal"
                  mask="99999-999"
                  type="text"
                  placeholder="CEP"
                  autoComplete="disabled"
                  value={formik.values.cepRepresentanteLegal}
                  onBlur={formik.handleBlur}
                  onChange={onChangeCEPRepresentanteLegal}
              />

              <Form.Control.Feedback type="invalid">
                {formik.errors.cepRepresentanteLegal}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Input
                  name="enderecoRepresentanteLegal"
                  type="text"
                  placeholder="Endereço"
                  isInvalid={Boolean(formik.touched.enderecoRepresentanteLegal && formik.errors.enderecoRepresentanteLegal)}
                  value={formik.values.enderecoRepresentanteLegal}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
              />

              <Form.Control.Feedback type="invalid">
                {formik.errors.enderecoRepresentanteLegal}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Input
                  name="complementoRepresentanteLegal"
                  type="text"
                  placeholder="Complemento"
                  isInvalid={Boolean(
                      formik.touched.complementoRepresentanteLegal && formik.errors.complementoRepresentanteLegal
                  )}
                  value={formik.values.complementoRepresentanteLegal}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
              />

              <Form.Control.Feedback type="invalid">
                {formik.errors.complementoRepresentanteLegal}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Input
                  name="estadoRepresentanteLegal"
                  type="text"
                  placeholder="Estado"
                  isInvalid={Boolean(formik.touched.estadoRepresentanteLegal && formik.errors.estadoRepresentanteLegal)}
                  value={formik.values.estadoRepresentanteLegal}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  disabled
              />

              <Form.Control.Feedback type="invalid">
                {formik.errors.estadoRepresentanteLegal}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Input
                  name="cidadeRepresentanteLegal"
                  type="text"
                  placeholder="Cidade"
                  isInvalid={Boolean(formik.touched.cidadeRepresentanteLegal && formik.errors.cidadeRepresentanteLegal)}
                  value={formik.values.cidadeRepresentanteLegal}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  disabled
              />

              <Form.Control.Feedback type="invalid">
                {formik.errors.cidadeRepresentanteLegal}
              </Form.Control.Feedback>
            </Form.Group>
          </>
      ) : (<></>)
      }
      <ButtonsWrapper>
        <OutLinedButton type="button">Voltar</OutLinedButton>
        <Button type="submit">Enviar</Button>
      </ButtonsWrapper>
    </CustomForm>
  )
}

export default FormContrato
