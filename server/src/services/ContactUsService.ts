import { ContactUsInterface } from "../interfaces/ContactUsInterface";
import * as ContactUsRepository from "../repository/ContactUsRepository";


//create contact us
export const createContactUsService=(contact:ContactUsInterface):ContactUsInterface=>{
    if(!contact.name || contact.name.trim()===""){
        throw new Error("Name is required");
    }
     if(!contact.email || contact.email.trim()===""){
        throw new Error("Email is required");
    }
     if(!contact.phone || contact.phone.trim()===""){
        throw new Error("Phone is required");
    }
     if(!contact.message || contact.message.trim()===""){
        throw new Error("Message is required");
    }
    return ContactUsRepository.createContactUs(contact);
}
export const getContactUsService=(id:number):ContactUsInterface | null=>{
    if(!id || id<=0){
         throw new Error ("Invalid contact us ID ")
    }
    return ContactUsRepository.getContactUsById(id);
}
export const getAllContactUsService=():ContactUsInterface[]=>{
    return ContactUsRepository.getAllContactUs();
}

export default {
    createContactUsService,
    getContactUsService,  
    getAllContactUsService
}