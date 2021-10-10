import connectDb from "../configurations/databaseconfig.js";

/**______DATABASE CONNECTION_______**/
var mysqlConnection = await connectDb();


// @Job: Get all company details
// @Scope: Request with valid api key
export const  getAllCompanyCategory = (req, res) =>{
    // limit as 10
    const limit = 10
    // page number
    const page = req.query.page
    // calculate offset
    const offset = (page - 1) * limit
    // query for fetching data with page number and offset
    const prodsQuery = "Select * from company_category limit "+limit+" OFFSET "+offset;
     
    mysqlConnection.query(prodsQuery,(err,rows,field)=>{
        if(!err) {
            var jsonResult = {
                'category_page_count':rows.length,
                'page_number':page,
                'Category Details':rows
              }
              // create response
              var myJsonString = JSON.parse(JSON.stringify(jsonResult));
              res.statusMessage = "Category Details for page "+page;
              res.statusCode = 200;
              res.json(myJsonString);
              res.end();
        }
        else {
            res.status(404).send(err);
        }
    });
  }


  // @Job: Get company category details by Id
  // @Scope: Request with valid api key
  export const getCompanyCategoryDetailsById = (req, res)=>{
    mysqlConnection.query('Select * from company_category where id = ?',[req.params.id],(err,rows,field)=>{
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
  export const createCompanyCategoryEntry = (req, res)=>{
      const id = req.body.id;
      const title = req.body.title;
    mysqlConnection.query("insert into company_category(id,title,created_at,updated_at) values (?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)",[id,title],(err,rows,field)=>{
        if(!err) {
            res.status(201).send('Inserted Successfully');
        }
        else {
            res.status(404).send(err);
        }
    });
  }

   // @Job :Update company category by id
  // @Scope: Request with valid api key
  export const updateCompanyCategoryDetail = (req, res)=>{
    const title = req.body.title;
    mysqlConnection.query("Update company SET title=? where category_id = ?",[title,req.params.id],(err,rows,field)=>{
        if(!err) {
            ;
        }
        else {
            console.log(err);
        }
    })
    ,
    mysqlConnection.query("Update company_category SET title=? where id = ?",[title,req.params.id],(err,rows,field)=>{
        if(!err) {
            res.status(201).send('Updated successfully');
        }
        else {
            res.status(404).send(err);
        }
    });
  }

  // @Job :Remove company category by id
  // @Scope: Request with valid api key
  export const removeCompanyCategory = (req, res)=>{
    mysqlConnection.query('Delete from company where category_id = ?',[req.params.id],(err,rows,field)=>{
        if(!err) {
            ;
        }
        else {
            console.log(err);
        }
    })
    ,
    mysqlConnection.query('Delete from company_category where id = ?',[req.params.id],(err,rows,field)=>{
        if(!err) {
            res.send('Deleted successfully');
        }
        else {
            res.status(404).send(err);
        }
    });
  }