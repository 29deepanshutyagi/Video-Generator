import { generateCompletion } from "@/configs/aimodel";
import { NextResponse } from "next/server";


export async function POST(req){

    try {
        const { prompt } = await req.json(); 
        const completion = await generateCompletion(prompt);
        console.log(completion);

        return new NextResponse(completion.candidates[0].content.parts[0].text, { status: 200 });
      } catch (e) {
         console.log(e);
        return new NextResponse({"Internal Server Error":e}, { status: 500 });
      }
}