 
 
 
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY, // Ensure you have this in your .env file
});

 

const instructionMessage: ChatCompletionMessageParam = {
    role: "system",
    content: "You are a code generator. You must answer only in markdown code snippet. Use code comments for explanation."
  };


export async function POST(
  req:Request
) {
  try{
    //checking auth
    const {userId}=await auth();
    const body=await req.json();
    const {messages}=body;
    
    if(!userId){
      return new NextResponse("Unauthorised acces",{status:401})
    }
    if(!openai){
      return new NextResponse("OpenAI API is not configured", { status: 500 })
    }
    if(!messages){
      return new NextResponse("Messages are required",{status:400})
    }
    const response = await openai.chat.completions.create({
      model:"gpt-4o-mini",
     
      messages:[instructionMessage,...messages]
        
    
    })
    console.log(response.choices[0].message)

    return NextResponse.json(response.choices[0].message);

  }catch(err){
    console.log("[CODE ERROR]",err);
    return new NextResponse("Internal Server Error ", { status: 500 })
    

  }
  
}