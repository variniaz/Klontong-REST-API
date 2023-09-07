const { Image, User } = require('../models');
const Validator = require('fastest-validator');
const V = new Validator();
const path = require('path');
const { Op } = require('sequelize');

function getFileExtension(fileName) {
  const file = fileName;
  const fileExtension = file.split('.').pop();

  return fileExtension;
}

module.exports = {
  fileUpload: async (files) => {
    try {
      let arrayFile = [];

      for (element of files) {
        const file = element;
        const fileName = element.originalname + new Date();
        const filePath = path.join(
          __dirname + process.env.LOCAL_IMAGE_PATH + fileName
        );

        const uploadedFile = await Image.create({
          url: filePath,
          alt: fileName,
        });

        arrayFile.push({
          id: uploadedFile.id,
          url: uploadedFile.url,
          alt: uploadedFile.alt,
          file_name: fileName,
        });
      }

      return arrayFile;
    } catch (err) {
      return err.message;
    }
  },
};
