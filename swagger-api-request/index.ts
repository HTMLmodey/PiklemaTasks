import axios from 'axios';

interface Pet {
  id: number;
  name: string;
  status: string;
}

async function fetchAvailablePets(): Promise<void> {
  try {
    const response = await axios.get<Pet[]>('https://petstore3.swagger.io/api/v3/pet/findByStatus?status=available');
    const pets = response.data;

    console.log('Available Pets:', pets);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchAvailablePets();
