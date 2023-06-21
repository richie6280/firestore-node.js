import express from 'express';
import { getUserData } from './functions/getUserData';
import { setUserData } from './functions/setUserData';

const app = express();
const router = express.Router();

router.get('/getUserData', getUserData);
router.get('/setUserData', setUserData);

const port = 3000;

app.use('/', router);
app.use('/api', router);

app.listen(port, () => {
  console.log('Start listening on port', port);
});
