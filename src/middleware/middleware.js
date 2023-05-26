const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");


exports.authJWT = async (req, res, next) => {

    if (req.path.includes('/login') || req.path.includes('/register') || req.path.includes('/forgotPassword') || req.path.includes('/reset-password-email') || req.path.includes('/update-password') || req.path.includes('/email-resend'))
        return next()

    if (req.cookies.token) {
        try {
            const data = await jwt.verify(req.cookies.token, process.env.JWT_SECRET)
            req.user = data;
            return next()
        } catch (error) {
            res.status(401).send({
                error: { message: ['Unauthorized access!'] }
            })
        }
    } else
        res.status(401).send({
            error: { message: ['Unauthorized access!'] }
        })
}

exports.fileUploader = async (req, res, next) => {

    const BASE_PATH = __dirname
    const storage = multer.diskStorage({

        destination: function (req, file, cb) {

            // if (file.mimetype === 'image/jpe' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, path.join(BASE_PATH, '../upload'))
            // } else
            //     if (file.mimetype === 'application/pdf') {
            //         cb(null, path.join(BASE_PATH, '../upload/docs'))

            //     } else
            //         if (file.mimetype === 'video/mp4' || file.mimetype === 'video/webm') {
            //             cb(null, path.join(BASE_PATH, '../upload/videos'))
            //         } else
            //             if (file.mimetype === 'audio/mpeg' || file.mimetype === 'audio/mp3' || file.mimetype === 'audio/wav') {
            //                 cb(null, path.join(BASE_PATH, '../upload/audio'))
            //             }
            //             else {
            //                 return res.status(400).send({ error: { message: ['Invalid file type'], }, })
            //             }
        },

        filename: function (req, file, cb) {
            cb(null, Date.now() + file.originalname)
        },
    })
    const fileFilter = (req, file, cb) => {
        if (file.mimetype === 'image/jpe' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf' || file.mimetype === 'video/mp4' || file.mimetype === 'video/webm' || file.mimetype === 'audio/mpeg' || file.mimetype === 'audio/mp3' || file.mimetype === 'audio/wav') {
            cb(null, true)
        }
        else {
            cb(null, true)
        }
    }
    const upload = multer({
        storage: storage,
        limits: { fileSize: 1024 * 1024 * 1024 * 5 },
        fileFilter: fileFilter
    })

    upload.single("file")(req, res, next)

}

exports.multipleFileUploading = async (req, res, next) => {

    const BASE_PATH = __dirname
    const storage = multer.diskStorage({

        destination: function (req, file, cb) {
            // if (file.mimetype === 'image/jpe' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {

            cb(null, path.join(BASE_PATH, '../upload'))

            // } else
            //     if (file.mimetype === 'application/pdf') {
            //         cb(null, path.join(BASE_PATH, '../upload/docs'))

            //     } else
            //         if (file.mimetype === 'video/mp4' || file.mimetype === 'video/webm') {
            //             cb(null, path.join(BASE_PATH, '../upload/videos'))
            //         } else
            //             if (file.mimetype === 'audio/mpeg' || file.mimetype === 'audio/mp3' || file.mimetype === 'audio/wav') {
            //                 cb(null, path.join(BASE_PATH, '../upload/audio'))
            //             }
            //             else {
            //                 return res.status(400).send({ error: { message: ['Invalid file type'], }, })
            //             }
        },

        filename: function (req, file, cb) {
            cb(null, Date.now() + file.originalname)
        },
    })

    const fileFilter = (req, file, cb) => {
        if (file.mimetype === 'image/jpe' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf' || file.mimetype === 'video/mp4' || file.mimetype === 'video/webm' || file.mimetype === 'audio/mpeg' || file.mimetype === 'audio/mp3' || file.mimetype === 'audio/wav') {
            cb(null, true)
        }
        else {
            cb(null, true)
        }
    }

    const upload = multer({
        storage: storage,
        fileFilter: fileFilter
    })

    upload.fields([{ name: 'image', maxCount: 1 }, { name: 'gallery', maxCount: 1 }, { name: 'document', maxCount: 1 }])(req, res, next)

}