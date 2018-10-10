# Setup

![](https://raw.githubusercontent.com/wahidshafique/react-firebase-arduino-tests/master/example.png)

Eexample of how to work with firebase, react/redux, and the johnny-five library.

# Objectives

- Brushing up on board communication and continuing on from previous [example](https://github.com/wahidshafique/react-firebase-arduino-tests)

- Since I am also integrating the previous example. I will basically use the same components as before, but with an added LED ticker component.

# Installation

Install the dependencies and devDependencies for the root folder, and the arduino subfolder.

Plug in your arduino and either run

```sh
$ yarn startArd
```

for just running up board

or if you want to see both the front end and serial communications in action, run

```sh
$ yarn startx
```

otherwise the normal

```sh
$ yarn start
```

# Hardware installation

## RGB Pins

## Piezo

## LCD Display

## Secrets

Your firebase keys for the application should be inside of the firestoreSecret

For the arduino, the file references a global_secrets folder, which should contain whatever key file your own firestore instance generates.

Read the [quickstart](https://www.npmjs.com/package/@google-cloud/firestore#quickstart) for more information

## License

MIT
