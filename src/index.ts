import express from 'express';
import { getUserData } from './functions/getUserData';
import { setUserData } from './functions/setUserData';
import { updateUserData } from './functions/updateUserData';
import { deleteUserData } from './functions/deleteUserData';

const app = express();
const router = express.Router();

app.use(express.json()); // 解析 JSON body
app.use(express.urlencoded({ extended: true })); // 解析 URL 參數

router.get('/getUserData', getUserData);
router.post('/setUserData', setUserData);
router.patch('/updateUserData', updateUserData);
router.delete('/deleteUserData/:uid', deleteUserData);

const port = 3000;

app.use('/', router);
app.use('/api', router);

app.listen(port, () => {
  console.log('Start listening on port', port);
});
