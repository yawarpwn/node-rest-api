import { toKebadCase } from '../utils/index.js'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: 'tellsenales-cloud',
  api_key: '781191585666779',
  api_secret: 'Pti_on_Di9UByV40fS4gganpBO4',
})

// const { pathname} = new URL('../assets/nodejs.png', import.meta.url)

// Uploads an image file
export const uploadImage = async (imagePath, { folder, fileName }) => {
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  const kebadFileName = toKebadCase(fileName)
  const options = {
    use_filename: true,
    unique_filename: true,
    overwrite: true,
    folder,
    public_id: kebadFileName,
  }

  // Upload the image
  const result = await cloudinary.uploader.upload(imagePath, options)
  if (!result) {
    console.log('Error uploading image to cloudinary')
    return null
  }

  return result
}

export const destroyImage = async (imageUrl) => {
  return cloudinary.uploader.destroy(imageUrl)
}

// Gets details of an uploaded image
export const getAssetInfo = async (publicId) => {
  // Return colors in the response
  const options = {
    colors: true,
  }

  try {
    // Get details about the asset
    const result = await cloudinary.api.resource(publicId, options)
    console.log(result)
    return result.colors
  } catch (error) {
    console.error(error)
  }
}

/*
 Creates an HTML image tag with a transformation that
 results in a circular thumbnail crop of the image
 focused on the faces, applying an outline of the
 first color, and setting a background of the second color.
*/

const createImageTag = (publicId, ...colors) => {
  // Set the effect color and background color
  const [effectColor, backgroundColor] = colors

  // Create an image tag with transformations applied to the src URL
  let imageTag = cloudinary.image(publicId, {
    transformation: [
      { width: 250, height: 250, gravity: 'faces', crop: 'thumb' },
      { radius: 'max' },
      { effect: 'outline:10', color: effectColor },
      { background: backgroundColor },
    ],
  })

  return imageTag
}


// (async () => {
//
//     // Set the image to upload
//     const imagePath = 'https://cloudinary-devs.github.io/cld-docs-assets/assets/images/happy_people.jpg';
//
//     // Upload the image
//     const publicId = await uploadImage(imagePath);
//
//     // Get the colors in the image
//     const colors = await getAssetInfo(publicId);
//
//     // Create an image tag, using two of the colors in a transformation
//     const imageTag = await createImageTag(publicId, colors[0][0], colors[1][0]);
//
//     // Log the image tag to the console
//     console.log(imageTag);
//
// })();
