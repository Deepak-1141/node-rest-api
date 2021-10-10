import connectDb from "../configurations/databaseconfig.js";

/**______DATABASE CONNECTION_______**/
var mysqlConnection = await connectDb();


// @Job: Get all company details
// @Scope: Request with valid api key
export const  getAllCompany = (req, res) =>{
     // limit as 10
     const limit = 10
     // page number
     const page = req.query.page
     // calculate offset
     const offset = (page - 1) * limit
     // query for fetching data with page number and offset
     const prodsQuery = "Select * from company limit "+limit+" OFFSET "+offset;
      
     mysqlConnection.query(prodsQuery,(err,rows,field)=>{
         if(!err) {
             var jsonResult = {
                 'category_page_count':rows.length,
                 'page_number':page,
                 'Comapny Details':rows
               }
               // create response
               var myJsonString = JSON.parse(JSON.stringify(jsonResult));
               console.log(myJsonString);
 
         }
         else {
             console.log(err);
         }
     });
     mysqlConnection.query("Select * from company_category Join company ON company.category_id=company_category.id",(err,rows,field)=>{
         if(!err) {
         
             res.status(200).send(rows);
         }
         else {
             res.status(404).send(err);
         }
     });
  }


  // @Job: Get company details by Id
  // @Scope: Request with valid api key
  export const getCompanyDetailsById = (req, res)=>{
    mysqlConnection.query('Select * from company where id = ?',[req.params.id],(err,rows,field)=>{
        if(!err) {
           console.log(rows);
        }
        else {
            console.log(err);
        }
    }),
    mysqlConnection.query('Select * from company_category where id in (select category_id from company where id=?)',[req.params.id],(err,rows,field)=>{
        if(!err) {
            res.status(200).send(rows);
        }
        else {
            res.status(404).send(err);
        }
    });
  }

  // @Job : Create new company
  // @Scope: Request with valid api key
  export const createCompanyEntry = (req, res)=>{
    const id = req.body.id;
    const category_id = req.body.category_id;
    const title = req.body.title;
    const imageText = req.body.imageText;
    const status = req.body.status;
   
    mysqlConnection.query("insert into company(id,category_id,title,image,status,created_at,updated_at) values (?,?,?,?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)",[id,category_id,title,imageText,status],(err,rows,field)=>{
        if(!err) {
            res.status(201).send('Inserted Successfully');
        }
        else {
            res.status(404).send(err);
        }
    });
  }

   // @Job :Update company by id
  // @Scope: Request with valid api key
  export const updateCompanyDetail = (req, res)=>{
      const title = req.body.title;
      const category_id = req.body.category_id;
      const imageText = req.body.imageText;
    mysqlConnection.query("Update company SET title=?,category_id=?,image=? where id = ?",[title, category_id, imageText, req.params.id],(err,rows,field)=>{
        if(!err) {
            console.log('Updated Successfully');
            res.status(201).send(rows);
        }
        else {
            res.status(404).send(err);
        }
    });
  }

  // @Job :Remove company  by id
  // @Scope: Request with valid api key
  export const removeCompany = (req, res)=>{
    mysqlConnection.query('Delete from company where id = ?',[req.params.id],(err,rows,field)=>{
        if(!err) {
            console.log('Deleted Successfully');
            res.status(200).send(rows);
        }
        else {
            console.log(err);
        }
    });
  }