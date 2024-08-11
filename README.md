
# Code-RED example

This project is a React-based application that uses Zustand for state management. The app includes features for managing users, posts, and events, with a centralized error handling system to provide feedback to the user and validation for inputs.

## Installation

To get started, clone the repository and install the dependencies:

```bash
git clone https://github.com/MatijaKocevar/code-red-example.git
```
```bash
cd code-red-example
```
```bash
npm install
```

## How to Run

To start the application in development mode:

```bash
npm run dev
```

To build the application and push to gh-pages:

```bash
npm run deploy
```

To build the production build locally:

```bash
npm run build
```

## State Management

This project uses [Zustand](https://github.com/pmndrs/zustand) for state management. 

## API Integration

Created a proxy to redirect trafic from http://alpaca.code-red.si:12345 to https://matijakocevar.com/code-red-api. This is done for deploy to work. If the API is called directly we have problems since the it's in http.