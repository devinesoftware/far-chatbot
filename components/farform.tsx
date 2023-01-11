
import {useState} from 'react'
import Response from './response'

import { container } from "tsyringe";
import { iFarRequest, iFarService } from '../services/farService'

export default function FARForm() {
    const [isLoading, setLoading] = useState(false)
    const [questionInfo, setQuestionInfo] = useState({
      question: ""
    });
    const [questionResponse, setQuestionResponse] = useState({response: ""})
  
    const handleChange = (event: any) => {
      //console.log(event);
      setQuestionInfo({ ...questionInfo, [event.target.name]: event.target.value });
    };
  
    const submitQuestion = (event: any) => {
      event.preventDefault();
      if(!questionInfo?.question) return;
      setLoading(true);
      const instance = container.resolve<iFarService>("iFarService");
      instance.query(questionInfo as iFarRequest).then((data) => {
        setQuestionResponse(data)
        setLoading(false)
      });
    };

    return (
        <>
         <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-4">
            <p className="mt-4 text-center text-sm">Welcome to the Federal Acquisition Regulation (FAR) AI assistant. Please enter your questy below and hit 'Search'.</p>
          </div>
        </div>
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-4">
            <form onSubmit={submitQuestion}>
              <input type="text" id="farQuestion" name="question" 
                value={questionInfo.question} 
                onChange={handleChange} 
                disabled={isLoading}
                placeholder="ex: Can foreign nationals participate?"
                required
                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500  focus:z-10 focus:outline-none sm:text-sm">
              </input>
              <button type="button" 
                onClick={submitQuestion} 
                disabled={isLoading}
                className="group relative flex w-full justify-center  rounded-md border border-transparent  py-2 px-4 text-sm font-medium bg-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-offset-2">
                 {isLoading ? 'Searching...' : 'Search'}
              </button>
            </form>
          </div>
        
        </div>
        {
            questionResponse.response && !isLoading &&
            <Response response={questionResponse.response}/>
          }

        </>
    )
}