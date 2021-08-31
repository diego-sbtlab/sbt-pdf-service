import React from 'react';
import moment from "moment";
import {
    Container, DescriptionContainer, HalfDiv,
    ImageContainer,
    LabelContainer,
    LightText,
    Row, SignatureContainer, SignatureImage, SignatureLabel,
    StrongText,
    TextContainer,
    Title, TopContainer
} from "./components";
moment.locale('pt', {
    months : ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
});

// @ts-ignore
const ImageAuthorization = ({ prizeDetails }) => {
    let street, number, complement, neighborhood, city, state = '';

    const {
        program,
        recording,
        participant,
        frame,
        signatureUrl,
        nonMonetaryPrize,
    } = prizeDetails
    const {
        name,
        cpf,
        mobile,
        rg,
        surname,
        address,
    } = participant;
    if (address) {
        street = address.street;
        number = address.number;
        complement = address.complement;
        neighborhood = address.neighborhood;
        city = address.city;
        state = address.state;
    }
    let prizeValue =  prizeDetails.prize;
    try {
        prizeValue = parseFloat(prizeValue).toFixed(2)
    } catch (e) {

    }

    return (
        <Container>
            <ImageContainer>
                <img src={"https://sbt-caravanas-assets.s3.amazonaws.com/sbt-logo.png"} width={90} alt="" />
            </ImageContainer>
            <Title>
                {
                    prizeValue < 300
                    ? `RECIBO DE PRÊMIO`
                        : `RECIBO DE PRÊMIO`
                }

                </Title>

            <TopContainer>
                <div style={{ float: 'left', width: '100%'}}>
                    <HalfDiv>
                        <p>Dados do Participante:</p>
                        <Row>
                            <LabelContainer>
                                <LightText>Nome:</LightText>
                            </LabelContainer>
                            <DescriptionContainer>
                                <StrongText>{name} {surname}</StrongText>
                            </DescriptionContainer>
                        </Row>
                        <Row>
                            <LabelContainer>
                                <LightText>Cpf:</LightText>
                            </LabelContainer>
                            <DescriptionContainer>
                                <StrongText>{cpf}</StrongText>
                            </DescriptionContainer>
                        </Row>
                        <Row>
                            <LabelContainer>
                                <LightText>RG:</LightText>
                            </LabelContainer>
                            <DescriptionContainer>
                                <StrongText>{rg}</StrongText>
                            </DescriptionContainer>
                        </Row>
                        <Row>
                            <LabelContainer>
                                <LightText>Nascimento:</LightText>
                            </LabelContainer>
                            <DescriptionContainer>
                                <StrongText>{moment(participant.birthdate).format('DD/MM/YYYY')}</StrongText>
                            </DescriptionContainer>
                        </Row>
                        <Row>
                            <LabelContainer>
                                <LightText>Nacionalidade:</LightText>
                            </LabelContainer>
                            <DescriptionContainer>
                                <StrongText>{participant.nationality}</StrongText>
                            </DescriptionContainer>
                        </Row>
                        <Row>
                            <LabelContainer>
                                <LightText>Estado civíl:</LightText>
                            </LabelContainer>
                            <DescriptionContainer>
                                <StrongText>{participant.maritalStatus}</StrongText>
                            </DescriptionContainer>
                        </Row>
                        <Row>
                            <LabelContainer>
                                <LightText>Profissão:</LightText>
                            </LabelContainer>
                            <DescriptionContainer>
                                <StrongText>{participant.occupation}</StrongText>
                            </DescriptionContainer>
                        </Row>
                        <Row>
                            <LabelContainer>
                                <LightText>Telefone:</LightText>
                            </LabelContainer>
                            <DescriptionContainer>
                                <StrongText>{mobile}</StrongText>
                            </DescriptionContainer>
                        </Row>
                        <Row>
                            <LabelContainer>
                                <LightText>Endereço:</LightText>
                            </LabelContainer>
                            <DescriptionContainer>
                                <StrongText>{street}, {number} - {neighborhood}</StrongText>
                            </DescriptionContainer>
                        </Row>
                        {
                            address && address.complement && (
                                <Row>
                                    <LabelContainer>
                                        <LightText>Complemento:</LightText>
                                    </LabelContainer>
                                    <DescriptionContainer>
                                        <StrongText>{complement}</StrongText>
                                    </DescriptionContainer>
                                </Row>
                            )
                        }
                        <Row>
                            <LabelContainer>
                                <LightText>Cidade:</LightText>
                            </LabelContainer>
                            <DescriptionContainer>
                                <StrongText>{city} - {state}</StrongText>
                            </DescriptionContainer>
                        </Row>
                    </HalfDiv>
                    <HalfDiv>
                        <p>Dados da Participação:</p>
                        <Row>
                            <LabelContainer>
                                <LightText>Programa:</LightText>
                            </LabelContainer>
                            <DescriptionContainer>
                                <StrongText>{program.name}</StrongText>
                            </DescriptionContainer>

                        </Row>
                        <Row>
                            <LabelContainer>
                                <LightText>QUADRO:</LightText>
                            </LabelContainer>
                            <DescriptionContainer>
                                <StrongText>{frame.name}</StrongText>
                            </DescriptionContainer>
                        </Row>
                        <Row>
                            <LabelContainer>
                                <LightText>Data:</LightText>
                            </LabelContainer>
                            <DescriptionContainer>
                                <StrongText>{moment(recording.date).format('DD/MM/YYYY')}</StrongText>
                            </DescriptionContainer>
                        </Row>
                        <Row>
                            <LabelContainer>
                                <LightText>Valor recebido:</LightText>
                            </LabelContainer>
                            <DescriptionContainer>
                                <StrongText>R$ { prizeValue }</StrongText>
                            </DescriptionContainer>
                        </Row>
                        <Row>
                            <LabelContainer>
                                <LightText>Descrição do prêmio:</LightText>
                            </LabelContainer>
                            <DescriptionContainer>
                                <StrongText>{
                                    nonMonetaryPrize || 'Pagamento em dinheiro'
                                }</StrongText>
                            </DescriptionContainer>
                        </Row>
                    </HalfDiv>
                </div>
            </TopContainer>
            <TextContainer>
                {
                    prizeValue < 300 && ( <div style={{ minHeight: 200 }}>

                        </div>
                    /*    <Paragraph>
                    //
                            O abaixo assinado e qualificado, considerando a sua participação no PROGRAMA SÍLVIO SANTOS, produzido pela TVSBT-Canal 4 de São Paulo S/A, firma a presente, para autorizar a utilização/exibição e reexibição da <strong>imagem do(a) autorizante</strong>, captada em decorrência da participação do Programa, em qualquer localidade do território nacional e/ou do exterior, via radiodifusão, VHF, UHF, Cabo incluindo “Pay TV” e “Pay per view”, MMDS, Satélite, INTERNET, redes sociais ou por qualquer outro meio de transporte de sinal atualmente existente ou que no futuro venha a ser criado, por quaisquer emissoras do país, pela emissora da TVSBT- Canal 4 de São Paulo S/A, emissoras componentes da Rede SBT e por emissoras componentes de outras redes, emissoras independentes, bem como, demais veículos de comunicação para venda e/ou locação ao público, quer no território nacional, quer no exterior, e, ainda, poderá a TVSBT efetuar publicação do programa em veículo impresso, revistas e/ou períodicos de fotos, para comercialização em todo o território nacional e/ou do exterior.
                            Os direitos ora assegurados, poderão ser exercidos tanto no território nacional como no exterior, durante o prazo de 70 (setenta) anos.
                            Pela autorização aqui concedida, o(a) autorizante recebe, nesta data, a importância abaixo destacada, dando plena e geral quitação.
                        </Paragraph>*/
                    )
                }
            </TextContainer>
            <SignatureContainer>
                <SignatureLabel>Assinatura do participante</SignatureLabel>
                <SignatureImage src={signatureUrl} />

                <SignatureLabel>Osasco, {moment().format('DD [de] MMMM [de] YYYY')}</SignatureLabel>
            </SignatureContainer>
        </Container>
    );
};
export default ImageAuthorization;