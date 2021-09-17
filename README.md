# Introdução

Este repositório tem como objetivo permitir a realização de testes de carga utilizando a ferramenta de testes k6.

## Instalação

Antes de iniciar a execução dos testes, será necessário realizar o download do k6 através da seguinte url https://k6.io/docs/getting-started/installation.

Após realizar o download e a instalação, basta abrir uma janela do terminal e executar o seguinte comando para verificar se a instalação foi efetuada corretamente:

```bash
> k6 version
```
Caso retorne a versão da ferramenta, quer dizer que até o momento tudo está certo.

## Como usar?

Para utilizar os testes de carga do repositório, basta abrir uma tela do terminal e acessar a pasta raíz do repositório e executar o seguinte comando:

### Execução de teste de carga

```bash
> k6 run .\src\loadTests.js -u {users} -d {duration} -e ENVIRONMENT={LOCAL/DSV/HML/PRD} -e SCENERY={scenery_name} -e DEBUG={true/false} -e SLEEP={interval}
```

Parâmetros:

* **-u**: Determina a quantidade de usuários a ser usado durante o teste.
* **-d**: Determina a duração do teste, sendo informado o valor númerico + a unidade de tempo (s = segundo, m = minuto e h = hora).
* **-e**: Determina variáveis de ambiente utilizadas no script de execução. Atualmente temos as seguintes variáveis:
    * **ENVIRONMENT**: Informa o ambiente no qual será efetuado o teste (LOCAL/DSV/HML/PRD).
    * **SCENERY**: Informa qual o cenário que será testado (o nome do cenário está relacionado ao nome do script de teste).
    * **DEBUG**: Informa se o log das requests deve ser exibido no terminal.
    * **SLEEP**: Informa um tempo de sleep para a execução de cada request (em segundos)

## Como adicionar novos cenários?

Para implementar novos cenários dentro da solução de teste de carga, basta implementar os seguintes pontos:

1. Adicionar dentro da pasta **projects** uma nova pasta com o nome do projeto ou API caso ainda não exista:

2. Adicionar dentro da pasta criada um arquivo .js com o nome **base** com o seguinte modelo de código:

```javascript
import { host } from '../host.js'

export function nome_da_api_ou_projeto() {

    return {
        hostName: host().getHostName(),
        path: 'proxy_reverso'
    };
}
```
informações:
* **host**: Função que retorna um objeto com o hostname com base no ambiente informado na variavel de ambiente **ENVIRONMENT**


3. Adicionar dentro da pasta criada um arquivo .js com o nome do cenário com o seguinte modelo de código:

```javascript
import { nome_da_api_ou_projeto } from './base.js'

export function novo_cenario() {
    const api = nome_da_api_ou_projeto()

    return {
        hostName: api.hostName,
        path: api.path,
        requests: [
            {
                endpoint: `rota_para_ser_testada`,
                method: 'GET',
                payload: null,
                headers: {
                    'Content-Type': 'application/json'
                }   
            }
        ]
    };
}
```
Obs.: No caso de o endpoint não possuir header ou request body, basta informar como `null`.

4. Importar no topo do arquivo **scenery.js** o arquivo .js que foi criado para o novo cenário:

```javascript
import { novo_cenario } from './projects/nome_da_api_ou_projeto/novo_cenario.js';
```

5. Ainda no arquivo **scenery.js**, adicionar um novo case para o cenário conforme exemplo abaixo:

```javascript
    switch (__ENV.SCENERY.toLowerCase())
    {
        case 'novo_cenario':
            scenery = novo_cenario();
            break;
        default:
            throw 'Cenário de teste não encontrado.';
    }
```

Feito estes procedimentos, o novo cenário estará pronto para ser executado.