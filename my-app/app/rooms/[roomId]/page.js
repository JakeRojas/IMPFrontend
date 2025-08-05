'use client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import MasterLayoutUI from '@/app/layout/masterLayout.layout';
import { useRoomDetails } from '@/hooks/useRoom';
import RoomDetailsUI from '@/app/rooms/[roomId]/roomDetails.layout';

export default function UserDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { id } = params;
    const { rooms, error } = useRoomDetails(id);

    return (
        <MasterLayoutUI> 
            <>
                <h1>Rooms</h1>
                {error && <p>Error loading user.</p>}
                <RoomDetailsUI rooms={rooms} />
            </>
        </MasterLayoutUI>
        
    );
}