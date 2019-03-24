/* Node Modules */

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

/* Settings */

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 4000;

/* Routing */

app.get("/", (req, res) => res.send("Hello World!"));

const customDataInfomations = { subscription: null };

const saveDataInfo = async subscription => {
    
    customDataInfomations.subscription = subscription;
    
};


app.post("/data-push-request", async (req, res) => {

    const subscription = req.body;
    
    await saveDataInfo(subscription);
    
    res.json({ message: "success" });
    
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
