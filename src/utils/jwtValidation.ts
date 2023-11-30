import jwt from 'jsonwebtoken'
import config from '../config'


const createToken =async(id:number)=>{

   return jwt.sign({ userId: id }, config.jwt_secret as string, { expiresIn: '1d' })
  
}

const getInfoFromToken =async(token:string)=>{
   
   try {
      const userData = jwt.verify(token,config.jwt_secret as string) as {
         userId:number
      }
     
      return userData
   } catch (error) {
      return error
   }
}

export const jwtHelper ={
   createToken,
   getInfoFromToken
}


