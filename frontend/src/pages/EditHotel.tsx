import React from 'react';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import * as apiClient from '../api-client';
import ManageHotelForm from '../forms/ManageHotelForms/ManageHotelForm';
import { useAppContext } from '../contexts/AppContext';

const EditHotel: React.FC = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const { showToast } = useAppContext();


  const { data: hotel } = useQuery(
    ['fetchMyHotelById', hotelId],
    () => apiClient.fetchMyHotelById(hotelId || ''),
    {
      enabled: !!hotelId,
    }
  );

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error fetching hotel details</div>;


  
  const { mutate,isLoading  } = useMutation(apiClient.updateMyHotelById, {
    onSuccess: () => {
      showToast({ message: "Hotel Saved!", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error Saving Hotel", type: "ERROR" });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading}/>;
};

export default EditHotel;