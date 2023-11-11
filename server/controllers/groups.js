const Group = require('./../schemas/groupsModel');
const User = require('./../schemas/usersModel')

const createGroup = async (req, res) => {
  console.log(req)
  console.log(req.body)
  let { groupName, bikeBrand, bikeModel, mandatoryBike, memberList} = req.body;

  const group = await Group.findOne({groupName: groupName});

  if(group) return res.status(409).send({error:'409', message:'Group already exists'});
  

  if (!mandatoryBike) {
    bikeBrand = null;
    bikeModel = null;
    mandatoryBike = false;
  }

  console.log(mandatoryBike)
  console.log(bikeBrand)
  try {
    const newGroup = new Group({
      groupName: groupName,
      bikeBrand: bikeBrand,
      bikeModel: bikeModel,
      mandatoryBike: mandatoryBike,
      memberList: memberList,
    })
    console.log('ieee',newGroup)
    
    await newGroup.save();

    await User.findByIdAndUpdate(memberList, {$push: {groupList: groupName}},
    { new : true })

    .then((updatedUser) => {
      console.log('User Updated with groupName', updatedUser);
    }).catch((error) => {
      console.log('Could not add group to the groupList of the user', error)
    })
    
     
    res.json('created group').status(200)

  } catch ( error ) {
    console.log(error)
    res.json('cant create group').status(400)
  }

}

const joinGroup = async (req, res) => {
  console.log(req.body)
  const { groupName, userID } = req.body

  try{
    //busca este grupo en la DB,
    const groupFound = await Group.find({groupName: groupName}).exec()
    console.log(groupFound)

    //if group exists
    if (groupFound) {
      console.log('l64',groupFound[0].memberList)

      //group exists, then check if user exists in group
      const foundID = groupFound[0].memberList.includes(userID);
        if(foundID) {
          console.log('found id: ',foundID)
          return res.json({error: 'User already exists in the group'}).status(500)
        }
        else {
          console.log('user does not exist in group.')
          //user doesn't exist in group, check if mandatory bike is true, if it's true check if user has that bike
          if (groupFound[0].mandatoryBike) {

            const bikeBrand = groupFound[0].bikeBrand
            const bikeModel = groupFound[0].bikeModel

            //find user in User schema DB by userid
            const userInDB = await User.findById(userID)
            console.log('l79',userInDB)
            
            console.log('BIKE NEEDED: ',bikeBrand, bikeModel)
            //check array, bikeList in users.
            const foundBike = userInDB.bikeList.some(bike => {
              return bike.bikeBrand === bikeBrand && bike.bikeModel === bikeModel;
            });

            console.log('l85',foundBike)
            //if any of the objects of bikeList has bikeModel groupFound[0].bikeModel, add to group
            if (foundBike) {
              console.log('user has the mandatory bike')
              //add groupName to groups in User Table
              await User.findByIdAndUpdate(userID, {$push: {groupList: groupName}},
                { new : true })
            
                .then((updatedUser) => {
                  console.log('User Updated with groupName', updatedUser);
                }).catch((error) => {
                  console.log('Could not add group to the groupList of the user', error)
                })
              
              //add userID to memberList in the user Group table
            
              
            } else {
              console.log('user doest have the mandatory bike')
              return res.json({error: "User doesn't have the mandatory bike."}).status(500)
            }

            //else reject
          } else { 
              console.log ('not mandatory bike')
          }
        }
        
    }



    res.status(200).json({message: 'joined'})
  } catch (error) {
    res.status(500).json({error: 'Internal server error'})
  }


}
module.exports = {
  createGroup,
  joinGroup,
}