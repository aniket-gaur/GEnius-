 
 
 
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import Replicate from "replicate";


const replicate = new Replicate({
    auth: process.env.REPLICATE_API_KEY,
  });

 
 

export async function POST(
  req:Request
) {
  try{
    //checking auth
    const {userId}=await auth();
    const body=await req.json();
    const {prompt}=body;
    
    if(!userId){
      return new NextResponse("Unauthorised acces",{status:401})
    }
    if(!replicate){
        return new NextResponse("Replicate API is not available",{status:500})    }
    if(!prompt){
      return new NextResponse("Messages are required",{status:400})
    }
   

 

  }catch(err){
    console.log(err);
    return new NextResponse("Internal Server Error ", { status: 500 })
    

  }
  
}