import axios, { AxiosError } from 'axios';

interface ValidationResponse {
  message?: string;
  error?: string;
}

const PARIS_COORDINATES = { lat: 48.8566, lon: 2.3522 };

const getDistanceFromLatLonInKm = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export async function validateAddress(address: string): Promise<ValidationResponse | null> {
  try {
    const geocodeResponse = await axios.get(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(address)}`);

    if (geocodeResponse.data.features.length > 0) {
      const [lon, lat] = geocodeResponse.data.features[0].geometry.coordinates;
      const distance = getDistanceFromLatLonInKm(lat, lon, PARIS_COORDINATES.lat, PARIS_COORDINATES.lon);

      if (distance <= 50) {
        return { message: 'Adresse valide : l\'utilisateur est à moins de 50 km de Paris.' };
      } else {
        return { error: 'L\'adresse est à plus de 50 km de Paris.' };
      }
    } else {
      return { error: 'Adresse non trouvée.' };
    }
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('Erreur lors de la validation de l\'adresse :', axiosError.response?.data || axiosError.message);
    return { error: 'Erreur lors de la validation de l\'adresse.' };
  }
}
