# Expo + AWS Amplify 
Expo React Native Project with AWS Amplify backend 

# Getting Started
1. Initialize the amplify project (if you don't have amplify CLI [install](https://aws-amplify.github.io/docs/) CLI)
```
amplify init
```
2. Configure Amazon Conginto User Pool 
```
amplify add auth
```
3. Add Amazon AppSync graphql API
```
amplify add api
```

4. After all configuration run 
```
amplify push
```

5. Install package and run project on IOS simulator
```
yarn install
yarn ios
```
