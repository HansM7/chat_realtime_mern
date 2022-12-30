
export const verifyUserForToken = async(req,res,next)=>{
    try {
        const {username,password} = req.body
        if(!username || !password){
            res.status(501).json({ 
                status:'error',
                message:'Error, los campos estan incompletos'
            })
        }else{
            next()
        }

    } catch (error) {console.log(error)}
}