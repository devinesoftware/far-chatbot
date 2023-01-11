import { autoInjectable, injectable } from "tsyringe";

export interface iFarRequest {
    question: string
}

export interface iFarResponse {
    response: string
}

export interface iFarService {
    query(request: iFarRequest): Promise<iFarResponse>;
}

@injectable()
export class farService implements iFarService {
    constructor() {
       
    }
    public query = async (request: iFarRequest) : Promise<iFarResponse> => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
          };
        var data = await fetch('/api/far', requestOptions)
            .then((res) => res.json());
        return data as iFarResponse;
    }
}