import * as React from 'react';
import * as moment from 'moment';
import {
    Capture,
    ColName,
    CpfSpace,
    DocExpSpace,
    DocTitleH1,
    DocTitleSpace, FloatRow,
    FrameBody,
    FrameContainer,
    FrameH2,
    FrameHeader,
    FrameResumeContainer, FrameSection,
    FrameTitleContainer,
    Header,
    InnerItem,
    LightText, MoneyCard, NotesBold, NotesLabel,
    PrizeSpace,
    PrizeText, ProgramDetailBox, ProgramDetailsSection, ProgramName, Row,
    SbtLogoSpace,
    SignatureArea,
    SignatureContainer,
    SignatureSpace,
    SignatureSpaceImage, Table, Tbody, Td,
    TdBold,
    TdLight, Tr,
    UserName
} from "./components";

const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

// @ts-ignore
const CachetReport = ({ accountability }) => {

    const json = accountability;
    const renderPrize = (prizeObj: any) => {
        const { prize, participant, signatureUrl } = prizeObj;
        const { name, surname, email, mobile, cpf } = participant;

        return (
            <div style={{ padding: '4px 6px' }}>
                <InnerItem>
                    <ColName>
                        <div style={{ display: 'block', width: '100%'}}>
                            <FloatRow>
                                <UserName>{`${name} ${surname}`}</UserName>
                            </FloatRow>
                            <FloatRow>
                                <LightText>{mobile} - {email}</LightText>
                            </FloatRow>
                        </div>
                    </ColName>
                    <CpfSpace>
                        <Row>
                            <span style={{ color: 'transparent'}}>.</span>
                        </Row>
                        <Row>
                            <span><strong>cpf: </strong><LightText>{cpf}</LightText></span>
                        </Row>
                    </CpfSpace>
                    <SignatureSpace>
                        <SignatureContainer>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <SignatureArea>
                                    <SignatureSpaceImage src={signatureUrl} height={36} />
                                </SignatureArea>
                            </div>
                        </SignatureContainer>
                    </SignatureSpace>
                    <PrizeSpace>
                        <PrizeText>{formatter.format(parseFloat(prize))}</PrizeText>
                    </PrizeSpace>
                </InnerItem>
            </div>
        )
    }

    const renderFrame = (frameObj: any) => {
        const { frame, totalPrize,cashAdvance ,balance, cashAdvances } = frameObj;
        const { name, prizes, id } = frame;

        // variavel que armazenara os adiantamentos (dentro moneyBills) que sairam para este quadro.
        const frameCashAdvances:any = [];

        // cashAdvances da gravação em que foi dado adiantamento para esse quadro (pode ser + que 1)
        cashAdvances.forEach((item: any) => {
            // 1 cada cashAdvance da gravação, pode aparecer outros quadros
            // filtrar somente o quadro
            const framesInsideThisCashAdvance = item.frames;
            framesInsideThisCashAdvance.forEach((fr: any) => {
                if (fr.frameId === id) {
                    // o fr contem value, moneyBills[], frame{}
                    frameCashAdvances.push(fr);
                }
            })
        });

        return (
            <FrameContainer>
                <FrameHeader>
                    <FrameTitleContainer>
                        <Table width="100%">
                            <Tbody>
                                <Tr>
                                    <Td width={230}>
                                        <Table width="100%">
                                            <Tbody>
                                                <Tr><FrameH2>{name}</FrameH2></Tr>
                                                <Tr><span style={{ marginLeft: 6 }}>Participantes premiados: <strong>{prizes.length}<strong/> </strong></span></Tr>
                                            </Tbody>
                                        </Table>
                                    </Td>
                                    <Td>
                                        {
                                            frameCashAdvances.map((it:any) =>
                                                <div>
                                                    <Row><NotesLabel>Adiantamento:</NotesLabel><NotesBold> R$ {parseFloat(cashAdvance).toFixed(2)}</NotesBold></Row>
                                                    <Table width="100%" style={{ border: '1px solid #bbb' }}>
                                                        <Tbody style={{ width: '100%'}}>
                                                            <Tr>
                                                                <Td width={45}>
                                                                    <NotesBold>Notas:</NotesBold>
                                                                </Td>
                                                                <Td style={{paddingLeft: 6}}>
                                                                    <div style={{ float: 'left'}}>
                                                                        {
                                                                            it.moneyBills.map((it: any) => {
                                                                                return (
                                                                                    <div
                                                                                        style={{ marginLeft: 4, float: 'left', background: '#eee', width: 42, textAlign: 'center'}}>
                                                                                        <NotesBold style={{ textAlign: 'center', width: 42}}>{it.quantity}x</NotesBold>
                                                                                        <MoneyCard>R${parseFloat(it.value).toFixed(0)}</MoneyCard>
                                                                                    </div>
                                                                                )
                                                                            })
                                                                        }
                                                                    </div>
                                                                </Td>
                                                            </Tr>
                                                        </Tbody>
                                                    </Table>
                                                </div>
                                            )
                                        }
                                    </Td>
                                    <Td width={210}>
                                        <FrameResumeContainer>
                                            <table style={{ fontSize: 14 }}>
                                                <tr>
                                                    <TdLight>Total adiantado:</TdLight>
                                                    <TdBold>{formatter.format(cashAdvance)}</TdBold>
                                                </tr>
                                                <tr>
                                                    <TdLight>Total em prêmios: </TdLight>
                                                    <TdBold>{formatter.format(totalPrize)}</TdBold>
                                                </tr>
                                                <tr>
                                                    <TdLight>Balanço:</TdLight>
                                                    <TdBold>{formatter.format(balance)}</TdBold>
                                                </tr>
                                            </table>
                                        </FrameResumeContainer>
                                    </Td>

                                </Tr>
                            </Tbody>
                        </Table>
                    </FrameTitleContainer>

                </FrameHeader>
                <FrameBody>
                    <Table width="100%" style={{ margin: 0}}>
                        <thead style={{ background: '#ddd'}}>
                        <th style={{ textAlign: 'left', paddingLeft: 6 }}>Participante favorecido:</th>
                        <th>Assinatura</th>
                        <th>Valor</th>
                        </thead>
                    </Table>
                    {
                        Array.isArray(prizes) && prizes.map(item => renderPrize(item))
                    }
                </FrameBody>
            </FrameContainer>
        )
    }

    const MyDocument = () => {
        const {
            cashAdvance,
            program,
            date,
            time,
        } = json;
        const {
            name,
            costCenter,
        } = program;
        const {
            frames,
            totalPrize,
            balance,
        } = cashAdvance;

        const now = moment().format('L');
        return (
            <Capture>
                <Header>
                    <SbtLogoSpace>
                        <img src={"https://sbt-caravanas-assets.s3.amazonaws.com/sbt-logo.png"} width={65}/>
                    </SbtLogoSpace>
                    <DocTitleSpace>
                        <div style={{ width: '100%'} }>
                            <DocTitleH1>Relatório de Adiantamento Financeiro</DocTitleH1>
                        </div>
                    </DocTitleSpace>
                    <DocExpSpace>
                        <Row>
                            <LightText style={{ fontSize: 12 }}>Expedido em</LightText>
                        </Row>
                        <Row>
                            <span>{now}</span>
                        </Row>
                    </DocExpSpace>
                </Header>
                <ProgramDetailsSection>
                    <Table width="100%">
                        <Tbody>
                            <Tr>
                                <Td width={220}>
                                    <div className="logo-program-box">
                                        <img src={"https://sbt-caravanas-assets.s3.amazonaws.com/logo_silvio_santos.png"} height={126} style={{ borderRadius: 10, minWidth: 220 }} />
                                    </div>
                                </Td>
                                <Td width={400}>
                                    <ProgramDetailBox>
                                        <ProgramName>{name}</ProgramName>
                                        <Table>
                                            <Tbody>
                                                <Tr>
                                                    <Td width={120}><LightText>Folha cachet:</LightText></Td>
                                                    <Td><strong>21PSS050621</strong></Td>
                                                </Tr>
                                                <Tr>
                                                    <Td><LightText>Data:</LightText></Td>
                                                    <Td> <strong>{moment(date).format('L')}</strong></Td>
                                                </Tr>
                                                <Tr>
                                                    <Td><LightText>Horário:</LightText></Td>
                                                    <Td><strong>{time}</strong></Td>
                                                </Tr>
                                                <Tr>
                                                    <Td><LightText>Centro de custo:</LightText></Td>
                                                    <Td><strong>{costCenter}</strong></Td>
                                                </Tr>
                                            </Tbody>
                                        </Table>
                                    </ProgramDetailBox>
                                </Td>
                                <Td>

                                    <FrameResumeContainer>
                                        <table style={{ fontSize: 14 }}>
                                            <tr>
                                                <TdLight>Total adiantado:</TdLight>
                                                <TdBold>{formatter.format(cashAdvance.cashAdvance)}</TdBold>
                                            </tr>
                                            <tr>
                                                <TdLight>Total em prêmios: </TdLight>
                                                <TdBold>{formatter.format(totalPrize)}</TdBold>
                                            </tr>
                                            <tr>
                                                <TdLight>Balanço:</TdLight>
                                                <TdBold>{formatter.format(balance)}</TdBold>
                                            </tr>
                                        </table>
                                    </FrameResumeContainer>
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </ProgramDetailsSection>
                <FrameSection>
                    {
                        frames.map((item: any) => renderFrame(item))
                    }
                </FrameSection>
            </Capture>
        )
    }
    return (<MyDocument />)
};
export default CachetReport;

