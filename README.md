## React native with expo v49

- Firebase for authentication
- Firestore for storing user data
- Nativewind for tailwind support
- CustomKeyboardAvoidingView component with flags
- Firestore docs and collections for chatrooms and messaging

## Steps to start

1. - No env support as of this moment
```
cd constants && touch localConfig.js
```
- Write the firebase config from firebase dashboard to the localConfig.js and export it

2. Do install npm packages using
``` npm i ```



8. To build
```
npm install --global eas-cli && eas init --id <id-from-expo-project>
```
- For Andriod build
```
eas build -p android
```
- If ran into version mismatch or conflict issues
```
npx expo install --check
```
or simple 
```
rm -rf node_modules package-lock.json && npm i 
```