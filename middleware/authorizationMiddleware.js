import dotenv from 'dotenv';
dotenv.config();

export const authorize = (req,res,next)=>{
    const {api_key} = req.headers;
    const validApi = process.env.isValidApi;
    if(api_key=== validApi) {
        next();
    }
    else {
        return res.status(422).json({
            err:'Access Denied'
        });
    }
};
