import React, { useState } from 'react'
import styled from 'styled-components'
import { Accordion, Modal } from 'react-bootstrap'
import Container from 'Components/Container/Container'
import basketBallImage from 'Assets/images/basketBall.jpg'
import chevronUpIcon from 'Assets/images/icons/chevronUp.png'
import chevronDownIcon from 'Assets/images/icons/chevronDown.png'
import arrowIcon from 'Assets/images/icons/arrow.png'

const Wrapper = styled.div`
  background: url(${basketBallImage}) no-repeat;
  background-position: center right;
  padding: 100px 530px 100px 100px;

  @media screen and (max-width: ${({ theme }) => theme.breakPoints.BS_LG}) {
    padding: 0;
    background: unset;
  }
`

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.RED};
  font-size: 50px;
  margin-bottom: 75px;
`

type TAccordionHeaderProps = {
  isOpened: boolean
}

const AccordionHeader = styled.div<TAccordionHeaderProps>`
  padding: 15px;
  padding-right: 40px;
  background: url(${p => (p.isOpened ? chevronUpIcon : chevronDownIcon)})
    no-repeat;
  background-position: center right 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.LIGHT_GRAY};
  cursor: pointer;
`

const AccordionContent = styled.div`
  padding: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.LIGHT_GRAY};
  font-weight: 300;
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

const CustomModalHeader = styled(Modal.Header)`
  button {
    border: none;
    background-color: transparent;
    font-size: 30px;
    span:last-child {
      display: none;
    }
  }
`

const initialStatus = Array.from({ length: 17 }, () => false)

const FAQ = () => {
  const [status, setStatus] = useState(initialStatus)
  const [showModal, setShowModal] = useState(false)

  const handleCloseModal = () => setShowModal(false)
  const onClickShowModal = () => setShowModal(true)

  const onClickChangeStatus = (index: number) => () => {
    const _status = status.map((item, _index) =>
      index === _index ? !item : false
    )
    setStatus(_status)
  }
  return (
    <Container>
      <Wrapper>
        <Title>FAQ</Title>
        <Accordion>
          <div>
            <Accordion.Toggle
              as={AccordionHeader}
              eventKey="0"
              onClick={onClickChangeStatus(0)}
              isOpened={status[0]}
            >
              Como ?? o c??lculo do valor a ser pago mensalmente pela loca????o das
              quotas do condom??nio?
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <AccordionContent>
                Todos os meses, voc?? pagar?? ao ve??culo da Cop??rnico
                (???Cop??rnico???) um pre??o, que englobar?? os valores relativos ao
                aluguel das quotas do condom??nio e ?? opera????o e manuten????o da
                usina solar utilizada para gera????o compartilhada de energia. O
                total a ser pago ?? o valor de energia consumida por voc?? no m??s
                de refer??ncia multiplicado pela tarifa do m??s com o desconto
                oferecido pela gera????o compartilhada. Exemplo: se o seu consumo
                atual ?? de 1.000 kWh/m??s, sua tarifa do m??s ?? de R$ 0,60/kWh e
                seu desconto ?? de 10%, voc?? ter?? de pagar, entre aluguel e
                opera????o e manuten????o, um total de R$ 540,00 ?? Cop??rnico ao
                inv??s de pagar R$ 600,00 ?? distribuidora.
              </AccordionContent>
            </Accordion.Collapse>
          </div>
          <div>
            <Accordion.Toggle
              as={AccordionHeader}
              eventKey="1"
              onClick={onClickChangeStatus(1)}
              isOpened={status[1]}
            >
              Como ?? o c??lculo do valor a ser pago mensalmente pela loca????o das
              quotas do condom??nio?
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <AccordionContent>
                Com base no consumo descrito na sua conta de energia el??trica,
                conseguiremos entender a sazonalidade de consumo ao longo do
                ??ltimo ano e dentro de cada dia do seu neg??cio.
              </AccordionContent>
            </Accordion.Collapse>
          </div>
          <div>
            <Accordion.Toggle
              as={AccordionHeader}
              eventKey="2"
              onClick={onClickChangeStatus(2)}
              isOpened={status[2]}
            >
              Quem pode aderir ?? gera????o compartilhada?
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="2">
              <AccordionContent>
                Qualquer pessoa f??sica, empresa ou estabelecimento comercial
                regularmente inscrito perante a Receita Federal do Brasil (i.e.,
                com CNPJ) pode aderir ?? gera????o compartilhada da Cop??rnico. Se a
                conta de energia el??trica do seu neg??cio estiver cadastrada no
                seu CPF, voc?? tamb??m poder?? se cadastrar.
              </AccordionContent>
            </Accordion.Collapse>
          </div>
          <div>
            <Accordion.Toggle
              as={AccordionHeader}
              eventKey="3"
              onClick={onClickChangeStatus(3)}
              isOpened={status[3]}
            >
              Como essa energia chega para mim?
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="3">
              <AccordionContent>
                Voc?? locar?? quotas de um condom??nio de uma usina solar
                juntamente com outras empresas e/ou pessoas f??sicas. Esta usina
                injetar?? a energia solar que for gerada no sistema da
                distribuidora de sua regi??o. Por sua vez, a distribuidora vai
                continuar lhe fornecendo energia el??trica. A distribuidora
                compensar?? a energia que voc?? consumir com a energia que voc??
                gerar com a sua loca????o de quotas do condom??nio.
              </AccordionContent>
            </Accordion.Collapse>
          </div>
          <div>
            <Accordion.Toggle
              as={AccordionHeader}
              eventKey="4"
              onClick={onClickChangeStatus(4)}
              isOpened={status[4]}
            >
              Como eu sei quantas quotas eu deverei locar do condom??nio?
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="4">
              <AccordionContent>
                Com base na sua ??ltima conta de energia el??trica, avaliamos
                quanta energia o condom??nio precisa gerar para compensar o
                volume de energia que voc?? est?? consumindo mensalmente. N??s
                calculamos a quantidade de quotas que voc?? precisa locar para
                receber o montante de energia que precisa. Isso est?? evidenciado
                na sua Proposta Comercial.
              </AccordionContent>
            </Accordion.Collapse>
          </div>
        </Accordion>
        <Button type="button" onClick={onClickShowModal}>
          Exibir todas
        </Button>
      </Wrapper>
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <CustomModalHeader closeButton>
          <Modal.Title>FAQ</Modal.Title>
        </CustomModalHeader>
        <Modal.Body>
          <Accordion>
            <div>
              <Accordion.Toggle
                as={AccordionHeader}
                eventKey="16"
                onClick={onClickChangeStatus(16)}
                isOpened={status[16]}
              >
                Quanto eu consigo economizar com a loca????o de quotas do
                condom??nio de gera????o compartilhada? Que desconto eu posso ter
                no meu custo de energia el??trica?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="16">
                <AccordionContent>
                  Com a loca????o de quotas do condom??nio de gera????o
                  compartilhada, voc?? ter?? um desconto sobre o seu atual custo
                  de energia el??trica junto ?? sua distribuidora. Calcularemos
                  esse desconto com base no seu perfil de consumo, o qual ser??
                  formalizado na Proposta Comercial que lhe ser?? encaminhada.
                  Vale lembrar que, ao locar as quotas do condom??nio, voc??
                  poder?? deixar de pagar as bandeiras tarif??rias amarela,
                  vermelha e vermelha II sobre parcela ou a totalidade do seu
                  consumo. Ent??o, sua economia ser?? ainda maior.
                </AccordionContent>
              </Accordion.Collapse>
            </div>
            <div>
              <Accordion.Toggle
                as={AccordionHeader}
                eventKey="0"
                onClick={onClickChangeStatus(0)}
                isOpened={status[0]}
              >
                Como ?? o c??lculo do valor a ser pago mensalmente pela loca????o
                das quotas do condom??nio?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <AccordionContent>
                  Todos os meses, voc?? pagar?? ao ve??culo da Cop??rnico
                  (???Cop??rnico???) um pre??o, que englobar?? os valores relativos ao
                  aluguel das quotas do condom??nio e ?? opera????o e manuten????o da
                  usina solar utilizada para gera????o compartilhada de energia. O
                  total a ser pago ?? o valor de energia consumida por voc?? no
                  m??s de refer??ncia multiplicado pela tarifa do m??s com o
                  desconto oferecido pela gera????o compartilhada. Exemplo: se o
                  seu consumo atual ?? de 1.000 kWh/m??s, sua tarifa do m??s ?? de
                  R$ 0,60/kWh e seu desconto ?? de 10%, voc?? ter?? de pagar, entre
                  aluguel e opera????o e manuten????o, um total de R$ 540,00 ??
                  Cop??rnico ao inv??s de pagar R$ 600,00 ?? distribuidora.
                </AccordionContent>
              </Accordion.Collapse>
            </div>
            <div>
              <Accordion.Toggle
                as={AccordionHeader}
                eventKey="1"
                onClick={onClickChangeStatus(1)}
                isOpened={status[1]}
              >
                Como ?? o c??lculo do valor a ser pago mensalmente pela loca????o
                das quotas do condom??nio?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <AccordionContent>
                  Com base no consumo descrito na sua conta de energia el??trica,
                  conseguiremos entender a sazonalidade de consumo ao longo do
                  ??ltimo ano e dentro de cada dia do seu neg??cio.
                </AccordionContent>
              </Accordion.Collapse>
            </div>
            <div>
              <Accordion.Toggle
                as={AccordionHeader}
                eventKey="2"
                onClick={onClickChangeStatus(2)}
                isOpened={status[2]}
              >
                Quem pode aderir ?? gera????o compartilhada?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="2">
                <AccordionContent>
                  Qualquer pessoa f??sica, empresa ou estabelecimento comercial
                  regularmente inscrito perante a Receita Federal do Brasil
                  (i.e., com CNPJ) pode aderir ?? gera????o compartilhada da
                  Cop??rnico. Se a conta de energia el??trica do seu neg??cio
                  estiver cadastrada no seu CPF, voc?? tamb??m poder?? se
                  cadastrar.
                </AccordionContent>
              </Accordion.Collapse>
            </div>
            <div>
              <Accordion.Toggle
                as={AccordionHeader}
                eventKey="3"
                onClick={onClickChangeStatus(3)}
                isOpened={status[3]}
              >
                Como essa energia chega para mim?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="3">
                <AccordionContent>
                  Voc?? locar?? quotas de um condom??nio de uma usina solar
                  juntamente com outras empresas e/ou pessoas f??sicas. Esta
                  usina injetar?? a energia solar que for gerada no sistema da
                  distribuidora de sua regi??o. Por sua vez, a distribuidora vai
                  continuar lhe fornecendo energia el??trica. A distribuidora
                  compensar?? a energia que voc?? consumir com a energia que voc??
                  gerar com a sua loca????o de quotas do condom??nio.
                </AccordionContent>
              </Accordion.Collapse>
            </div>
            <div>
              <Accordion.Toggle
                as={AccordionHeader}
                eventKey="4"
                onClick={onClickChangeStatus(4)}
                isOpened={status[4]}
              >
                Como eu sei quantas quotas eu deverei locar do condom??nio?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="4">
                <AccordionContent>
                  Com base na sua ??ltima conta de energia el??trica, avaliamos
                  quanta energia o condom??nio precisa gerar para compensar o
                  volume de energia que voc?? est?? consumindo mensalmente. N??s
                  calculamos a quantidade de quotas que voc?? precisa locar para
                  receber o montante de energia que precisa. Isso est??
                  evidenciado na sua Proposta Comercial.
                </AccordionContent>
              </Accordion.Collapse>
            </div>
            <div>
              <Accordion.Toggle
                as={AccordionHeader}
                eventKey="5"
                onClick={onClickChangeStatus(5)}
                isOpened={status[5]}
              >
                Preciso fazer algum investimento?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="5">
                <AccordionContent>
                  N??o. Na gera????o compartilhada da Cop??rnico voc?? n??o precisa
                  fazer nenhum investimento, nenhuma obra, e nem precisa se
                  preocupar com nenhum processo jur??dico ou administrativo. Tudo
                  fica sob nossa responsabilidade. Informaremos quando a usina
                  solar de que voc?? participar?? entrar em opera????o, e cuidaremos
                  de tudo at?? l??. A partir do in??cio da opera????o da usina, voc??
                  receber?? a medi????o mensal da energia gerada.
                </AccordionContent>
              </Accordion.Collapse>
            </div>

            <div>
              <Accordion.Toggle
                as={AccordionHeader}
                eventKey="6"
                onClick={onClickChangeStatus(6)}
                isOpened={status[6]}
              >
                Quando eu come??o a ter os benef??cios da loca????o de quotas do
                condom??nio?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="6">
                <AccordionContent>
                  Nossas usinas t??m datas determinadas para in??cio de opera????o.
                  Quanto mais cedo voc?? locar as quotas do condom??nio, mais
                  rapidamente voc?? ser?? inclu??do nas usinas que est??o ficando
                  prontas. Os benef??cios financeiros e de sustentabilidade das
                  empresas que locam as quotas do condom??nio come??am a partir da
                  data de opera????o das usinas.
                </AccordionContent>
              </Accordion.Collapse>
            </div>

            <div>
              <Accordion.Toggle
                as={AccordionHeader}
                eventKey="7"
                onClick={onClickChangeStatus(7)}
                isOpened={status[7]}
              >
                Como eu pago pelo aluguel das quotas e pela opera????o e
                manuten????o da usina utilizada?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="7">
                <AccordionContent>
                  A Cop??rnico disponibilizar?? mensalmente uma fatura que
                  englobar?? os valores relativos ao aluguel das quotas e ??
                  opera????o e manuten????o da usina solar utilizada para gera????o
                  compartilhada de energia do condom??nio do qual voc?? loca
                  quotas. O pagamento poder?? ser feito via d??bito autom??tico em
                  conta corrente ou via transfer??ncia banc??ria. Todos os
                  pagamentos efetuados pelas locat??rias dever??o ser feitos
                  livres e desembara??adas de quaisquer ??nus, dedu????es,
                  reten????es, descontos, exclus??es e tributos.
                </AccordionContent>
              </Accordion.Collapse>
            </div>

            <div>
              <Accordion.Toggle
                as={AccordionHeader}
                eventKey="8"
                onClick={onClickChangeStatus(8)}
                isOpened={status[8]}
              >
                Eu continuo recebendo conta da distribuidora?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="8">
                <AccordionContent>
                  Atualmente, a distribuidora cobra o montante de energia
                  el??trica que voc?? consome todos os meses. Adicionalmente, a
                  distribuidora faz outras cobran??as, tais como disponibilidade
                  de energia, impostos e, ocasionalmente, coisas como ilumina????o
                  p??blica, por exemplo. Como locat??ria de quotas do condom??nio,
                  o montante de energia el??trica que voc?? consome ?? compensado
                  pelo montante de energia el??trica gerado pelo condom??nio na
                  propor????o da loca????o de quotas que voc?? loca. A distribuidora
                  continuar?? mandando a conta mensalmente, mas n??o cobrar?? pela
                  energia compensada. Ela poder?? continuar cobrando a
                  disponibilidade, impostos e outros custos, mas ela s?? poder??
                  cobrar a energia el??trica que for consumida acima da que for
                  gerada, e que n??o for compensada por cr??ditos acumulados.
                  Portanto, sim, voc?? continuar?? sendo cliente da distribuidora
                  e continuar?? recebendo a conta mensal da distribuidora. S?? que
                  passar?? a pagar bem menos para a distribuidora todos os meses.
                </AccordionContent>
              </Accordion.Collapse>
            </div>

            <div>
              <Accordion.Toggle
                as={AccordionHeader}
                eventKey="9"
                onClick={onClickChangeStatus(9)}
                isOpened={status[9]}
              >
                Como funciona a compensa????o de energia?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="9">
                <AccordionContent>
                  A energia que voc?? consome e o montante de energia gerado pelo
                  condom??nio na propor????o da loca????o de quotas que voc?? loca s??o
                  medidos mensalmente. Se o que for consumido for igual ao que
                  for gerado, a distribuidora n??o cobrar?? pelo seu consumo de
                  energia el??trica. Se o que for consumido for menor do que o
                  que for gerado, a distribuidora lhe dar?? um cr??dito que pode
                  ser usado em at?? 60 meses a partir do faturamento daquele m??s.
                  Se o que for consumido for maior do que o que for gerado, a
                  distribuidora utilizar?? os cr??ditos que voc?? gerou para
                  compensar a diferen??a ou, se n??o houver cr??ditos, cobrar?? pelo
                  excedente que n??o est?? sendo compensado.
                </AccordionContent>
              </Accordion.Collapse>
            </div>

            <div>
              <Accordion.Toggle
                as={AccordionHeader}
                eventKey="10"
                onClick={onClickChangeStatus(10)}
                isOpened={status[10]}
              >
                O que acontece se a opera????o da usina tiver atraso?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="10">
                <AccordionContent>
                  A Cop??rnico trabalha com a maior seriedade e transpar??ncia
                  para implantar as usinas solares sem que voc?? precise se
                  preocupar com os passos que v??o ocorrer at?? a data de
                  opera????o. Estamos seguros de que n??o haver?? atraso na opera????o
                  de nossas usinas. Contudo, se a opera????o n??o se iniciar dentro
                  de 10 meses a partir da assinatura do contrato de loca????o de
                  quotas e ades??o ao condom??nio, voc?? poder?? encerrar a sua
                  contrata????o mediante notifica????o com anteced??ncia de 90 dias ??
                  Cop??rnico.
                </AccordionContent>
              </Accordion.Collapse>
            </div>

            <div>
              <Accordion.Toggle
                as={AccordionHeader}
                eventKey="11"
                onClick={onClickChangeStatus(11)}
                isOpened={status[11]}
              >
                A ades??o solar tem prazo m??nimo de fidelidade?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="11">
                <AccordionContent>
                  <p>
                    Voc?? poder?? requerer o t??rmino do seu contrato de loca????o,
                    sem qualquer ??nus ou penalidade, desde que o fa??a mediante
                    notifica????o escrita ?? Cop??rnico por pelo menos 12 meses a
                    partir da data da opera????o da usina com anteced??ncia m??nima
                    de 180 dias. Caso voc?? n??o respeite a anteced??ncia m??nima, a
                    Cop??rnico cobrar?? multa equivalente a 6 vezes o valor do
                    pre??o mensal do seu contrato de loca????o de quotas. Mas, por
                    que vai querer encerrar seu contrato de loca????o e voltar a
                    pagar mais caro? ainda estou sujeito ?? volatilidade e quedas
                    de energia das distribuidoras?
                  </p>
                  <p>
                    Infelizmente, ainda n??o podemos estar totalmente
                    independentes das distribuidoras. Conforme a regulamenta????o
                    atual, as usinas fornecer??o energia gerada para as
                    distribuidoras, e as distribuidoras fornecer??o energia para
                    seu neg??cio, compensando a energia consumida com a energia
                    gerada. Portanto, ainda existe depend??ncia da qualidade do
                    fornecimento da energia da distribuidora para seu neg??cio.
                  </p>
                </AccordionContent>
              </Accordion.Collapse>
            </div>

            <div>
              <Accordion.Toggle
                as={AccordionHeader}
                eventKey="12"
                onClick={onClickChangeStatus(12)}
                isOpened={status[12]}
              >
                E como funciona no caso de fornecimento de energia ?? noite,
                quando n??o tem sol?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="12">
                <AccordionContent>
                  A distribuidora tem que fornecer energia el??trica para voc??
                  independentemente do hor??rio de consumo. Ela vai contabilizar
                  o total de energia consumido e gerado dentro de um m??s para
                  efeito da compensa????o.
                </AccordionContent>
              </Accordion.Collapse>
            </div>

            <div>
              <Accordion.Toggle
                as={AccordionHeader}
                eventKey="13"
                onClick={onClickChangeStatus(13)}
                isOpened={status[13]}
              >
                Por que preciso locar quotas do condom??nio para aproveitar a
                gera????o de energia?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="13">
                <AccordionContent>
                  A Cop??rnico locar?? quotas do condom??nio a v??rias empresas e
                  pessoas f??sicas que buscam economia e sustentabilidade. Este
                  condom??nio n??o possui personalidade jur??dica pr??pria, mas ??
                  obrigado a ter CNPJ. A Cop??rnico ser?? a administradora do
                  condom??nio, coordenando os objetivos das diferentes empresas e
                  pessoas f??sicas que desejam locar as quotas do condom??nio e
                  participar da opera????o e manuten????o das usinas.
                </AccordionContent>
              </Accordion.Collapse>
            </div>

            <div>
              <Accordion.Toggle
                as={AccordionHeader}
                eventKey="14"
                onClick={onClickChangeStatus(14)}
                isOpened={status[14]}
              >
                Como eu fa??o para locar as quotas do condom??nio?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="14">
                <AccordionContent>
                  ?? muito simples. Basta seguir o passo a passo indicado nos
                  links que receber, come??ando pela aceita????o da proposta
                  comercial. Depois, voc?? poder?? assinar digitalmente o Contrato
                  de Loca????o de Quotas e Ades??o ao Condom??nio da Usina. Voc??
                  ser?? instru??do a nos enviar a documenta????o de sua empresa, a
                  qual ser?? analisada pela Cop??rnico no prazo de 3 dias e,
                  estando em boa ordem, voc?? ter?? locado as quotas do
                  condom??nio.
                </AccordionContent>
              </Accordion.Collapse>
            </div>

            <div>
              <Accordion.Toggle
                as={AccordionHeader}
                eventKey="15"
                onClick={onClickChangeStatus(15)}
                isOpened={status[15]}
              >
                Como consorciado, o que eu preciso saber sobre o Contrato do
                Condom??nio?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="15">
                <AccordionContent>
                  <p>
                    Administra????o do Condom??nio: O condom??nio ser?? gerido
                    exclusivamente pela Cop??rnico, que n??o receber?? qualquer
                    remunera????o pela lideran??a e administra????o do condom??nio.
                  </p>

                  <p>
                    Nesse sentido, a Cop??rnico (i) representar?? todas as
                    locat??rias perante a ANEEL, ??rg??os governamentais,
                    judiciais, regulat??rios e setoriais, bem como quaisquer
                    terceiros, incluindo a concession??ria de distribui????o de
                    energia el??trica do local da usina; (ii) representar?? as
                    locat??rias em qualquer ato relacionado ao enquadramento
                    regulat??rio da usina, (iii) ser?? respons??vel por indicar a
                    aloca????o dos cr??ditos de energia para cada uma das
                    locat??rias; (iv) formalizar?? a ades??o, sa??da ou exclus??o de
                    quaisquer das locat??rias, (v) enviar?? mensalmente notas de
                    d??bito ??s locat??rias para pagamento do aluguel e das demais
                    despesas relacionadas ao condom??nio e ?? usina. As
                    delibera????es do condom??nio ser??o tomadas pela Cop??rnico, a
                    quem cabe voto exclusivo.
                  </p>

                  <p>
                    A Cop??rnico poder??, a seu exclusivo crit??rio, implantar a
                    usina em qualquer localidade, desde que dentro da mesma ??rea
                    de concess??o de servi??o p??blico de distribui????o de energia
                    el??trica.
                  </p>

                  <p>
                    A execu????o, opera????o e administra????o do condom??nio e da
                    usina caber?? ?? Cop??rnico, e as locat??rias reconhecem que a
                    Cop??rnico ?? a ??nica e exclusiva titular da usina, constru??da
                    com o fim exclusivo de frui????o da energia pelas locat??rias
                    na modalidade gera????o compartilhada sob as regras da
                    Resolu????o Normativa n?? 482, de 17 de abril de 2012, e suas
                    atualiza????es subsequentes.
                  </p>

                  <p>
                    Altera????es Regulat??rias: Altera????es realizadas pelas
                    autoridades competentes nas regulamenta????es aplic??veis ??
                    Conven????o de Condom??nio ou na legisla????o tribut??ria
                    aplic??vel que importem na cria????o, altera????o, suspens??o ou
                    extin????o de tributos, altera????o de al??quotas ou base de
                    c??lculo ou mudan??a no tratamento tribut??rio relativo ??
                    loca????o, resultar??o na majora????o ou na redu????o autom??tica do
                    pre??o, mediante notifica????o pela Cop??rnico ??s locat??rias,
                    sem necessidade de celebra????o de um aditamento contratual.
                  </p>

                  <p>
                    Obriga????es das Locat??rias: Caber?? ??s locat??rias: (i) pagar o
                    pre??o do aluguel nas datas de vencimento; (ii) pagar as
                    faturas da distribuidora que continuar??o a ser emitidas; e
                    (iii) prestar todas e quaisquer informa????es ?? Cop??rnico para
                    que ela possa cumprir com suas responsabilidades perante a
                    ANEEL, os ??rg??os governamentais, judiciais, regulat??rios e
                    setoriais, bem como a distribuidora local.
                  </p>
                </AccordionContent>
              </Accordion.Collapse>
            </div>
          </Accordion>
        </Modal.Body>
      </Modal>
    </Container>
  )
}

export default FAQ
