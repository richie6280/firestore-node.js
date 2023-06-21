import express from 'express';
import { getUserData } from './functions/getUserData';
import { setUserData } from './functions/setUserData';
import { updateUserData } from './functions/updateUserData';

const app = express();
const router = express.Router();

router.get('/getUserData', getUserData);
router.get('/setUserData', setUserData);
router.get('/updateUserData', updateUserData);

const port = 3000;

app.use('/', router);
app.use('/api', router);

app.listen(port, () => {
  console.log('Start listening on port', port);
});
