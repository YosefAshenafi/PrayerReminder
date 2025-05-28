import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

const PRAYER_REQUESTS_KEY = 'prayer_requests';

export const addPrayerRequest = (request) => {
  const requests = getPrayerRequests();
  const newRequest = {
    id: Date.now().toString(),
    text: request,
    createdAt: new Date().toISOString(),
  };
  requests.push(newRequest);
  storage.set(PRAYER_REQUESTS_KEY, JSON.stringify(requests));
  return newRequest;
};

export const getPrayerRequests = () => {
  const requests = storage.getString(PRAYER_REQUESTS_KEY);
  return requests ? JSON.parse(requests) : [];
};

export const deletePrayerRequest = (id) => {
  const requests = getPrayerRequests();
  const filteredRequests = requests.filter(request => request.id !== id);
  storage.set(PRAYER_REQUESTS_KEY, JSON.stringify(filteredRequests));
}; 