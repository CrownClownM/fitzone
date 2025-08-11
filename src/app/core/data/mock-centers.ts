import { FitnessCenter } from '@home/interfaces/class-store.interface';

export const MOCK_CENTERS: FitnessCenter[] = [
  {
    id: '1',
    name: 'FitZone Centro',
    address: 'Calle Gran Vía 25',
    city: 'Madrid',
    phone: '+34 911 234 567',
    facilities: ['Piscina', 'Sauna', 'Zona CrossFit', 'Sala Spinning'],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
  },
  {
    id: '2',
    name: 'FitZone Norte',
    address: 'Avenida de la Castellana 100',
    city: 'Madrid',
    phone: '+34 911 234 568',
    facilities: ['Piscina Olímpica', 'Spa', 'Zona Funcional', 'Boxing Ring'],
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop'
  },
  {
    id: '3',
    name: 'FitZone Sur',
    address: 'Calle Atocha 85',
    city: 'Madrid',
    phone: '+34 911 234 569',
    facilities: ['Piscina Climatizada', 'Yoga Studio', 'Sala Pilates', 'Cardio Zone'],
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=300&fit=crop'
  },
  {
    id: '4',
    name: 'FitZone Oeste',
    address: 'Plaza de España 15',
    city: 'Madrid',
    phone: '+34 911 234 570',
    facilities: ['Gimnasio 24h', 'Sala Funcional', 'Boxing Area', 'Zona Relax'],
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400&h=300&fit=crop'
  }
];
