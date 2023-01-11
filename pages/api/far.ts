import { NextApiRequest, NextApiResponse } from "next";
import RenderResult from "next/dist/server/render-result";
import { Configuration, OpenAIApi, CreateCompletionRequest } from "openai";

interface farRequest {
    question: string
}

interface farResponse {
    response: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
   
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
      }

    if(!req.body) {
        res.status(400).send({message: 'Invalid input'})
        return
    }

    const farRequest: farRequest = req.body as farRequest;

    if(!farRequest || !farRequest.question) {
        res.status(400).send({message: 'Invalid input'})
        return
    }

    const prompt = 'In the context of Federal Acquisition Regulation: ' + farRequest.question;

    const configuration = new Configuration({
        organization: process.env.OPENAI_ORG_ID,
        apiKey: process.env.OPENAI_API_KEY,
    });
 
    const openai = new OpenAIApi(configuration);

    const createCompletionRequest: CreateCompletionRequest = {
        model: 'text-davinci-003',
        prompt: prompt,
        temperature: 0,
       // prompt: 'What does FAR say about the unenforcability of unauthorized obligations in micro purchases?',
        max_tokens: 100
    };

    const response = await openai.createCompletion(createCompletionRequest);

    var result: farResponse = {
        response: "I was unable to complete your request. Please try another query."
    };

    if(response && response.data && response.data.choices && response.data.choices.length) {
        result.response = response.data.choices[0].text as string;
    }

    res.json(result);

};

export default handler;