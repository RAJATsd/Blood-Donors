const express=require('express');
const formControllers=require('../controllers/formControllers');

const router=express.Router();

router.post('/instDonor',formControllers.postInstDonor);
router.post('/instDonorSubmit',formControllers.postInstDonorSubmit);
router.post('/guestDonor',formControllers.postGuestDonor);
router.post('/guestDonorSubmit',formControllers.postGuestDonorSubmit);

router.get('/',formControllers.getFirstPage);

module.exports=router;