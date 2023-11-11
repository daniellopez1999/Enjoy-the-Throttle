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
  //recibe nombre de grupo

  //busca este grupo en la DB,
  //comprueba si el usuario ya pertenece al grupo
  //comprueba si mandatoryBike = true, comprueba si el usuario tiene esa moto


}
module.exports = {
  createGroup,
  joinGroup

}