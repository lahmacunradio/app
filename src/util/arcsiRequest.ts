import config from 'react-native-config';

export async function arcsiRequest<T>(url: string): Promise<T> {
  const resp = await fetch(`https://arcsi.lahmacun.hu/arcsi${url}`, {
    headers: {
      accept: 'application/json',
      'Authentication-Token': config.REACT_APP_API_KEY || '',
      'Content-Type': 'application/json'
    }
  });
  return await resp.json();
}
