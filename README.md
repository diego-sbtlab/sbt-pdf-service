# SBT-Service-File


### Apps utilizando esse serviço

#### Caravanas

A applicação Caravanas utiliza as seguintes funções desse serviço: 
- `sbt-caravanas-service-file-prod-cachetReport` para gerar Pdf de folha cachet de adiantamentos financeiros
- `sbt-caravanas-service-file-dev-prizeReceipt` para gerar Pdf de recibo de prêmio de participantes

## Como utilizar este serviço - Exemplo Adicionar um PDF

### 1 - Colocar seu html na pasta template

Crie uma pasta dentro de template, onde você colocará todo o seu Html e estilos.
```
├── src
│
│   ├── templates               
│   │   ├── 📁 meuHtmlExemplo   
│   │   │   ├── Exemplo.tsx     # Exemplo usando react (recomendado)
│   │   │   ├── components.ts   # Os compenentes de Exemplo.tx estão em styledComponents
│   │   │   └── styles.css      # Css se precisar
│   │   └── 📁            
```

### 2 - Adicionar sua função na pasta functions

```
├── src
│   ├── functions               
│   │   ├── meuPdf
│   │   │   ├── handler.tsx     #  Entrypoint que recebe os dados do endpoint, chama o template e retorna o PDF
│   │   │   ├── index.ts        #  arquivo que configura o endpoint      
```

### 3 - Adicionar o nome/path da sua função em serverless.ts
O arquivo serveless.ts desempenha o mesmo papel do arquivo serverless.yml. Para incluir sua função 

```
import minhaFuncao from "@functions/minhaFuncao"; # <-- importe sua funcao aqui

const serverlessConfiguration: AWS = {
  custom: { ... },
  plugins: [ ...],
  provider: {...},
  functions: {
    cachetReport,
    prizeReceipt,
    minhaFuncao,  # <-- coloque sua funcao aqui
  },
};
```

### Observações:

#### Sobre o folders files, fonts, lib
Esses diretórios são necessários pois estes contém binarios nativos que fazem a conversão do html em pdf.
Esses diretórios são carregados via plugin, configurado no arquivo webpack.config.js, conforme mostrado abaixo:
```
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "./files/", to: "./" },
        { from: "./lib/", to: "./lib" },
        { from: "./fonts/", to: "./fonts" },
      ],
    }),
  ],
```

> **Requirements**: NodeJS `lts/fermium (v.14.15.0)`. If you're using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to ensure you're using the same Node version in local and in your lambda's runtime.
