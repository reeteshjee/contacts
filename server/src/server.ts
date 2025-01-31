import express, { Request, Response } from 'express';
import fs from "fs";
import path from "path";

interface Contact {
    id: string;
    name: string;
    phone: string;
    email: string;
    bookmarked: boolean;
}

const app = express();
app.use(express.json());

const contactsFilePath = path.join(__dirname, "contacts.json");
if (!fs.existsSync(contactsFilePath)) {
    fs.writeFileSync(contactsFilePath, JSON.stringify([])); // Create an empty file if not present
}
const readContactsFromFile = (): Contact[] => {
    const fileData = fs.readFileSync(contactsFilePath, "utf-8");
    return JSON.parse(fileData);
};

app.get("/contacts", (req: Request, res: Response) => {
    const contacts = readContactsFromFile();
    res.json(contacts);
});

const PORT = 3000;
app.listen(PORT, () => console.log("listening on " + PORT));