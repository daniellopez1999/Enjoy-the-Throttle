const Group = require('./../schemas/groupsModel');
const User = require('./../schemas/usersModel');

const createGroup = async (req, res) => {
  let { groupName, bikeBrand, bikeModel, mandatoryBike, memberList } = req.body;

  const group = await Group.findOne({ groupName: groupName });

  if (group)
    return res
      .status(409)
      .send({ error: '409', message: 'Group already exists' });

  if (!mandatoryBike) {
    bikeBrand = null;
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
    });

    await newGroup.save();

    await User.findByIdAndUpdate(
      memberList,
      { $push: { groupList: groupName } },
      { new: true }
    )

      .then((updatedUser) => {
        console.log('User Updated with groupName', updatedUser);
      })
      .catch((error) => {
        console.error(
          'Could not add group to the groupList of the user',
          error
        );
      });

    res.json('created group').status(200);
  } catch (error) {
    res.json('cant create group').status(400);
  }
};

const joinGroup = async (req, res) => {
  const { groupName, userID } = req.body;

  try {
    const groupFound = await Group.find({ groupName: groupName }).exec();
    const groupID = groupFound[0]._id;

    //if group exists
    if (groupFound) {
      //group exists, then check if user exists in group
      const foundID = groupFound[0].memberList.includes(userID);
      if (foundID) {
        return res
          .json({ error: 'User already exists in the group' })
          .status(500);
      } else {
        //user doesn't exist in group, check if mandatory bike is true, if it's true check if user has that bike
        if (groupFound[0].mandatoryBike) {
          const bikeBrand = groupFound[0].bikeBrand;
          const bikeModel = groupFound[0].bikeModel;

          //find user in User schema DB by userid
          const userInDB = await User.findById(userID);

          //check array, bikeList in users.
          const foundBike = userInDB.bikeList.some((bike) => {
            return bike.bikeBrand === bikeBrand && bike.bikeModel === bikeModel;
          });

          //if any of the objects of bikeList has bikeModel groupFound[0].bikeModel, add to group
          if (foundBike) {
            //add groupName to groups in User Table

            await User.findByIdAndUpdate(
              userID,
              { $push: { groupList: groupName } },
              { new: true }
            )

              .then((updatedUser) => {
                console.log('User Updated with groupName', updatedUser);
              })
              .catch((error) => {
                console.error(
                  'Could not add group to the groupList of the user',
                  error
                );
              });

            //add userID to memberList in the user Group table
            await Group.findOneAndUpdate(
              { _id: groupID },
              { $push: { memberList: userID } },
              { new: true }
            )
              .then((updatedGroup) => {
                console.log(
                  'Group Updated with userID into memberList',
                  updatedGroup
                );
              })
              .catch((error) => {
                console.error(
                  'Could not add group to the groupList of the user',
                  error
                );
              });
          } else {
            return res
              .json({ error: "User doesn't have the mandatory bike." })
              .status(500);
          }
        } else {
          //NOT MANDATORY BIKE, CREATE GROUP
          await User.findByIdAndUpdate(
            userID,
            { $push: { groupList: groupName } },
            { new: true }
          )

            .then((updatedUser) => {
              console.log('User Updated with groupName', updatedUser);
            })
            .catch((error) => {
              console.error(
                'Could not add group to the groupList of the user',
                error
              );
            });

          //add userID to memberList in the user Group table
          await Group.findOneAndUpdate(
            { _id: groupID },
            { $push: { memberList: userID } },
            { new: true }
          )
            .then((updatedGroup) => {
              console.log(
                'Group Updated with userID into memberList',
                updatedGroup
              );
            })
            .catch((error) => {
              console.error(
                'Could not add group to the groupList of the user',
                error
              );
            });
        }
      }
    }
    res.status(200).json({ message: 'joined' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllGroups = async (req, res) => {
  const userID = req.params.userID;
  const userInfo = await User.findById(userID);
  const groupsFromUser = userInfo.groupList;

  res.json(groupsFromUser);
};

module.exports = {
  createGroup,
  joinGroup,
  getAllGroups,
};
