const InstDonor = require('../models/donor'); 
const GuestDonor = require('../models/guestDonor');

exports.getFirstPage= (req,res,next) => {
    res.render('firstPage');
}

exports.postGuestDonor = (req,res,next) =>{
    const category='Guest';
    const name=req.body.name;
    const age=req.body.age;
    const fatherName=req.body.fatherName;
    const uniqueId=name[0]+name[1]+String(age)+fatherName[0]+fatherName[1];

    GuestDonor.findOne({uniqueId:uniqueId})
    .then(donorInfo=>{
        if(donorInfo)
        {
            res.render('alreadyThere');
        }
        else
        {
            res.render('fullGuestDonor',{name:name,category:category,age:age,fatherName:fatherName,uniqueId:uniqueId});
        }
    })
    .catch(err=>{
        console.log(err);
    });
}

exports.postInstDonor = (req,res,next) =>{
    const category = req.body.category;
    const institute = req.body.institute;
    const rollno = req.body.rollno;

    InstDonor.findOne({rollno:rollno} && {institute:institute})
    .then(donorInfo => {
        if(donorInfo)
        {
            res.render('alreadyThere');
        }
        else
        {
            res.render('fullInstDonor',{category:category,institute:institute,rollno:rollno});
        }
    })
    .catch(err=>{
        console.log(err);
    });
}

exports.postInstDonorSubmit = (req,res,next) =>{
    const category = req.body.category;
    const institute = req.body.institute;
    const rollno = req.body.rollno;
    const donorName = req.body.donorName;
    const course = req.body.course;
    const year = req.body.year;
    const sex = req.body.sex;
    const mobileNumber = req.body.mobileNumber;
    const bloodGroup = req.body.bloodGroup;
    const giftRecieved = req.body.giftRecieved;
    const bank = req.body.bank; 
    
    const donor = new InstDonor({
        category:category,
        institute:institute,
        rollno:rollno,
        donorName:donorName,
        sex:sex,
        bloodGroup:bloodGroup,
        bank:bank,
        mobileNumber:mobileNumber,
        giftRecieved:giftRecieved,
        course:course,
        year: year
    });
    donor.save()
    .then( result => {
        console.log('donor saved successfully.');
        res.render('succesfullSave');
    })
    .catch(err=>{
        console.log(err);
    });
}

exports.postGuestDonorSubmit = (req,res,next) =>{
    const category = req.body.category;
    const donorName = req.body.name;
    const age = req.body.age;
    const fatherName = req.body.fatherName;
    const uniqueId = req.body.uniqueId;
    const sex = req.body.sex;
    const mobileNumber = req.body.mobileNumber;
    const bloodGroup = req.body.bloodGroup;
    const giftRecieved = req.body.giftRecieved;
    const bank = req.body.bank;

    const gdonor = new GuestDonor({
        category:category,
        donorName:donorName,
        age:age,
        fatherName:fatherName,
        uniqueId:uniqueId,
        sex:sex,
        mobileNumber:mobileNumber,
        bloodGroup:bloodGroup,
        giftRecieved:giftRecieved,
        bank:bank
    });

    gdonor.save()
    .then(result=>{
        console.log('user saved successfully');
        res.render('succesfullSave');
    })
    .catch(err=>{
        console.log(err);
    })
}