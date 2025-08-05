'use client';
import React from 'react';
import MasterLayoutUI from '@/app/layout/masterLayout.layout';
import DashboardUI from '@/app/dashboard/dashboard.layout';

export default function DashboardPage() {
  return (
    <MasterLayoutUI> 
      <DashboardUI /> 
    </MasterLayoutUI>
  );
}