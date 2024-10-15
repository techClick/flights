import { IResponse } from '../types/types';

export const callEndpoint = async ({
  api,
} : {
  api: string,
}): Promise<IResponse> => {
  const options: any = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '626c2ecbb4msh2afa9b2f0c322afp1cc17bjsn3058ea9a5b73',
      'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
    },
  };

  try {
    const url = 'https://sky-scrapper.p.rapidapi.com';
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
