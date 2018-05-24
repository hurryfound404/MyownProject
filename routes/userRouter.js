const myexpress = require('express');
const router = myexpress.Router();
const userController=require('./../controller/gk_userController.js');

router.get('/Prlist.do',userController.Prlist);

router.post('/Prsearch.do',userController.Prsearch);

router.post('/Prcount.do',userController.Prcount);

router.post('/userSea.do',userController.userSea);

router.get('/sendCode.do',userController.sendCode);

router.post('/Prcol.do',userController.Prcol);

router.get('/navSearch.do', userController.navSearch);

router.get('/fashionList.do', userController.fashionList);



module.exports=router;