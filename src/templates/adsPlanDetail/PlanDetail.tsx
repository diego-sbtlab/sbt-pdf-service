import * as React from 'react';
import {
    SbtLogoText,
    Campaign,
    Header,
    SbtLogoSpace,
    Table,
    Tr,
    Td,
    Title,
    Program,
    TitleXL,
    CampaignInfo,
    Hr
} from "./components";
import moment from 'moment';

// @ts-ignore
const PlanDetail = ({ campaign }) => {
    const {
        id,
        name,
        impact,
        condecineCost,
        videoCost,
        liquidAmount,
        startDate,
        endDate,
        products,
        date
    } = campaign;

    const tv = [];
    const digital = [];
    let cTV = 0;
    let cDigital = 0;

    const formatMoneyBR = (value = 0) => {
        const formatter = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 2
        });
        return formatter.format(value || 0);
    }

    for (let product of products) {
        for (let format of product.formats) {
            if (format.amount > 0) {
                if (format.platform == 'tv') {
                    cTV += format.amount;

                    let p = tv.find(p => p.id == product.id);
                    let i = -1;
                    if (!p) {
                        p = {
                            id: product.id,
                            name: product.name,
                            formats: []
                        };
                        tv.push(p);
                        i = tv.length - 1;
                    } else {
                        i = tv.indexOf(p);
                    }

                    tv[i].formats.push(format);
                } else {
                    cDigital += format.amount;

                    let p = digital.find(p => p.id == product.id);
                    let i = -1;
                    if (!p) {
                        p = {
                            id: product.id,
                            name: product.name,
                            formats: []
                        };
                        digital.push(p);
                        i = digital.length - 1;
                    } else {
                        i = digital.indexOf(p);
                    }

                    digital[i].formats.push(format);
                }
            }
        }
    }

    return (
        <Campaign>
            <Header>
                <SbtLogoSpace>
                    <img src={"https://d2trnviq4pshz.cloudfront.net/logo-ads.png"} width={90} height={90} />
                </SbtLogoSpace>
                <SbtLogoText>ADS</SbtLogoText>
            </Header>
            <TitleXL>Plano de veicula????o de m??dia programada</TitleXL>
            Data de gera????o: {moment(date).format('DD/MM/YYYY HH:mm:ss')}
            <CampaignInfo>
                <b>ID: </b>{id}<br />
                <b>Nome da campanha: </b>{name}<br />
                {parseInt(impact) > 0 && <div><b>Impacto: </b>{parseInt(impact)}<br /></div>}
                <b>Investimento: </b>{formatMoneyBR(condecineCost + videoCost + liquidAmount)}<br />
                <b>Per??odo da Campanha: </b>{moment(startDate).format('DD/MM/YYYY')} at?? {moment(endDate).format('DD/MM/YYYY')}<br />
                <b>TV: </b>{cTV} inser????es<br />
                {digital.length > 0 && <div><b>Digital: </b>{cDigital} mil views<br /></div>}
            </CampaignInfo>
            <Hr />
            <Title>Produtos (TV)</Title>
            {tv.map(p =>
                <Program>
                    <p><b>{p.name}</b></p>
                    <Table>
                        <Tr>
                            <Td><b>QTD INSER????ES</b></Td>
                            <Td><b>FORMATO</b></Td>
                            <Td><b>VALOR UNITARIO</b></Td>
                            <Td><b>VALOR TOTAL</b></Td>
                        </Tr>
                        {p.formats.map(f =>
                            <Tr>
                                <Td>{f.amount}</Td>
                                <Td>{f.name}</Td>
                                <Td>{formatMoneyBR(f.unitPrice)}</Td>
                                <Td>{formatMoneyBR(f.unitPrice * f.amount)}</Td>
                            </Tr>
                        )}
                    </Table>
                </Program>
            )}
            <br /><br />
            {digital.length > 0 && <Title>Produtos (Internet)</Title>}
            {digital.map(p =>
                <Program>
                    <p><b>{p.name}</b></p>
                    <Table>
                        <Tr>
                            <Td><b>FORMATO</b></Td>
                            <Td><b>IMPRESS??ES</b></Td>
                            <Td><b>CPM</b></Td>
                            <Td><b>VALOR TOTAL</b></Td>
                        </Tr>
                        {p.formats.map(f =>
                            <Tr>
                                <Td>{f.name}</Td>
                                <Td>{f.amount * 1000}</Td>
                                <Td>{formatMoneyBR(f.unitPrice)}</Td>
                                <Td>{formatMoneyBR(f.unitPrice * f.amount)}</Td>
                            </Tr>
                        )}
                    </Table>
                </Program>
            )}
        </Campaign>
    );
};

export default PlanDetail;