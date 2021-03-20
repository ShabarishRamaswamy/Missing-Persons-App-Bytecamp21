const express = require("express");
var router = express.Router();
const Case = require("../models/Case");
const authenticateToken = require("../middlewares/authenticateToken");
const { urlencoded, json } = require("body-parser");
const { resolve } = require("path");
const { uploader, cloudinaryConfig } = require("../utils/cloudinaryConfig");
const { multerUploads, dataUri } = require('../middlewares/multerUpload');

/**
 * @method - GET
 * @route - /
 * @description - The Homepage
 * @access - All
 */
router.get("/case", authenticateToken, (req, res) => {
  if (req.user) {
    console.log(req.user);
    res.send("Hello!");
  } else {
    res.send("No Hello");
  }
});

/**
 * @method - POST
 * @route - /case
 * @description - The Homepage
 * @access - All
 */
router.post("/case", authenticateToken, async (req, res) => {
  if (!req.user.isAuthority) {
    return res.status(401).send("Only Authority can add Cases");
  }
  try {
    var {
      caseNumber, // Case Number assigned by the Authority.
      city,
      state,
      postalCode,
      date,
      investigatingDepartment,
      update,
      victimMaritalStatus,
      victimName,
      victimGender,
      reward,
      victimInfo,
      victimAge,
      status,
      officersInvolved,
      moreInfoLinks,
      victimImage,
      typeOfCase,
    } = req.body;

    const newCase = new Case({
      caseNumber,
      location: {
        city,
        state,
        postalCode,
      },
      date,
      investigatingDepartment,
      updates: [update],
      victimMaritalStatus,
      victimName,
      victimGender,
      reward,
      victimInfo,
      victimAge,
      status,
      officersInvolved,
      moreInfoLinks,
      victimImage,
      caseAuthority: req.user._id,
      typeOfCase,
    });

    await newCase.save();
    res.redirect("/cases");
  } catch (e) {
    console.log(e);
    res.send(400).send();
  }
});

/**
 * @method - GET
 * @route - /cases
 * @description - Get all cases
 * @access - All
 */
router.get("/cases", authenticateToken, async (req, res) => {
  var allCases = await Case.find({}).lean();
  res.render("cases.hbs", {
    allCases,
  });
});

/**
 * @method - GET
 * @route - /case/caseID
 * @description - Get all cases
 * @access - All
 */
router.get("/cases/:id", authenticateToken, async (req, res) => {
  var requiredCase = await Case.findById(req.params.id).lean();
  res.render("show.hbs", {
    requiredCase,
  });
});

/**
 * @method - POST
 * @route - /updateCaseStatus
 * @body - Contains UpdatedStatus
 * @description - The Homepage
 * @access - All
 */
router.post("/updateCaseStatus/:id", authenticateToken, async (req, res) => {
  var requiredCase = await Case.findById(req.params.id);
  if (requiredCase.caseAuthority == req.user._id) {
    requiredCase.status = req.body.updatedStatus;
    await requiredCase.save();
    return res.status(200).redirect(`/case/ + ${req.params.id}`);
  }
});

router.get("/addcase", authenticateToken, async (req, res) => {
  res.render("add.hbs");
});
/**
 * @method - POST
 * @route - /addCaseImages
 * @description - The Homepage
 * @access - All
 */
router.post("/addCaseImages/:id", authenticateToken, async (req, res) => {
  var requiredCase = await Case.findById(req.params.id);
  if (requiredCase.caseAuthority == req.user._id) {
    requiredCase.victimImage;
    return res.status(200).redirect(`/case/ + ${req.params.id}`);
  }
  // More Work Here
});

/**
 * @method - GET
 * @route - /myCases
 * @description - The Homepage
 * @access - All
 */
router.get("/myCases", authenticateToken, async (req, res) => {
  const cases = Case.find({ caseAuthority: req.user._id });
  res.status(200).send(cases);
});

/**
 * @method - POST
 * @route - /upload/:id
 * @description - The Homepage
 * @access - All
 */
router.post("/upload/:id", multerUploads, async (req, res) => {
    //authenticateToken
  try {
      if (req.file) {
        const file = dataUri(req);
        return uploader
          .upload(file)
          .then((result) => {
            const image = result.url;
            return res
              .status(200)
              .json({
                messge:
                  "Your image has been uploded successfully to cloudinary",
                data: { image },
              });
          })
          .catch((err) =>
            res
              .status(400)
              .json({
                messge: "someting went wrong while processing your request",
                data: { err },
              })
          );
      }else{
          res.status(400).send()
      }
  } catch (e) {
      console.log(e)
      res.status(500).send()
  }
});

module.exports = router;
