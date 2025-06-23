'use client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import MasterLayoutUI from '@/components/layoutsUI/masterLayout.ui';
import { useRoomDetails } from '@/hooks/useRoom';
import RoomDetailsUI from '@/components/roomsUI/roomDetails.ui';

export default function UserDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { id } = params;
    const { rooms, error } = useRoomDetails(id);

    return (
        <MasterLayoutUI> 
            <>
                {error && <p>Error loading user.</p>}
                <RoomDetailsUI rooms={rooms} />
            </>
        </MasterLayoutUI>
        
    );
}