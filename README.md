# Flip book

<img src="https://github.com/Mohammad-Al-Refai/flip-book/assets/55941955/ef32dac3-dfd3-4707-92a5-3b3849b84c36" width="200"/>

## Using
- React js
- Typescript
- Webassembly
- Golang version 1.21.4
- Node js version 21.7.2


## Screenshot

![image](https://github.com/Mohammad-Al-Refai/flip-book/assets/55941955/76d8e92d-58a3-409d-b5e3-67c717e0dfef)


## Compile Go to wasm
### Go to backend folder
```
cd backend
```

### Run this command for building the wasm
```
GOOS=js GOARCH=wasm go build -o main.wasm main.go
```

### Move main.wasm to public folder

```
mv "main.wasm" ../frontend/public
```

## Build frontend 
### Go to frontend folder
```
cd frontend
```
### Install dependencies
```
yarn install
```
### Run

```
yarn dev
```

### Build

```
yarn build
```

### Preview the build

```
yarn preview
```