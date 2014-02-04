Welcome to StupidGSO-Server!
====================

[![Build Status](https://travis-ci.org/medokin/stupid-gso-server.png?branch=master)](https://travis-ci.org/medokin/stupid-gso-server)
[![Code Climate](https://codeclimate.com/github/medokin/stupid-gso-server.png)](https://codeclimate.com/github/medokin/stupid-gso-server)
[![Dependency Status](https://david-dm.org/medokin/stupid-gso-server.png)](https://david-dm.org/medokin/stupid-gso-server)

Live-Version and API description: [api.gso.medok.in][2]

How to install
---------

- Make sure you have **node**, **npm** and **git** installed.
- Install necessary global npm packages

```
npm install -g bower
```
- Get the Code

```
git clone https://medokin@bitbucket.org/medokin/stupid-gso-server.git

cd stupid-gso-server
```

- Get project dependencies

```
npm install

bower install
```


Running
---------
```
node index
```
Server should start on http://localhost:3001

Tests
---------
```
npm install -g jasmine-node
npm test
```

Client
---------
You can also use our client. The code can be found here: [StupidGSO-Client][1]



  [1]: https://github.com/medokin/stupid-gso-client
  [2]: http://api.gso.medok.in

