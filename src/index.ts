import express from 'express';
import { getUserData } from './functions/getUserData';
import { setUserData } from './functions/setUserData';
import { updateUserData } from './functions/updateUserData';

const app = express();
const router = express.Router();

app.use(express.json()); // 解析 JSON body

router.get('/getUserData', getUserData);
router.post('/setUserData', setUserData);
router.patch('/updateUserData', updateUserData);

const port = 3000;

app.use('/', router);
app.use('/api', router);

app.listen(port, () => {
  console.log('Start listening on port', port);
});
