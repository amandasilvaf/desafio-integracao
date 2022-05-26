require('dotenv').config()

const credentials = require('./credentials.json');
const worksheetId = process.env.WORKSHEET_ID;
const sheetTitle = process.env.SHEET_TITLE;

const { GoogleSpreadsheet } = require('google-spreadsheet');

const hubspot = require('@hubspot/api-client');
const hubspotApiKey = process.env.HUBSPOT_API_KEY;
const hubspotClient = new hubspot.Client({ "apiKey": hubspotApiKey });

const validEmailValidator = require("email-validator");
const corporateEmailValidator = require("company-email-validator");




(async function runIntegrationChallenge() {
    const emailsFromCurrentContacts = await getAllContactsFromHubSpot();
    const rows = await readSheet();
    const contactsToSendToHubspot = await filterContactsToSendToHubspot(rows, emailsFromCurrentContacts)
    await sendContactsToHubspot(contactsToSendToHubspot);
}());




async function getAllContactsFromHubSpot(){

    let currentContacts = await hubspotClient.crm.contacts.getAll();

    let emailsFromCurrentContacts = currentContacts.map(contact => {
        return contact.properties.email;
    });

    return emailsFromCurrentContacts;
}


async function readSheet(){

    const doc = new GoogleSpreadsheet(worksheetId);

    await doc.useServiceAccountAuth({
        client_email: credentials.client_email,
        private_key: credentials.private_key.replace(/\\n/g, '\n')
    });

    await doc.loadInfo(); 

    const sheet = doc.sheetsByTitle[sheetTitle]
    const rows = await sheet.getRows();

    return rows;
}


async function filterContactsToSendToHubspot(rows, contactsEmails){

    var contactsToSendToHubspot = rows.filter(row => {
        return ((!isContactAlreadyRegisteredOnHubspot(row.email, contactsEmails)) && emailIsValid(row.email))
    })

    return contactsToSendToHubspot;
}




async function sendContactsToHubspot(contactsToSendToHubspot){

    for await(contact of contactsToSendToHubspot){
        const properties = {
            company: contact.company,
            email: contact.email,
            firstname: contact.firstname,
            lastname: contact.lastname,
            phone: contact.phone,
            website: contact.website
        };
        try{
            await hubspotClient.crm.contacts.basicApi.create({ properties });
            console.log(`contact created: ${properties.email}`)
        }catch(err){
            err.message === 'HTTP request failed'
                 ? console.error(JSON.stringify(err.response, null, 2))
                 : console.error(err);
        }
       
    }
}


function isContactAlreadyRegisteredOnHubspot(email, emails){
    return emails.includes(email);
}



function emailIsValid(email){
    if(validEmailValidator.validate(email)){
         if(corporateEmailValidator.isCompanyEmail(email)){
             return true
         }
         console.log('Not corporate e-mail adress.')
         return false;
    }
    console.log('Invalid e-mail adress.'); 
    return false 
}




