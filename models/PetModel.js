const db = require('../Db/connectDb');
const pet = {
    getPets:(cb)=> db.query('Select id, name,price,image from pet',cb),
    getPetById:(id,cb)=> db.query('Select id,name,price,image from pet where id=?',
    [id],cb),
    createPet:(pet,cb)=>db.query('Insert into pet(name,price,image) values(?,?,?)',
    [pet.name, pet.price,pet.image], cb),
    updatePet:(id,pet,cb)=>db.query('Update pet set name=?, price=?, image=? where id=?',
    [pet.name, pet.price,pet.image,id], cb),
    deletePet:(id,cb)=>db.query('delete from pet where id=?',[id],cb)    
};
module.exports = pet;