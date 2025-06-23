'use client';
import React from 'react';
import MasterLayoutUI from '@/components/layoutsUI/masterLayout.ui';
import DashboardUI from '@/components/layoutsUI/dashboard.ui';

export default function DashboardPage() {
  return (
    <MasterLayoutUI> 
      <DashboardUI /> 
    </MasterLayoutUI>
  );
}