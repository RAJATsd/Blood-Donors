const express=require('express');
const formControllers=require('../controllers/formControllers');
const authCheck = require('../utils/auth');

const router=express.Router();

// router.post('/instDonor',formControllers.postInstDonor);
// router.post('/instDonorSubmit',formControllers.postInstDonorSubmit);
router.post('/guestDonor',formControllers.postGuestDonor);
// router.post('/guestDonorSubmit',formControllers.postGuestDonorSubmit);
// router.post('/viewDonors',formControllers.postViewDonors);
router.post('/instituteIndividual',formControllers.submitForJmit);
router.post('/submitRollNo',formControllers.finalInstSubmit);
router.post('/login',formControllers.postLogin);
router.post('/filter',formControllers.postViewDonors);

router.get('/',authCheck.authMiddleWare,formControllers.getFirstPage);
router.get('/viewDonors',authCheck.authMiddleWare,formControllers.viewDonor);
router.get('/login',formControllers.getLoginPage);
router.get('/logout',formControllers.getLogout);
router.get('/filter',authCheck.authMiddleWare,formControllers.getFilter);
router.get('/downloadAsExcel',authCheck.authMiddleWare,formControllers.downloadAsExcel);
// router.get('/successfulSave',formControllers.getShowSaved);


module.exports=router;