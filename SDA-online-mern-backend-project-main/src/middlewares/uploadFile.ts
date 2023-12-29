import multer, { FileFilterCallback } from 'multer'
import { Request } from 'express'

const createStorage = (destination: string) => {
  return multer.diskStorage({
    destination(req, file, callback) {
      console.log('destination is :', destination)
      callback(null, destination)
    },
    filename(req, file, callback) {
      console.log('destination 2 is :', destination)

      callback(null, Date.now() + '-' + file.originalname)
      console.log('destination 3 is :', destination)
    },
  })
}

export const uploadImage = (destination: string) =>
  multer({
    storage: createStorage(destination),
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 },
  })

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']
  if (!file.mimetype.startsWith('image/')) {
    return cb(new Error('File is not an image'))
  }
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('Invalid image file type. Only jpg, jpeg and png are allowed'))
  }
  cb(null, true)
}

export const uploadImageProduct = uploadImage('public/images/products')
export const uploadImageUser = uploadImage('public/images/users')
