import { Router } from 'express';
import FilesController from '../controllers/filesController';

const router = Router();
const filesController = new FilesController();

router.post('/files/upload', filesController.uploadFile.bind(filesController));
router.get('/files/:id', filesController.getFile.bind(filesController));
router.delete('/files/:id', filesController.deleteFile.bind(filesController));

export default router;