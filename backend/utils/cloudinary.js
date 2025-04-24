// Require the cloudinary library
const cloudinary = require('cloudinary').v2;
const pool = require('../db/dbConfig')

// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true
});

// Log the configuration
console.log(cloudinary.config());

const uploadImage = async (imagePath) => {

  // Use the uploaded file's name as the asset's public ID and 
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options); 
    await pool.query('CREATE TABLE IF NOT EXISTS IMAGES (id SERIAL PRIMARY KEY, url TEXT)')
   const data =  await pool.query('INSERT INTO  IMAGES (url) VALUES($1) RETURNING *', [result.url])
    console.log(result);
    return data.rows
  } catch (error) {
    console.error(error);
    return [{data:[], message: error}]
  }

};

module.exports = uploadImage