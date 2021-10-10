import express from 'express';
import { authorize } from '../middleware/authorizationMiddleware.js';
import { createCompanyEntry, getAllCompany, getCompanyDetailsById, removeCompany, updateCompanyDetail } from '../controller/companyControllers.js';

const router = express.Router();

// Get company details
router.route('/')
    .get(authorize, getAllCompany)
    .post(authorize, createCompanyEntry)

router.route('/:id')
    .get(authorize, getCompanyDetailsById)  
    .put(authorize, updateCompanyDetail) 
    .delete(authorize, removeCompany) 
  

export default router;    