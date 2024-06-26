# Flip book

<img src="https://github.com/Mohammad-Al-Refai/flip-book/assets/55941955/ef32dac3-dfd3-4707-92a5-3b3849b84c36" width="200"/>

## Using

- React js v18.2.0
- Typescript v5.4.3
- Golang v1.21.4
- Node js v21.7.2
- WebAssembly

## Screenshot

![image](https://github.com/Mohammad-Al-Refai/flip-book/assets/55941955/8fe0f559-b9eb-47c6-be8f-a3817598e189)

## Compile Go to wasm

### Go to wasm-go folder

```bash
cd wasm-go
```

### Run this command for building the wasm

```bash
GOOS=js GOARCH=wasm go build -o main.wasm main.go
```

### Move main.wasm to public folder in frontend folder

```bash
mv "main.wasm" ../frontend/public
```

## Build frontend

### Go to frontend folder

```bash
cd frontend
```

### Install dependencies

```bash
yarn install
```

### Build

```bash
yarn build
```

## Run

```bash
yarn dev
```

### Preview the build

```bash
yarn preview
```
