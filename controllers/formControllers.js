const InstDonor = require('../models/donor'); 
const GuestDonor = require('../models/guestDonor');
const instituteIndividual = require('../models/instituteInd');
const donorRollNo = require('../models/InstRollNo');
const xlsx = require('xlsx');
const path = require('path')

exports.getFirstPage= (req,res,next) => {
        res.render('firstPage');        
}

exports.submitForJmit = (req,res,next) => {
    const rollNo = req.body.rollno;
    instituteIndividual.findOne({RollNumber:rollNo})
    .then(individual=>{
        if(!individual)
        {
            const message = "This individual is not in your college";
            res.render('messagePage',{message:message});
        }
        console.log(individual);
        res.render('resultFound',{individual:individual});
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.finalInstSubmit = (req,res,next) => {
    const FullName = req.body.FullName;
    const Institute = req.body.Institute;
    const RollNumber = req.body.RollNumber;
    const SerialNo = req.body.SerialNo;
    const Email = req.body.Email;
    const MobileNo = req.body.MobileNo;
    const BloodGroup = req.body.BloodGroup;
    const bank = req.body.bank;
    const GiftRecieved = req.body.GiftRecieved;
    const StudentType = req.body.StudentType;
    const Department = req.body.Department;
    const Gender = req.body.Gender;

    donorRollNo.findOne({RollNumber:RollNumber})
    .then(resultFound=>{
        if(resultFound)
        {
            res.render('messagePage',{message:"This donor has already registered in this term"});
        }
        else{
            donorRollNo.findOne({SerialNo:SerialNo})
            .then(SerialNoResult=>{
                if(SerialNoResult)
                {
                    res.render('messagePage',{message:"This serial number has already been resgistered"});
                }
                else
                {
                    GuestDonor.findOne({SerialNo:SerialNo})
                    .then(guestDonorResult =>{
                        if(guestDonorResult)
                        {
                            res.render('messagePage',{message:"This serial number has already been resgistered"});
                        }
                        else{
                            instituteIndividual.findOne({RollNumber:RollNumber})
                            .then(individual =>{
                                if((individual.MobileNo != MobileNo) || (individual.Email != Email) || (individual.BloodGroup != BloodGroup))
                                {
                                    instituteIndividual.findOneAndUpdate({RollNumber:RollNumber},{MobileNo:MobileNo,Email:Email,BloodGroup:BloodGroup})
                                    .then(updatedInd => {
                                        console.log("the update has been done");
                                    })
                                    .catch(err =>{
                                        console.log(err);
                                    });
                                }
                            })
                            .catch(err => {
                                console.log(err);
                            });
                        
                            const newRollNo = new donorRollNo({
                                SerialNo:SerialNo,
                                RollNumber:RollNumber,
                                bank:bank,
                                GiftRecieved:GiftRecieved,
                                StudentType:StudentType,
                                Institute:Institute,
                                FullName:FullName,
                                BloodGroup:BloodGroup,
                                Department:Department,
                                Gender:Gender
                            });
                            newRollNo.save()
                            .then(newDonor=>{
                                res.render('messagePage',{message:"The Donor's Roll Number Has Been Saved"});
                            })
                            .catch(err=>{
                                console.log(err);
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
                }
            })
            .catch(err=>{
                console.log(err);
            });
        }
    })
    .catch(err=>{
        console.log(err);
    });

}

exports.viewDonor = (req,res,next) => {   
    donorRollNo.find().sort({SerialNo:1})
    .then(instituteDonors=>{
        GuestDonor.find().sort({SerialNo:1})
        .then(guestDonors=>{
            res.render('totalDonors',{results:instituteDonors,guests:guestDonors});
        })
        .catch(err=>{
            console.log(err);
        });
    })
    .catch(err=>{
        console.log(err);
    });
}

exports.postViewDonors = (req,res,next) =>{
    
    const Department=req.body.Department;
    const Institute = req.body.Institute;
    const Gender=req.body.Gender;
    const bank=req.body.bank;
    const propertyInst={}
    const propertyGuest={}
    if(Institute!="")
    {
        propertyInst['Institute']=Institute;
        propertyGuest['Institute']=Institute;
    }
    if(Department!="")
    {
        propertyInst['Department']=Department;
        propertyGuest['Department']=Department;
    }
    if(Gender!="")
    {
        propertyInst['Gender']=Gender;
        propertyGuest['Gender']=Gender;
    }
    if(bank!="")
    {
        propertyInst['bank']=bank;
        propertyGuest['bank']=bank;
    }
    
    donorRollNo.find(propertyInst).sort({SerialNo:1})
    .then(instituteSearch=>{
        GuestDonor.find(propertyGuest).sort({SerialNo:1})
        .then(guestSearch=>{
            res.render('filterPage',{InstituteInd:instituteSearch,GuestInd:guestSearch});
        })
        .catch(err=>{
            console.log(err);
        });
    })
    .catch(err=>{
        console.log(err);
    });
}

exports.postGuestDonor = (req,res,next) =>{
    const donorName=req.body.donorName;
    const age=req.body.age;
    const SerialNo = req.body.SerialNo;

    GuestDonor.findOne({SerialNo:SerialNo})
    .then(donorInfo=>{
        if(donorInfo)
        {
            const message= "This serial number already exists";
            res.render('messagePage',{message:message});
        }
        else
        {
            donorRollNo.findOne({SerialNo:SerialNo})
            .then(resultOfDonor=>{
                if(resultOfDonor)
                {
                    res.render('messagePage',{message:"This serial number has already been used"});
                }
                else{
                    const Institute = req.body.Institute;
                    const Department = req.body.Department;
                    const year = req.body.year;
                    const Gender = req.body.Gender;
                    const mobileNumber = req.body.mobileNumber;
                    const bloodGroup = req.body.bloodGroup;
                    const bank = req.body.bank;
                    const giftRecieved = req.body.giftRecieved;
                    const rollno = req.body.rollno;
        
                    const newGuestDonor = new GuestDonor({
                        SerialNo:SerialNo,
                        Institute:Institute,
                        donorName:donorName,
                        age:age,
                        rollno:rollno,
                        Department:Department,
                        year:year,
                        Gender:Gender,
                        mobileNumber:mobileNumber,
                        bloodGroup:bloodGroup,
                        bank:bank,
                        giftRecieved:giftRecieved
                    });
        
                    newGuestDonor.save()
                    .then(result=>{
                        const message = "The donor has been successfully saved";
                        res.render('messagePage',{message:message});
                    })
                    .catch(err=>{
                        console.log(err);
                    });
                }
            })
            .catch(err=>{
                console.log(err);
            });
        }
    })
    .catch(err=>{
        console.log(err);
    });
}

exports.getLoginPage = (req,res,next) => {
    res.render('login');
}

exports.postLogin = (req,res,next) => {
    const password = req.body.password;

    if(password==='2019BloodDonor')
    {
        req.session.password = 'rightPassword';
        res.redirect('/');
    }
    else{
        res.redirect('/login');
    }
}

exports.getLogout = (req,res,next) => {
    req.session.destroy(err => {
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/login');
        }
    });    
}

exports.getFilter = (req,res,next) =>{
    res.render('filterPage',{InstituteInd:{},GuestInd:{}});
}

exports.downloadAsExcel = (req,res,next) => {
    donorRollNo.find().sort({SerialNo:1})
    .then(instituteDonors=>{
        GuestDonor.find().sort({SerialNo:1})
        .then(guestDonors=>{
            var donorsOfInst = [];
            var donorsGuests = [];
            for(instituteDonor in instituteDonors)
            {
                donorsOfInst[instituteDonor] = JSON.parse(`{"SNo":"${instituteDonors[instituteDonor].SerialNo}",
                                                            "Institute":"${instituteDonors[instituteDonor].Institute}",
                                                            "Name":"${instituteDonors[instituteDonor].FullName}",
                                                            "RollNumber":"${instituteDonors[instituteDonor].RollNumber}",
                                                            "Gender":"${instituteDonors[instituteDonor].Gender}",
                                                            "BloodGroup":"${instituteDonors[instituteDonor].BloodGroup}",
                                                            "Department":"${instituteDonors[instituteDonor].Department}",
                                                            "Bank":"${instituteDonors[instituteDonor].bank}",
                                                            "StudentType":"${instituteDonors[instituteDonor].StudentType}",
                                                            "GiftRecieved":"${instituteDonors[instituteDonor].GiftRecieved}"}`);
            }
            for(guestDonor in guestDonors)
            {
                donorsGuests[guestDonor] = JSON.parse(`{"SNo":"${guestDonors[guestDonor].SerialNo}",
                                                        "Name":"${guestDonors[guestDonor].donorName}",
                                                        "Age":"${guestDonors[guestDonor].age}",
                                                        "Institute":"${guestDonors[guestDonor].Institute}",
                                                        "RollNumber":"${guestDonors[guestDonor].rollno}",
                                                        "Department":"${guestDonors[guestDonor].Department}",
                                                        "Year":"${guestDonors[guestDonor].year}",
                                                        "Gender":"${guestDonors[guestDonor].Gender}",
                                                        "BloodGroup":"${guestDonors[guestDonor].bloodGroup}",
                                                        "Bank":"${guestDonors[guestDonor].bank}",
                                                        "MobileNumber":"${guestDonors[guestDonor].mobileNumber}",
                                                        "GiftRecieved":"${guestDonors[guestDonor].giftRecieved}"
                                                        }`);
            }

            var newWB = xlsx.utils.book_new();
            var newWS = xlsx.utils.json_to_sheet(donorsOfInst);
            var newWS2 = xlsx.utils.json_to_sheet(donorsGuests);
            xlsx.utils.book_append_sheet(newWB,newWS,'Institute Donors');
            xlsx.utils.book_append_sheet(newWB,newWS2,'Guest Donors');
            xlsx.writeFile(newWB,"Donors2019.xlsx");

            var fileLocation = path.join('./','Donors2019.xlsx');
            res.download(fileLocation,'Donors2019.xlsx');          
        })
        .catch(err=>{
            console.log(err);
        });
    })
    .catch(err=>{
        console.log(err);
    });    
}

// exports.postInstDonor = (req,res,next) =>{
//     const category = req.body.category;
//     const institute = req.body.institute;
//     const rollno = req.body.rollno;

//     InstDonor.findOne({rollno:rollno,institute:institute})
//     .then(donorInfo => {
//         if(donorInfo)
//         {
//             res.render('alreadyThere');
//         }
//         else
//         {
//             res.render('fullInstDonor',{category:category,institute:institute,rollno:rollno});
//         }
//     })
//     .catch(err=>{
//         console.log(err);
//     });
// }

// exports.postInstDonorSubmit = (req,res,next) =>{
//     const category = req.body.category;
//     const institute = req.body.institute;
//     const rollno = req.body.rollno;
//     const donorName = req.body.donorName;
//     const course = req.body.course;
//     const year = req.body.year;
//     const sex = req.body.sex;
//     const mobileNumber = req.body.mobileNumber;
//     const bloodGroup = req.body.bloodGroup;
//     const giftRecieved = req.body.giftRecieved;
//     const bank = req.body.bank; 
    
//     const donor = new InstDonor({
//         category:category,
//         institute:institute,
//         rollno:rollno,
//         donorName:donorName,
//         sex:sex,
//         bloodGroup:bloodGroup,
//         bank:bank,
//         mobileNumber:mobileNumber,
//         giftRecieved:giftRecieved,
//         course:course,
//         year: year
//     });
//     donor.save()
//     .then( result => {
//         console.log('donor saved successfully.');
//         res.redirect('/successfulSave');
//     })
//     .catch(err=>{
//         console.log(err);
//     });
// }

// exports.getShowSaved=(req,res,next)=>{
//     res.render('succesfullSave');
// }

// exports.postGuestDonorSubmit = (req,res,next) =>{
//     const category = req.body.category;
//     const donorName = req.body.name;
//     const age = req.body.age;
//     const fatherName = req.body.fatherName;
//     const uniqueId = req.body.uniqueId;
//     const sex = req.body.sex;
//     const mobileNumber = req.body.mobileNumber;
//     const bloodGroup = req.body.bloodGroup;
//     const giftRecieved = req.body.giftRecieved;
//     const bank = req.body.bank;

//     const gdonor = new GuestDonor({
//         category:category,
//         donorName:donorName,
//         age:age,
//         fatherName:fatherName,
//         uniqueId:uniqueId,
//         sex:sex,
//         mobileNumber:mobileNumber,
//         bloodGroup:bloodGroup,
//         giftRecieved:giftRecieved,
//         bank:bank
//     });

//     gdonor.save()
//     .then(result=>{
//         console.log('user saved successfully');
//         res.redirect('/successfulSave');
//     })
//     .catch(err=>{
//         console.log(err);
//     })
// }