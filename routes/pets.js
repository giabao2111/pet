const express = require('express');
const router = express.Router();
const pet = require('../models/PetModel');
const multer = require('multer');
var storage = multer.diskStorage({
    //thiết lập thư mục chứa hình ảnh
    destination:(req, file,cb)=>{
        cb(null, './public/images');
    },
    filename:(req,file,cb)=>{
        cb(null, file.fieldname+"-" + Date.now()+".jpg");
    },    
});
var upload = multer({storage:storage});
//định nghĩa các routes
router.get('/', (req,res,next)=>{
    pet.getPets(function(err, rows){
        if(err){
            throw err;
        }
        //có dữ liệu truyền dưới dạng tham số qua cho trang index
        res.render('pet/index',{pets:rows});
    });
});
router.get('/create', function(req,res,next){
   res.render('pet/create');
});
router.post('/create', upload.single('image'), (req,res,next)=>{
    const file = req.file;
    req.body.image = file.filename;
    pet.createPet(req.body,(err,rows)=>{
        if(err){
            throw err;
        }
        res.redirect('/pet'); //tạo mới thành công chuyển về trang index
    });
});
router.get('/update/:id', function(req,res,next){
    pet.getPetById(req.params.id,(err,rows)=>{
        if(err){
            throw err;
        }
        res.render('pet/update',{pet:rows[0]});
    });
});
router.post('/update/:id',(req,res,next)=>{
    pet.updatePet(req.params.id, req.body,(err, rows)=>{
        if(err){
            throw err;
        }
        res.redirect('/pet'); 
    });
});
router.get('/delete/:id', function(req,res,next){
    pet.deletePet(req.params.id,(err,rows)=>{
        if(err){
            throw err;
        }
        res.redirect('/pet');
    });
});
module.exports = router;