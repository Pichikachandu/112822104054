const express = require('express');
const dotenv = require('dotenv');
const { reqLogger, errLogger } = require('./middlewares/logMid');
const sampleRoute = require('./routes/sampleRoute');
dotenv.config();

const port = process.env.PORT;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "API Route is working!!" });
});

app.use(reqLogger);
app.use('/api', sampleRoute);
app.use(errLogger);



app.listen(port, () => {
    console.log(`The server is running on http://localhost:${port}`);
});
