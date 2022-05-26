# desafio-integracao

Requisitos: 
node v10.24.1 ou superior;
Compartilhar sua Planilha Google com o seguinte endereço de e-mail: 


Passo a passo para configuração: 

1 => Após clonar o projeto, acessar a pasta do projeto, via terminal, e rodar o comando "npm install", para instalar as seguintes dependências: [  
    "@hubspot/api-client": "^6.0.1",
    "company-email-validator": "^1.0.7",
    "dotenv": "^16.0.1",
    "email-validator": "^2.0.4",
    "google-spreadsheet": "^3.3.0"
]

2 => Renomear o arquivo .env-example para .env

3 => No arquivo .env estão definidas 3 variáveis de ambientes:

    HUBSPOT_API_KEY = "your hubspot apikey comes here"
    WORKSHEET_ID = "the id of your google spreadsheet comes here."
    SHEET_TITLE = "the title of your google spreadsheet comes here." 

    Você deverá setar esses valores, ou seja, atribuir valores reais às variáveis HUBSPOT_API_KEY, WORKSHEET_ID e SHEET_TITLE.
    Para isso, siga as seguintes instruções para conseguir essas informações.

4 => Capturando os valores a serem atribuídos às variáveis de ambiente: 

    4.1 => HUBSPOT_API_KEY :
        Acesse o site https://app.hubspot.com , e faça o login. 
        Clique no botão de configurações, localizado no menu superior. 
        Agora role pelo menu lateral até "Configurações de conta", clique no submenu dropdown "Integrações" e selecione "Chave de API", conforme indicado pela figura 2:
        Caso você nunca tenha gerado uma Chave de Api na plataforma, irá aparecer um botão para criar Chave de Api. Clique nele e copie a chave gerada. Caso já tenha Chave de Api cadastrada, apenas clique em "Mostrar" e copie a chave.
        Pronto, agora você já tem o valor da sua chave de api da hubspot. 
        Volte no arquivo .env e cole a chave dentro das aspas:
        HUBSPOT_API_KEY = "your hubspot apikey comes here".

    4.2 => WORKSHEET_ID :

    4.3 => SHEET_TITLE :

Pronto, agora suas variáveis de ambiente estão setadas. Salve as alterações do arquivo .env, e feche-o.


5 => Configurar as credenciais do Google Cloud. Você precisará criar uma Conta de Serviço. 

    5.1 => Acesse o site https://cloud.google.com/
    5.2 => Caso seja seu primeiro acesso, você deverá:
                Clicar em "Fazer Login", no menu. Conforme indicado na figura a seguir:
                ![alt text](images/login-google-cloud.png)