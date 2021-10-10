export const authorize = (req,res,next)=>{
    const {api_key} = req.headers;
    if(api_key==='BA673A414C3B44C98478BB5CF10A0F832574090C') {
        next();
    }
    else {
        return res.status(422).json({
            err:'Access Denied'
        });
    }
};