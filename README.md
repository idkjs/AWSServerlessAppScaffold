# AWSServerlessAppScaffold

Este projeto tem por objetivo desenvolver uma solução completa usando o paradigma Serverless contemplando:

### Backend
- Base de Dados (DynamoDB/Aurora Serverless/Athena);
- Funções (AWS Lambda);
- Filas de Processamento (AWS SQS);
- Serviços de Notificação (AWS SNS);
- Autenticação de Usuários e OpenID (AWS Cognito User Pools and Federation Pools);
- Interface de API's (API Gateway);
- Endpoint de Consulta de Dados usando GraphQL (AWS Appsync);
- Endpoint de Consulta Full Attributes (AWS CloudSearch/AWS ElasticSearch);
- Processamento em Batch (AWS ECS);
- Concentação de Logs (Amazon Cloudwatch);
- Gestão de Desempenho de Aplicações (AWS X-Ray);
- Content Delivery Network usando SSL (Amazon Cloudfront).

### Frontend
Para acesso aos serviços de Backend relacionados acima, foram planejados os seguintes componentes de frontend:
- Frontend SPA (Angular on AWS S3);
- iOS 12 App with AWS-SDK;
- Android O App with AWS-SDK.

## Padrões Arquiteturais
Para construção deste projeto foram considerados os seguintes padrões arquiteturais:

### Microserviços:
O Sistema será composto por um conjunto independente de serviços, cada um com um ciclo de vida próprio e autônomo. Cada microserviço deverá contemplar todos os componentes necessários para armazenar de forma persistente os seus dados, definir os endpoints públicos e encaminhar mensagens.

### Event Source - Pub/Sub
Cada microserviço irá expor tópicos para subscrição com relação aos eventos que fazem parte do seu ciclo de vida de negócio. Os tópicos abertos a subscrição devem obedecer o paradigma fan-out, podendo ser processados por mais de um serviço subscrito.

## Motivação Tecnológica
Este projeto foi planejado com o objetivo de servir como playground para testar as práticas e arquiteturas propostas para o paradigma Serverless, indicando seus pontos fortes, pontos fracos e armadilhas.

## Motivação de Negócio
Este projeto pode ser utilizado como raiz para criação de novos projetos baseados em pessoas físicas e jurídicas. Esta raiz contempla o cadastramento de empresas e pessoas e relacionamentos genéricos entre estes. Contempla também um pipeline para processos genéricos e repositórios de documentos e mídias (vídeos, sons e fotos).