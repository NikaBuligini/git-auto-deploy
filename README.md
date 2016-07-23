# Git auto deploy

Deploy your project automatically from your github repository

## Installation

First of all configure your git cli properly with this command:

```{engine='sh'}
git config --global alias.up '!git remote update -p; git merge --ff-only @{u}'
```

We will use **git up alias** for pulling changes from repository. If you are interested why we are doing this, check [this](http://stackoverflow.com/questions/15316601/in-what-cases-could-git-pull-be-harmful/15316602#15316602).
