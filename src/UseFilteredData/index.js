import { useContext } from 'react';
import { FilteredDataContext } from '../../ContextFilter'; // Asegúrate de que la ruta es correcta

export const useFilteredData = () => {
  return useContext(FilteredDataContext);
};
