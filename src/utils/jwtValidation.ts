import jwt, {JwtPayload,Secret} from 'jsonwebtoken'
import config from '../config'


const createToken =async(id:number)=>{

   return jwt.sign({ userId: id }, config.jwt_secret as Secret, { expiresIn: '1d' })
  
}

const getInfoFromToken =async(token:string)=>{
   
   try {
     
      const userData = jwt.verify(token,config.jwt_secret as Secret) as { userId:number}
      
      return userData
   } catch (error) {
      return error
   }
}

export const jwtHelper ={
   createToken,
   getInfoFromToken
}


