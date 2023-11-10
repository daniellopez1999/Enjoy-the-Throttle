const Group = require('./../schemas/groupsModel');


const createGroup = async (req, res) => {
  console.log(req)
  console.log(req.body)
  let { groupName, bikeBrand, bikeModel, mandatoryBike, memberList} = req.body;

  const group = await Group.findOne({groupName: groupName});

  if(group) return res.status(409).send({error:'409', message:'Group already exists'});
  

  if (mandatoryBike === undefined) {
    bikeBrand = null,
    bikeModel = null;
    mandatoryBike = false;
  }

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
    res.json('created group').status(200)

  } catch ( error ) {
    console.log(error)
    res.json('cant create group').status(400)
  }

}

module.exports = {
  createGroup,

}