import asyncHandler from "async-handler"




const getContacts = asyncHandler(async (req, res) => {
    res.json({ message: "Get All Contact" });
});

const createContact = asyncHandler(async (req, res) => {
    console.log("the request body is: ", req.body);
    const {name, email, phone} = req.body
    if(!name || !email || phone) {
        res.status(400);
        throw new Error("All fields are requried")
    }
    res.status(201).json({ message: "Create Contact" });
});

const getContact = asyncHandler(async(req, res) => {
    res.json({ message: `Get Contact for ${req.params.id}` });
});

const updateContact = asyncHandler(async(req, res) => {
    res.status(201).josn({message: `Update contact for ${req.params.id}`})
});

const deleteContact = asyncHandler(async(req, res) => {
    res.status(200).json({message: "Create contact"});
});
 


export {getContact, createContact, getContacts,updateContact, deleteContact}

