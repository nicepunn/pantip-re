// import express from 'express';
// import { get } from 'axios';
// import { parseString } from 'xml2js';

// const app = express();

// // eslint-disable-next-line func-names
// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

// app.get('/', (req, res) => {
//   res.send('GET request');
// });

// app.post('/', (req, res) => {
//   res.send('POST request');
// });

// app.get('/pantip-feed', async (req, res) => {
//   try {
//     const response = await get('https://pantip.com/forum/feed');
//     const xml = response.data;
//     // const xml = response.data.testSteps
//     //   .replace(/[\n\r]/g, "\\n")
//     //   .replace(/&/g, "&amp;")
//     //   .replace(/-/g, "&#45;");

//     // eslint-disable-next-line consistent-return
//     parseString(xml, { trim: true }, (err, result) => {
//       if (err) {
//         return res.status(500).send(`Error parsing RSS feed: ${err.message}`);
//       }
//       res.json(result);
//     });
//   } catch (error) {
//     res.status(500).send(`Error fetching Pantip feed: ${error.message}`);
//   }
// });

// const PORT = process.env.PORT || 4000;
// // eslint-disable-next-line no-console
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
