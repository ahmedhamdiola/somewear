import db from "../config/db";
import { ContactUsInterface } from "../interfaces/ContactUsInterface";

//create contact us
export const createContactUs = (contact: ContactUsInterface): ContactUsInterface => {
    const contactUs = db.prepare<
        [string, string, string, string],
        ContactUsInterface
    >(
        `
        INSERT INTO contact_us
        (name,email,phone,message) VALUES (?,?,?,?)
        `
    );
    const result = contactUs.run(
        contact.name,
        contact.email,
        contact.phone,
        contact.message
    );
    return {
        id: Number(result.lastInsertRowid),
        ...contact
    };
}

//get contact us by id
export const getContactUsById = (id: number): ContactUsInterface | null => {
    const contactUs = db.prepare<[number], ContactUsInterface>(
        `SELECT * FROM contact_us WHERE id=?`
    );
    const result = contactUs.get(id);
    return result || null;
}

//get all contact us
export const getAllContactUs = (): ContactUsInterface[] => {
    const contactUs = db.prepare<[], ContactUsInterface>(
        `SELECT * FROM contact_us`
    );
    const result = contactUs.all();
    return result;
}

