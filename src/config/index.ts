import path from 'path'
import dotenv from 'dotenv'
dotenv.config({path:path.join(process.cwd(),'.env') })

export default{
    jwt_secret:process.env.JWT_SECRET as string
}


