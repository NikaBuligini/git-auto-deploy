# Git auto deploy

[![build](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![npm](https://img.shields.io/badge/npm-3.8.9-blue.svg)]()
[![node](https://img.shields.io/badge/node-6.2.0-yellow.svg)]()
[![npm](https://img.shields.io/npm/l/express.svg)](https://github.com/NikaBuligini/git-auto-deploy/blob/master/LICENSE)

Deploy your project automatically from your github repository

## Installation

First of all install dependencies with command:

```{engine='sh'}
npm install
```

after this configure your git cli properly with this command:

```{engine='sh'}
git config --global alias.up '!git remote update -p; git merge --ff-only @{u}'
```

We will use **git up alias** for pulling changes from repository. If you are interested why we are doing this, check [this](http://stackoverflow.com/questions/15316601/in-what-cases-could-git-pull-be-harmful/15316602#15316602).

you will also need to install gulp-cli on your machine

```{engine='sh'}
sudo npm install -g gulp-cli
```
