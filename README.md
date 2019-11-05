# user-hierarchy

The problem is so interesting that I want to build a service in real life.

## How to run

### Prerequisites

- docker
- node v10.16.3
- yarn v1.19.1

### Installation

#### DockerCompose Up

* docker
- docker-compose up

#### API

Please check document in https://documenter.getpostman.com/view/9117914/SW15xwEK?version=latest

You can create a new user or new role then do request get-sub-ordinates

### Run Test

#### Yarn

- yarn
- yarn test

#### Change Test Case

You can change init data in init file
src/core/usecases/users/test/init.js

## My solution

In the project, I will init with clean architect. Please find its reference at https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html

### Why have I used clean architect

1. Clean architect help me focusing on delivering business use cases firstly and implement technical later. Our use cases will not depends on any libaries and frameworks. It will be used only pure Progamming Language ( I am choosing Javascript ) and open interface for our Technical Provider can provide.

2. Simple way to write testing, we can do Acceptable Test by write testing for use cases to make sure our application works well. Moreover, We do Unit Test in our provider function without depend on other tiers.

3. Our app can be improved performance in future. Because we implement technical provider laterly so that mean we can improve a technical provider by moving to a microservice or refactor our code perfomance without affect to our business use cases

## My scirpt

### in the first step

My project structure includes 4 main paths: config, core, provider, const.

- config: keep all configuration for our project.
- core: keep requirement from business and writing without framework
- provider: provide technical solution for business
- const: include every enum helpful to make more clear

I translate the requirement to 2 entities and use cases around 2 entities.
![alt entities](/document/image/entities.jpg)
![alt usecases](/document/image/usecases.jpg)

Our main use cases is get-sub-ordinates
![alt get-sub-ordinates](/document/image/getSubOrdinate.jpg)

The key of our pefomance is findSubOrdinates function of RoleModel.

```js
  async findSubOrdinatesV1(roleId) {
    const self = this
    let theLastSubs = []
    const directSubs = await self._model.find({ parent: roleId })
    const requestGet = []
    for (let i = 0; i < directSubs.length; i += 1) {
      const r = directSubs[i]
      theLastSubs.push(r.id)
      requestGet.push(self.findSubOrdinatesV1(r.id))
    }
    const childrenSubs = await Promise.all(requestGet)
    for (let i = 0; i < childrenSubs.length; i += 1) {
      const s = childrenSubs[i]
      theLastSubs = theLastSubs.concat(s)
    }
    return theLastSubs
  }
```

### improve performance

This is one of pros of clean architect. We only take care about technical aspect in improvement. Here, we improve findSubOrdinates function only.

The first solution is using recursion and doing many request, that can hit our stack overload and high request to our database. My solution to get all Roles from db and storage as a tree. Let check the code

```js
  async findSubOrdinatesV2(roleId) {
    const roles = await this._model.find({})
    const roleTree = {}
    for (let i = 0; i < roles.length; i += 1) {
      const r = roles[i]
      const { id, parent } = r
      if (!roleTree[parent]) {
        roleTree[parent] = { id: parent, children: [] }
      }
      if (!roleTree[id]) {
        roleTree[id] = { id, parent, children: [] }
      }
      let ptrParent = roleTree[parent]
      while (ptrParent) {
        ptrParent.children.push(id)
        ptrParent = roleTree[ptrParent.parent]
      }
    }
    return (roleTree[roleId] && roleTree[roleId].children) || []
  }
```

The perfomance of the function in the worst case is O(n2), but n is not too big. It is hard to have a company with n > 100.

Anyway, We can improve it performance when needed by global caching or store data in roleTree data structure. But, it will be over enginering if our roles not big enough. Because we must make sure our data consistency by create/update one.
