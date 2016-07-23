#!/bin/bash
####################################
#
# Git Auto Deploy
#
####################################

if [ -z $1 ]
then
  echo "branch is undefined"
  exit 1
fi

git pull origin $1

exit 0
