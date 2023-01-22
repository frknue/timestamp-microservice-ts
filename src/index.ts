import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(process.cwd() + "/public"));

app.get("/", (req: Request, res: Response) => {
    res.sendFile(process.cwd() + "/views/index.html");
});

app.get("/api/:date?", (req: Request, res: Response) => {
    const date = req.params.date;
    const newDate = new Date();
    let isDate = new Date(date);
    if (!date) {
        res.json({ unix: newDate.getTime(), utc: newDate.toUTCString() });
    } else {
        const resultTimestamp = Date.parse(date);
        if (!resultTimestamp) {
            const parsedDate = new Date(Number(date));
            if (!Number(date)) {
                res.json({ error: "Invalid Date" });
            }
            const utcString = parsedDate.toUTCString();
            res.json({ unix: Number(date), utc: utcString });
        } else {
            const parsedDate = new Date(date);
            const utcString = parsedDate.toUTCString();
            res.json({ unix: resultTimestamp, utc: utcString });
        }
    }
});

app.listen(3000, () => {
    console.log("Listening on port " + 3000);
});
