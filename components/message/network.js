const express = require('express');
const multer = require('multer');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');

const upload = multer({
    dest : 'public/files/'
});

router.get('/', function (req, res){
    const filterMessage = req.query.user || null;
    controller.getMessages(filterMessage).then((messageList)=>{
        response.success(req, res, messageList, 200);
    }).catch(e =>{
        response.error(req, res, 'Unexpected Error', 500, e );
    });
});

router.post('/', upload.single('file'),  function (req, res){
    console.log(req.file);
    controller.addMessage(req.body.chat, req.body.user, req.body.message, req.file)
        .then((fullMessage)=>{
            response.success(req, res, fullMessage , 201);
        })
        .catch(e =>{
            response.error(req, res, "Información Inválida", 400, 'Error en el controlador')
        }); 
});

router.patch('/:id', function (req, res){
    controller.updateMessage(req.params.id, req.body.message)
        .then((data) =>{
            response.success(req, res, data, 200);
        }).catch(e => {response.error(req, res, 'Error interno', 500, e);
    });
})

router.delete('/:id', function (req, res){
    const id = req.params.id;
    controller.deleteMessage(id).then((deleteMessage)=>{
        if (deleteMessage === null || deleteMessage === undefined) {
            response.error(req, res, 'El mensaje no existe!', 500);
        }else{
            response.success(req, res, `Mensaje ${deleteMessage} eliminado`, 200);  
        }
        
    }).catch(e => {
        response.error(req, res, 'Error interno', 500, e);
    })
});
module.exports = router;
