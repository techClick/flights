import { CallArgs, IResponse } from '../types/types';

export const callEndpoint = ({
  prefix, api, body, type = 'json',
}: CallArgs) => async (): Promise<IResponse> => {
  const options: any = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // 'SecurityToken': creds?.token ? creds.token : token ? `${token}` : null,
      // 'UserToken': creds?.users ? creds.users[0].token : null
    },
    body,
  };
  // if (noContentType) delete options.headers['Content-Type'];
  try {
    const url = [process.env.REACT_APP_APIPRE, process.env.REACT_APP_APIPRE2][prefix];
    // console.log('calling ..... ', `${url}${api}`);
    const response = await fetch(
      `${url}${api}`,
      options,
    );

    // console.log('response', response);
    if (!response) {
      return { status: 'error', description: 'Internet connection is not detected' } as IResponse;
    }

    let dataFromEndPoint: any;
    if (type === 'json') dataFromEndPoint = await response.json();
    else if (type === 'blob') {
      dataFromEndPoint = await response.blob();
    } else {
      dataFromEndPoint = await response.text();
    }
    return dataFromEndPoint as IResponse;
  } catch (e: any) {
    return { status: 'error', description: e.message } as IResponse;
  }
};
