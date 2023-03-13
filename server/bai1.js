// const brain = require("brain.js");

// // const network = new brain.NeuralNetwork();
// const network = new brain.recurrent.LSTM();
// const data = [
//   {
//     text: "my unit test failed",
//     category: "software",
//   },
//   {
//     text: "tried the program, but it was buggy",
//     category: "software",
//   },
//   {
//     text: "i need a new power supply",
//     category: "hardware",
//   },
//   {
//     text: "the drive has a 2TB capacity",
//     category: "hardware",
//   },
//   {
//     text: "unit-tests",
//     category: "software",
//   },
//   {
//     text: "program",
//     category: "software",
//   },
//   {
//     text: "power supply",
//     category: "hardware",
//   },
//   {
//     text: "drive",
//     category: "hardware",
//   },
//   {
//     text: "it needs more memory",
//     category: "hardware",
//   },
//   {
//     text: "code",
//     category: "software",
//   },
//   {
//     text: "i found some bugs in the code",
//     category: "software",
//   },
//   {
//     text: "i swapped the memory",
//     category: "hardware",
//   },
//   {
//     text: "i tested the code",
//     category: "software",
//   },
//   {
//     text: "i love computers",
//     category: "hardware",
//   },
//   {
//     text: "programming",
//     category: "software",
//   },
//   {
//     text: "i broke my pc",
//     category: "hardware",
//   },
//   {
//     text: "computer",
//     category: "hardware",
//   },
//   {
//     text: "buy me a laptop",
//     category: "hardware",
//   },
//   {
//     text: "i love to play games",
//     category: "software",
//   },
// ];

// const trainData = data.map((item) => {
//   return {
//     input: item.text,
//     output: item.category,
//   };
// });

// network.train(trainData, {
//   iterations: 2000,
//   log: (details) => console.log(details),
//   logPeriod: 100,
// });

// const output = network.run("code is buggy");

// console.log(`Prob: ${output}`);
