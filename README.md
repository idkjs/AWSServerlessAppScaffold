# AWSServerlessAppScaffold

This project aims to develop a complete solution using the Serverless paradigm contemplating:

### Backend
Database (DynamoDB / Aurora Serverless / Athena);
Functions (AWS Lambda);
Processing Queues (AWS SQS);
Notification Services (AWS SNS);
User Authentication and OpenID (AWS Cognito User Pools and Federation Pools);
API's Interface (API Gateway);
Data Query Endpoint using GraphQL (AWS Appsync);
Full Attributes Query Endpoint (AWS CloudSearch / AWS ElasticSearch);
Batch Processing (AWS ECS);
Logs Concentration (Amazon Cloudwatch);
Performance Management of Applications (AWS X-Ray);
Content Delivery Network using SSL (Amazon Cloudfront).
Frontend
For access to the Backend services listed above, the following frontend components have been devised:

### Frontend SPA (Angular on AWS S3);
iOS 12 App with AWS-SDK;
Android The App with AWS-SDK.
Architectural Patterns
For the construction of this project, the following architectural standards were considered:

### Microservices:
The System will be composed of an independent set of services, each with its own autonomous life cycle. Each microservice must include all the necessary components to persistently store your data, define public endpoints and forward messages.

### Event Source - Pub / Sub
Each microservice will expose subscription topics for events that are part of your business life cycle. The topics open to subscription must obey the fan-out paradigm, and can be processed by more than one subscribed service.

### Technological Motivation
This project was designed to serve as a playground to test the practices and architectures proposed for the Serverless paradigm, indicating its strengths, weaknesses, and pitfalls.

### Business Motivation
This project can be used as root for creation of new projects based on individuals and legal entities. This root includes the registration of companies and people and generic relationships between them. It also includes a pipeline for generic processes and repositories of documents and media (videos, sounds and photos).
