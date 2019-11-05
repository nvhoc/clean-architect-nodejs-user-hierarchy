# user-hierarchy

In the project, I will init with clean architect. Please find its reference at https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html

## Why

1. Clean architect help me focusing on delivering business use cases firstly and implement technical later. Our use cases will not depends on any libaries and frameworks. It will be used only pure Progamming Language ( I am choosing Javascript ) and open interface for our Technical Provider can provide.

2. Simple way to write testing, we can do Acceptable Test by write testing for use cases to make sure our application works well. Moreover, We do Unit Test in our provider function without depend on other tiers.

3. Our app can be improved performance in future. Because we implement technical provider laterly so that mean we can improve a technical provider by moving to a microservice or refactor our code perfomance without affect to our business use cases

## How to run

### Prerequisites

- docker

### Installation

* docker
- docker-compose up
