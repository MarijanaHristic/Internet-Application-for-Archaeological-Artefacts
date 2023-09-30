import express from 'express'
import { AdminController } from '../controllers/admin.controller'

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './src/uploads'); 
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    }
});

const upload = multer({ storage: storage });

const adminRouter = express.Router()

adminRouter.route('/requestsOnHold').get(
    (req, res)=>new AdminController().reguestsOnHold(req, res)
)

adminRouter.route('/denyRequest').post(
    (req, res)=>new AdminController().denyRequest(req, res)
)

adminRouter.route('/acceptRequest').post(
    (req, res)=>new AdminController().acceptRequest(req, res)
)

adminRouter.route('/requestsAccepted').get(
    (req, res)=>new AdminController().requestsAccepted(req, res)
)

adminRouter.route('/registerUser').post(
    (req, res)=>new AdminController().register(req, res)
)

adminRouter.route('/getMaxId').get(
    (req, res)=>new AdminController().getMaxId(req, res)
)

adminRouter.route('/checkUsername').post(
    (req, res)=>new AdminController().checkUsername(req, res)
)

adminRouter.route('/checkEmail').post(
    (req, res)=>new AdminController().checkEmail(req, res)
)

adminRouter.route('/getAllMembers').get(
    (req, res)=>new AdminController().getAllMembers(req, res)
)

adminRouter.route('/becomeAdmin').post(
    (req, res)=>new AdminController().becomeAdmin(req, res)
)

adminRouter.route('/becomeUser').post(
    (req, res)=>new AdminController().becomeUser(req, res)
)

adminRouter.route('/deleteMember').post(
    (req, res)=>new AdminController().deleteMember(req, res)
)

adminRouter.route('/changePassword').post(
    (req, res)=>new AdminController().changePassword(req, res)
)

adminRouter.route('/addArtefact').post( upload.single('picture'),
    (req, res)=>new AdminController().addArtefact(req, res)
)

adminRouter.route('/deleteArtefact').post(
    (req, res)=>new AdminController().deleteArtefact(req, res)
)

adminRouter.route('/getMaxIdOfArtefact').get(
    (req, res)=>new AdminController().getMaxIdOfArtefact(req, res)
)

adminRouter.route('/putPdfs').post( upload.array('pdfs'),
    (req, res)=>new AdminController().putPdfs(req, res)
)

adminRouter.route('/putPdfsEdit').post( upload.array('pdfs'),
    (req, res)=>new AdminController().putPdfsEdit(req, res)
)

adminRouter.route('/putXrfs').post( upload.array('xrfPictures'),
    (req, res)=>new AdminController().putXrfs(req, res)
)

adminRouter.route('/putXrds').post( upload.array('xrdPictures'),
    (req, res)=>new AdminController().putXrds(req, res)
)

adminRouter.route('/putXss').post( upload.array('xsPictures'),
    (req, res)=>new AdminController().putXss(req, res)
)

adminRouter.route('/putOsls').post( upload.array('oslPictures'),
    (req, res)=>new AdminController().putOsls(req, res)
)

adminRouter.route('/getAllArtefacts').get(
    (req, res)=>new AdminController().getAllArtefacts(req, res)
)

adminRouter.route('/update').post( upload.single('picture'),
    (req, res)=>new AdminController().update(req, res)
)

adminRouter.route('/getPic').post(
    (req, res)=>new AdminController().getPic(req, res)
)

adminRouter.route('/insertNewVal').post(
    (req, res)=>new AdminController().insertNewVal(req, res)
)

adminRouter.route('/getPredefiniedValuesObject').get(
    (req, res)=>new AdminController().getPredefiniedValuesObject(req, res)
)

export default adminRouter