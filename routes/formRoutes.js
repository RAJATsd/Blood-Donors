const express=require('express');
const formControllers=require('../controllers/formControllers');

const router=express.Router();

router.post('/instDonor',formControllers.postInstDonor);
router.post('/instDonorSubmit',formControllers.postInstDonorSubmit);
router.post('/guestDonor',formControllers.postGuestDonor);
router.post('/guestDonorSubmit',formControllers.postGuestDonorSubmit);
router.post('/viewDonors',formControllers.postViewDonors);

router.get('/',formControllers.getFirstPage);
router.get('/viewDonors',formControllers.viewDonor);
router.get('/successfulSave',formControllers.getShowSaved);


module.exports=router;