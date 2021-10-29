#!/bin/bash
echo Adding pm2********************************
yarn global add pm2 
echo Moving to production**********************
echo Building**********************************
yarn build 
echo Distibution*******************************
yarn dist

