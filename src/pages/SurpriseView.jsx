import React from 'react';
import { useParams } from 'react-router-dom';
import { SurpriseExperience } from '../components/Recipient/SurpriseExperience';

export function SurpriseView() {
  const { slug } = useParams();

  return <SurpriseExperience slug={slug} />;
}