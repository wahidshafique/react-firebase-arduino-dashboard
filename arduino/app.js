const firestore = require("./firestoreSecret");
const five = require("johnny-five");
const songs = require("./songs");

const arduinoBoardSwitchesDoc = firestore.doc("arduino/boardSwitches"); //basically for bools , eventually for state
const appStateDoc = firestore.doc("app/boardState");

const LEDPINS = [9, 10, 11]; //using an RGB LED for this
const PIEZOPIN = 3;

const REFRESH_RATE = 100;

arduinoBoardSwitchesDoc.set({
  isArduinoOn: false,
  isPlayingSong: false
});

five.Board({ repl: false }).on("ready", function() {
  arduinoBoardSwitchesDoc.update({ isArduinoOn: true });
  const rgb = new five.Led.RGB(LEDPINS);
  const piezo = new five.Piezo(PIEZOPIN);

  this.loop(REFRESH_RATE, async () => {
    const fbColor = await getColorFromAppState();
    rgb.color(fbColor); //not sure how extensive the range of the arduino LED is...

    arduinoBoardSwitchesDoc.get().then(doc => {
      const docData = doc.data();
      if (docData.isPlayingSong && !piezo.isPlaying) {
        piezoSong(piezo);
      }
    });
  });

  process.on("SIGINT", () => {
    process.exit();
  });
});

function getColorFromAppState() {
  return new Promise((res, rej) => {
    appStateDoc
      .get()
      .then(doc => {
        if (!doc.exists) {
          console.log("No such document initialized!");
          firestore
            .collection("app")
            .doc("boardState")
            .set({ ledColor: "#ff0000" });
        } else {
          return res(doc.data().ledColor);
        }
      })
      .catch(err => {
        console.log("Error getting document", err);
      });
  });
}

function piezoSong(piezo) {
  const randSong = songs[Math.floor(Math.random() * songs.length)];
  piezo.play(
    {
      // song is composed by an array of pairs of notes and beats
      // The first argument is the note (null means "no note")
      // The second argument is the length of time (beat) of the note (or non-note)
      song: randSong.song,
      tempo: randSong.tempo
    },
    () => {
      arduinoBoardSwitchesDoc.update({ isPlayingSong: false });
    }
  );
}
