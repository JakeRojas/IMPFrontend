'use client';

import { API_URL, endpoints } from '@/config/apiConfig';
import { useState, useEffect, useRef, useCallback } from'react';
import useSWR from'swr';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAccount';
import { BrowserMultiFormatReader } from '@zxing/browser';
import {
    receiveApparelFetcher
} from'@/services/apparelService';

module.exports = {
    useGetApparels
    
};

function useGetApparels() {
    const { data, error } = useSWR(endpoints.getReceiveApparelRoute, receiveApparelFetcher);
    return { items: data || [], error };
}