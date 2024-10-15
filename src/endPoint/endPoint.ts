import { IResponse } from '../types/types';

export const callEndpoint = async ({
  api,
} : {
  api: string,
}): Promise<IResponse> => {
  const options: any = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': process.env.REACT_APP_RAPID_APIKEY,
      'x-rapidapi-host': process.env.REACT_APP_APIHOST,
    },
  };

  try {
    const url = process.env.REACT_APP_APIURL;
    // console.log('calling ..... ', `${url}${api}`);
    const response = await fetch(
      `${url}${api}`,
      options,
    );

    // console.log('response', response);
    if (!response) {
      return { status: 0, data: 'Internet connection is not detected' };
    }

    let dataFromEndPoint: any;
    const type: string = 'text';

    if (type === 'json') dataFromEndPoint = await response.json();
    else if (type === 'blob') {
      dataFromEndPoint = await response.blob();
    } else {
      dataFromEndPoint = await response.text();
    }
    return { status: 200, data: dataFromEndPoint };
  } catch (e: any) {
    return { status: 400, data: e.message };
  }
};
