import express from 'express';
import { authorize } from '../middleware/authorizationMiddleware.js';
import { createCompanyCategoryEntry, getAllCompanyCategory, getCompanyCategoryDetailsById, removeCompanyCategory, updateCompanyCategoryDetail } from '../controller/companyCategoryControllers.js';

const router = express.Router();

// Get category details
router.route('/')
    .get(authorize, getAllCompanyCategory)
    .post(authorize, createCompanyCategoryEntry)

router.route('/:id')
    .get(authorize, getCompanyCategoryDetailsById)  
    .put(authorize, updateCompanyCategoryDetail) 
    .delete(authorize, removeCompanyCategory) 
  

export default router;    