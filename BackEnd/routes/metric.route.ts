/**@package userController, multer, path, fs */
import { router } from '../helpers'
import metricController from '../controllers/metric.controller'
import { verifyToken } from '../middlewares/auth'
/**
 * @routers starts here N/B upload function defined where the file is stored directory etc
 * */

router
  /**
   * @desc routes **/
  /**
   * @desc login data
   * */
  .post('/login', metricController.login)

  .get('/fake-insights', metricController.insights)

  .get('/get-metrics', metricController.getDataPrometheus)

export default router
